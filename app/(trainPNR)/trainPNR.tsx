import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const TrainPNR = () => {
  const [pnrNumber, setPnrNumber] = useState<string>("");
  const router = useRouter();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <View className="flex-1 bg-white relative">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View className="w-full h-96 relative">
          <Image
            source={require("@/assets/images/trainPNR.png")}
            alt="trainPNR"
            className="w-[100%] h-[100%] absolute top-0 left-0 right-0"
            style={styles.image}
          />
          <View className="absolute -bottom-16 left-0 right-0 w-full px-4">
            <View className="p-2 bg-white w-[100%] flex items-center justify-between rounded-2xl border border-gray-300">
              <Text className="font-pbold text-xl mt-5">Journey Details</Text>
              <Text className="font-pregular text-sm text-MountainMist mt-3">
                PNR is needed to deliver to your seat
              </Text>
              <View className="w-full mt-10 px-3 pb-5">
                <TextInput
                  className="border w-full border-gray-300 rounded-2xl font-pregular px-4 h-[3.5rem]"
                  value={pnrNumber}
                  onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, "");
                    setPnrNumber(numericText);
                  }}
                  keyboardType="numeric"
                  placeholder="Enter PNR Number"
                />
              </View>
            </View>
          </View>
          <View className="p-4 px-6 absolute top-16 ">
            <TouchableOpacity className="p-2 bg-white rounded-full" onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full p-4 absolute bottom-0">
          <TouchableOpacity
            className={`w-[100%] rounded-xl p-3 flex items-center justify-center ${
              pnrNumber ? "bg-primary" : "bg-gray-300"
            }`}
            onPress={() => {
              if (pnrNumber) {
                router.push({
                  pathname: "/trainDetails/[pnr]",
                  params: { pnr: pnrNumber },
                });
              }
            }}
          >
            <Text className="font-pmedium text-white text-xl">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default TrainPNR;
