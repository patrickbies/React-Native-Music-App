import { router, Slot, SplashScreen, useSegments } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { LogBox } from "react-native";
import * as SecureStore from "expo-secure-store";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { UIDProvider } from "@/context/UIDContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoaded) return;

    setStatusBarStyle("light");

    const inMain = segments[0] == "(main)";
    if (isSignedIn && !inMain) {
      router.replace("/(main)/(home)/(feed)");
    } else if (!isSignedIn && inMain) {
      router.replace("/(auth)");
    }

    SplashScreen.hideAsync();
  }, [isSignedIn, isLoaded]);

  return <Slot />;
};

LogBox.ignoreAllLogs();

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  return (
    <GestureHandlerRootView>
      <LoadingProvider>
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
          <ConvexProvider client={convex}>
            <UIDProvider>
              <StatusBar style="light" />
              <LoadingOverlay />
              <InitialLayout />
            </UIDProvider>
          </ConvexProvider>
        </ClerkProvider>
      </LoadingProvider>
    </GestureHandlerRootView>
  );
}
