import { useNetInfo } from "@react-native-community/netinfo";
import { useRouter } from "expo-router";

export const usePreventOfflineAction = (
  onAwareRedirect: string | undefined = "/scanner/"
) => {
  const isConnected = useNetInfo();
  const router = useRouter();

  const preventOfflineAction = (callback: () => void) => {
    if (!isConnected) {
      router.push({
        pathname: "/aware/",
        params: { onAwareRedirect, type: "error" },
      });
    } else {
      callback();
    }
  };

  return preventOfflineAction;
};
