import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export const useNetInfo = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(!!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};
