import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { usePreviousRoute } from "./use-previous-route";
import { usePreventOfflineAction } from "./use-prevent-offline-action";
import {
  makeRedirectUri,
  useAuthRequest,
  exchangeCodeAsync,
  refreshAsync,
  dismiss,
  TokenResponse,
} from "expo-auth-session";
import { useMMKVObject } from "react-native-mmkv";
import { useNetInfo } from "@react-native-community/netinfo";
import { useTranslation } from "react-i18next";

import {
  API_URL,
  API_URL_KEY,
  APP_SCHEME,
  SPOTIFY_AUTHORIZATION_ENDPOINT,
  SPOTIFY_TOKEN_ENDPOINT,
} from "@/src/enviroments";
import { SoundCloudSong } from "@/src/types/player";

WebBrowser.maybeCompleteAuthSession();

interface SpotifyCredentials {
  id: string;
  secret: string;
}

interface CardData {
  id: number;
  createdAt: string;
  updatedAt: string;
  qrLink: string;
  songLink: string;
  soundCloudSongLink: string;
  soundCloudSong: SoundCloudSong;
}

const discovery = {
  authorizationEndpoint: SPOTIFY_AUTHORIZATION_ENDPOINT,
  tokenEndpoint: SPOTIFY_TOKEN_ENDPOINT,
};

const spotifyScopes = [
  "user-read-email",
  "user-read-playback-state",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-private",
  "user-read-recently-played",
  "user-modify-playback-state",
];

const redirectUri = makeRedirectUri({
  scheme: APP_SCHEME,
  native: APP_SCHEME + "://redirect",
});

export const useSpotify = () => {
  const [spotifyCredentials, setSpotifyCredentials] =
    useMMKVObject<SpotifyCredentials>("spotifyCredentials");
  const [authState, setAuthState] = useMMKVObject<TokenResponse>("authState");

  const [soundCloudSong, setSoundCloudSong] =
    useMMKVObject<SoundCloudSong>("soundCloudSong");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("player");

  const preventOfflineAction = usePreventOfflineAction();
  const { beforePreviousRouteName } = usePreviousRoute();
  const isConnected = useNetInfo();
  const router = useRouter();

  const [_, response, promptAsync] = useAuthRequest(
    {
      clientId: spotifyCredentials?.id ?? "",
      clientSecret: spotifyCredentials?.secret ?? "",
      scopes: spotifyScopes,
      usePKCE: false,
      redirectUri: redirectUri,
    },
    discovery
  );

  const auth = async () => await promptAsync();
  const dismissAuth = () => {
    if (Platform.OS === "ios") {
      dismiss();
    }
    setAuthState(undefined);
  };

  const getSpotifyCredentials = async () => {
    try {
      const response = await fetch(API_URL + "/api/internal/spotify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_URL_KEY,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getCardData = async (songId: string): Promise<CardData | null> => {
    try {
      const response = await fetch(API_URL + "/api/internal/proxy/" + songId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_URL_KEY,
        },
      });

      const data: CardData | null = await response.json();

      return data ?? null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const openLinkAndroid = async (qrLink: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    preventOfflineAction(async () => {
      try {
        if (authState?.accessToken) {
          await refreshToken();
        }

        const cardData = await getCardData(qrLink);
        const songLink = cardData?.songLink;

        if (songLink) {
          if (authState) {
            WebBrowser.openAuthSessionAsync(songLink, redirectUri, {
              showInRecents: true,
            });
          } else {
            WebBrowser.openBrowserAsync(songLink, { showInRecents: true });
          }
          router.replace("/");
        }
      } catch (error) {
        console.log(error);
      }
    });
    setIsProcessing(false);
  };

  const onGetCode = async (code: string) => {
    if (code) {
      await getTokens(code);
    }
  };

  const getTokens = async (authorizationCode: string) => {
    try {
      const result = await exchangeCodeAsync(
        {
          code: authorizationCode,
          redirectUri,
          clientId: spotifyCredentials?.id ?? "",
          clientSecret: spotifyCredentials?.secret ?? "",
        },
        { tokenEndpoint: SPOTIFY_TOKEN_ENDPOINT }
      );

      setAuthState(result);
      if (beforePreviousRouteName === "settings") router.push("/settings/");
      else {
        router.dismissAll();
        router.replace("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openLinkIos = async (qrLink: string) => {
    if (isProcessing) return;

    setIsProcessing(true);
    preventOfflineAction(async () => {
      try {
        const cardData = await getCardData(qrLink);
        const soundCloudSong = cardData?.soundCloudSong;
        console.log({ soundCloudSong });

        if (soundCloudSong) {
          setSoundCloudSong(soundCloudSong);

          router.replace({
            pathname: `/player/${qrLink}`,
          });
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.log(error);
      }
    });
    setIsProcessing(false);
  };

  const refreshToken = async () => {
    if (!authState) return;

    let tokenResponse = new TokenResponse(authState);
    if (tokenResponse.shouldRefresh()) {
      const refreshTokenObject = {
        clientId: spotifyCredentials?.id ?? "",
        refreshToken: authState.refreshToken,
      };

      const result = await refreshAsync(refreshTokenObject, discovery);
      setAuthState(result);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      preventOfflineAction(() => onGetCode(response.params.code));
    }
  }, [response]);

  useEffect(() => {
    if (!authState) return;

    const refreshInterval = setInterval(async () => {
      refreshToken();
    }, 60000);

    return () => clearInterval(refreshInterval);
  }, [authState]);

  const updateSpotifyCredentials = async () => {
    try {
      setIsLoading(true);
      preventOfflineAction(async () => {
        const credentials = await getSpotifyCredentials();
        if (credentials) setSpotifyCredentials(credentials);
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) return;
    else if (!spotifyCredentials && isConnected) {
      preventOfflineAction(updateSpotifyCredentials);
    }
  }, [spotifyCredentials, isConnected, isLoading]);

  return {
    isAuth: !!authState,
    auth,
    dismissAuth,
    openLinkIos,
    openLinkAndroid,
    getCardData,
  };
};
