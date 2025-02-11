import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Mapbox, { Camera, MapView, MarkerView } from "@rnmapbox/maps";
import Geolocation from "@react-native-community/geolocation";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

const ConfirmLocation = () => {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const getUserLocation = async () => {
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition((info) => {
        setLocation(info.coords);
        cameraRef.current?.moveTo(
          [info.coords.longitude, info.coords.latitude],
          1000
        );
      });
    };
    getUserLocation();
  }, []);

  const handleMapPress = (event: any) => {
    const [longitude, latitude] = event.geometry.coordinates;
    setLocation({ latitude, longitude });
    cameraRef.current?.moveTo([longitude, latitude], 1000);
  };

  function handlePress() {
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Confirm Delivery Location",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        {location && (
          <MapView
            style={{ flex: 1 }}
            onPress={handleMapPress}
            logoEnabled={false}
            scaleBarEnabled={false}
          >
            <Camera
              ref={cameraRef}
              zoomLevel={16}
              centerCoordinate={[location.longitude, location.latitude]}
              animationMode="flyTo"
              animationDuration={1000}
            />

            <MarkerView
              coordinate={[location.longitude, location.latitude]}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "blue",
                  borderWidth: 2,
                  borderColor: "white",
                }}
              />
            </MarkerView>
          </MapView>
        )}
        <View className="w-full justify-center items-center">
          <Pressable
            className="bg-primary w-[70%] flex justify-center items-center rounded-xl p-3"
            onPress={handlePress}
          >
            <Text className="text-white">Confirm Location</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmLocation;
