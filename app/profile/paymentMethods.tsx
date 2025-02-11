import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import icons from "@/constants/icons";

const paymentMethods = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
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
          <Text className="text-2xl font-pmedium">Payment Methods</Text>
        </View>
      </View>

      <View className="flex flex-col mx-7 justify-center content-center mt-7">
        <View className="flex justify-start">
          <Text className="font-pmedium text-lg ">Credit & Debit Card</Text>
        </View>

        <TouchableOpacity className="flex flex-row w-full bg-MountainMist/15 h-14 items-center rounded-xl justify-between mt-3">
          <View className="flex flex-row ml-5">
            <Image source={icons.payment} />
            <Text className="mt-1 ml-4 font-pregular">Add Card</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="black"
            className="mr-5"
          />
        </TouchableOpacity>
        <View className="flex justify-start mt-10">
          <Text className="font-pmedium text-lg ">More Payment Methods</Text>
        </View>

        <TouchableOpacity className="flex flex-row w-full bg-MountainMist/15 h-14 items-center border-b border-gray-300 rounded-t-xl justify-between mt-3">
          <View className="flex flex-row ml-5 font-pregular">
            <Image source={icons.payment} />
            <Text className="mt-1 ml-4">Paytm</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="black"
            className="mr-5"
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row w-full bg-MountainMist/15 h-14 border-b border-gray-300 items-center justify-between">
          <View className="flex flex-row ml-5 font-pregular">
            <Image source={icons.payment} />
            <Text className="mt-1 ml-4">PhonePe</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="black"
            className="mr-5"
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row w-full bg-MountainMist/15 h-14 items-center rounded-b-xl justify-between">
          <View className="flex flex-row ml-5">
            <Image source={icons.payment} />
            <Text className="mt-1 ml-4 font-pregular">GooglePay</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="black"
            className="mr-5"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default paymentMethods;
