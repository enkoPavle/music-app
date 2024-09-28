import {
  useNavigationContainerRef,
  usePathname,
  useRouter,
  useSegments,
} from "expo-router";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useMMKVString } from "react-native-mmkv";
import { TAppLanguages } from "../translations";
import { Platform } from "react-native";

export interface IntroContextValue {
  country: string | undefined;
  language: string | undefined;
  setUserCountry: (country: string) => void;
  setUserLanguage: (language: TAppLanguages) => void;
  onNextIntroStep: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const IntroContext = createContext<IntroContextValue | undefined>(
  undefined
);

export const IntroProvider = (props: ProviderProps) => {
  const rootNavigation = useNavigationContainerRef();
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [isInitialRouteReady, setIsInitialRouteReady] = useState(false);
  const [country, setCountry] = useMMKVString("user.country");
  const [language, setLanguage] = useMMKVString("user.language");
  const { i18n } = useTranslation();
  const segments = useSegments();
  const pathname = usePathname();
  const router = useRouter();

  const setUserCountry = (country: string) => {
    setCountry(country);
  };

  const setUserLanguage = (language: TAppLanguages) => {
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  const onNextIntroStep = () => {
    if (pathname === "/select-country" && country) {
      router.push("/(intro)/select-language");
    } else if (pathname === "/select-language" && language) {
      if (Platform.OS === "android") {
        router.push("/spotify-mode/");
      } else {
        router.dismissAll();
        router.replace("/");
      }
    } else if (pathname === "/spotify-mode") {
      router.dismissAll();
      router.replace("/");
    }
  };

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", () => {
      setIsNavigationReady(true);
    });

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  useEffect(() => {
    if (!isNavigationReady || isInitialRouteReady) return;

    if (!country || !language) {
      router.replace("/(intro)/select-country");
    }

    setIsInitialRouteReady(true);
  }, [isNavigationReady, isInitialRouteReady, segments]);

  const value = useMemo(() => {
    return {
      country,
      language,
      setUserCountry,
      setUserLanguage,
      onNextIntroStep,
    } as IntroContextValue;
  }, [segments, pathname, country, language]);

  return (
    <IntroContext.Provider value={value}>
      {props.children}
    </IntroContext.Provider>
  );
};

export const useIntroContext = () => {
  const introContext = useContext(IntroContext);

  return introContext as IntroContextValue;
};
