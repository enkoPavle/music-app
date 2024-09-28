import { usePathname } from "expo-router";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AVPlaybackStatus, Audio } from "expo-av";

export interface PlayerContextValue {
  sound: Audio.Sound | null;
  isPlaying: boolean;
  loading: boolean;
  position: number;
  duration: number;
  loadSound: (previewUrl: string) => Promise<void>;
  handlePlayPause: () => Promise<void>;
}

interface ProviderProps {
  children: ReactNode;
}

export const PlayerContext = createContext<PlayerContextValue | undefined>(
  undefined
);

const playerPathname = "/player";

export const PlayerProvider = (props: ProviderProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const pathname = usePathname();

  const play = async () => {
    if (sound) {
      if (isEnded) {
        await sound.replayAsync();
        setIsEnded(false);
      } else {
        await sound.playAsync();
      }
    }
  };

  const pause = async () => {
    if (sound !== null) {
      await sound.pauseAsync();
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await pause();
    } else {
      await play();
    }
  };

  const onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis ?? 0);
      setIsPlaying(status.isPlaying);
    }

    if (status?.didJustFinish) {
      setIsEnded(true);
    }
  };

  const loadSound = async (previewUrl: string) => {
    setLoading(true);

    const { sound } = await Audio.Sound.createAsync(
      {
        uri: previewUrl,
      },
      { shouldPlay: true }
    ).catch((error) => console.log("loadSound", error));

    setSound(sound);

    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  };

  const unmountSound = async () => {
    if (sound) {
      sound.stopAsync();
      await sound.unloadAsync();

      setSound(null);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
    });
  }, []);

  useEffect(() => {
    if (pathname !== playerPathname && sound) {
      unmountSound();
    }
  }, [pathname]);

  const value = useMemo(() => {
    return {
      sound,
      isPlaying,
      loading,
      position,
      duration,
      loadSound,
      handlePlayPause,
    } as PlayerContextValue;
  }, [sound, isPlaying, loading, position, duration, isEnded]);

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const playerContext = useContext(PlayerContext);

  return playerContext as PlayerContextValue;
};
