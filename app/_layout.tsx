import { Stack } from "expo-router/stack";
import "../global.css";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { SplashScreen as ExpoSplashScreen } from "expo-router";
import SplashScreenComp from "@/components/SplashScreenComp";

export default function Layout() {
  const [splashVisible, setSplashVisible] = useState(true);

  const [fontLoaded, fontError] = useFonts({
    "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
    "Roboto-ThinItalic": require("../assets/fonts/Roboto-ThinItalic.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-LightItalic": require("../assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Italic": require("../assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("../assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("../assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("../assets/fonts/Roboto-BlackItalic.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await ExpoSplashScreen.preventAutoHideAsync();
      } catch (err) {
        console.warn("Error preventing splash screen auto-hide:", err);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (fontError) {
      throw fontError;
    }

    if (fontLoaded) {
      setTimeout(() => {
        setSplashVisible(false);
        ExpoSplashScreen.hideAsync(); 
      }, 3000);
    }
  }, [fontLoaded, fontError]);

  if (splashVisible) {
    return <SplashScreenComp />;
  }
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
