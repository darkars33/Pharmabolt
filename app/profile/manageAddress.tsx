import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
  processColor,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import icons from "@/constants/icons";
import Mapbox, {
  Camera,
  LocationPuck,
  MapView,
  MarkerView,
} from "@rnmapbox/maps";
import * as Location from "expo-location";
import Geolocation from "@react-native-community/geolocation";
import { address } from "@/constants/Data";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

const manageAddress = () => {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const cameraRef = useRef(null);

  useEffect(() => {
    const getUserLocation = async () => {
      Geolocation.requestAuthorization();
      let loc = Geolocation.getCurrentPosition((info) => {
        setLocation(info.coords);
        cameraRef.current?.moveTo(
          [info.coords.longitude, info.coords.latitude],
          1000
        );
      });

      setLoading(false);
    };
    getUserLocation();
  }, []);

  function handleRegionChange(state: any) {
    const center = state.properties.center;
    setLocation({ latitude: center[1], longitude: center[0] });
  }
  function handleMapPress(event: any) {
    const [longitude, latitude] = event.geometry.coordinates;
    setLocation({ latitude, longitude });
    cameraRef.current?.moveTo([longitude, latitude], 1000);
  }
  return (
    // <SafeAreaView>
    //   <View>
    //     <Stack.Screen
    //       options={{
    //         headerShown: false,
    //       }}
    //     />
    //     <View className="h-24 justify-center items-center border-b border-gray-300">
    //       <Pressable
    //         onPress={() => router.back()}
    //         className="absolute top-1/3 left-5"
    //       >
    //         <Ionicons name="chevron-back" size={30} color="black" />
    //       </Pressable>
    //       <Text className="text-2xl font-pmedium">Manage Address</Text>
    //     </View>
    //   </View>
    //   {address.length != 0 ? (
    //     <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
    //       {address.map((address, index) => {
    //         return (
    //           <TouchableOpacity
    //             className="w-full h-20 border-b border-gray-300 flex flex-row justify-between px-7 items-center"
    //             key={index}
    //           >
    //             <View className="flex flex-row">
    //               <Image source={icons.location} className="h-10 w-10" />
    //               <View className="flex flex-col justify-start ml-5">
    //                 <Text className="font-plight text-lg">{address.TITLE}</Text>
    //                 <Text className="font-plight text-MountainMist text-sm">
    //                   {address.ADDRESS.substring(0, 44) + "..."}
    //                 </Text>
    //               </View>
    //             </View>
    //             <Ionicons name="chevron-forward" size={20} color="black" />
    //           </TouchableOpacity>
    //         );
    //       })}
    //     </ScrollView>
    //   ) : null}

    // </SafeAreaView>
    <View className="flex-1 ">
      <MapView
        style={{ flex: 1 }}
        // onMapIdle={handleRegionChange}
        onPress={handleMapPress}
        scaleBarEnabled={false}
      >
        {location && (
          <>
            {/* <Camera centerCoordinate={[77.536247, 12.97326]} /> */}
            <Camera
              ref={cameraRef}
              zoomLevel={16}
              centerCoordinate={[location.longitude, location.latitude]}
              animationMode="flyTo"
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
          </>
        )}
      </MapView>
    </View>
  );
};

export default manageAddress;
