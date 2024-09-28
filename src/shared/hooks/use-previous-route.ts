import { useNavigation } from "expo-router";
import { useMemo } from "react";

export const usePreviousRoute = () => {
  const navigation = useNavigation();

  const { previousRouteName, beforePreviousRouteName } = useMemo(() => {
    const parentRoutes = navigation?.getParent()?.getState()?.routes ?? [];
    const parentRoutesLength = navigation?.getParent()?.getState()
      ?.routes?.length;

    if (parentRoutesLength) {
      const previousRouteName =
        parentRoutes[parentRoutesLength - 2]?.name ?? null;
      const beforePreviousRouteName =
        parentRoutes[parentRoutesLength - 3]?.name ?? null;

      return { previousRouteName, beforePreviousRouteName };
    }
    return { previousRouteName: null, beforePreviousRouteName: null };
  }, [navigation]);

  return { previousRouteName, beforePreviousRouteName };
};
