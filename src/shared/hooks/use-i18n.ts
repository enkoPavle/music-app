import { useState } from "react";
import { useMMKVString } from "react-native-mmkv";
import { init } from "@/src/translations";

export const useI18n = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [language, setLanguage] = useMMKVString("user.language");

  const initI18n = async () => {
    if (!isInitialized) {
      const intitializedLanguage = await init(language);

      setLanguage(intitializedLanguage);
      setIsInitialized(true);
    }
  };

  return { isInitialized, initI18n };
};
