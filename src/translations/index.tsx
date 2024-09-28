import * as Localization from "expo-localization";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import en from "./en.json";
import de from "./de.json";

export type TAppLanguages = "en" | "de";

export const DEFAULT_LANGUAGE = "en";

export const resources: Record<TAppLanguages, any> = {
  en,
  de,
};

export const init = async (userLanguage?: string): Promise<string> => {
  const deviceLocale = Localization.getLocales()[0];
  const deviceLanguage = deviceLocale.languageCode;
  const hasAppDeviceLanguage = Object.keys(resources).includes(
    deviceLanguage ?? ""
  );

  const language =
    userLanguage ?? (hasAppDeviceLanguage ? deviceLanguage : DEFAULT_LANGUAGE);

  await i18n.use(initReactI18next).init({
    lng: language ?? undefined,
    react: { useSuspense: false },
    compatibilityJSON: "v3",
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
  });

  return language ?? DEFAULT_LANGUAGE;
};
