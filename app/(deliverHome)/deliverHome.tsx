import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const deliverHome = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <View>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View className="h-24 justify-center items-center border-b border-gray-300">
          <Pressable
            onPress={() => router.back()}
            className="absolute top-1/3 left-5"
          >
            <Ionicons name="chevron-back" size={30} color="black" />
          </Pressable>
          <Text className="text-2xl font-pmedium">Enter your area</Text>
        </View>
        <View className="flex justify-center items-center">
          <View className="w-[92%] h-[3.7rem] mt-5 px-2 rounded-xl flex-row items-center justify-between space-x-3">
            <View className="flex-1 flex-row items-center bg-gray-50 rounded-lg px-3 py-2 border border-MountainMist h-[4em]">
              <Image
                source={require("../../assets/icons/Search Icon.png")}
                className="h-6 w-6 mr-2"
              />
              <TextInput
                className="flex-1 text-base text-MountainMist font-pmedium"
                placeholder="Address"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>
        <View className="flex flex-col mt-5 mx-5">
          <TouchableOpacity
            className="flex flex-row border-b border-gray-300 py-5"
            onPress={() => router.push("/confirmLocation")}
          >
            <Image
              source={require("../../assets/icons/locationBlack.png")}
              className="h-6 w-6 mr-2"
            />
            <Text className="text-xl color-red-600">Use Current Location</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row border-b border-gray-300 py-5">
            <Image
              source={require("../../assets/icons/Plus.png")}
              className="h-6 w-6 mr-2"
            />
            <Text className="text-xl">Add new address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default deliverHome;
