import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();
  const {isSignedIn, isLoaded} = useAuth();

  useEffect(() => {
    // Logic for redirection
    if (isLoaded) {
      if (isSignedIn) {
        router.replace("/(main)");
      } else  {
        router.replace("/(auth)");
      }
    }
  }, [router, isSignedIn, isLoaded]);

  return <View />;
}
