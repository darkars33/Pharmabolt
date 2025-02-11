"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";

export default function ProductDetail() {
  const router = useRouter();
  const animation = useRef(null);
  const [showDetails, setShowDetails] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const [amount, setAmount] = useState(133);
  const [showFQ, setShowFQ] = useState(false);
  const [loading, setLoading] = useState(true);
  interface ProductData {
    DESCRIPTION?: string;
    USAGE?: { item: { itme: string } }[];
  }

  const [data, setData] = useState<ProductData | null>(null);

  const isIOS = Platform.OS === "ios";
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const api = process.env.EXPO_PUBLIC_APPLICATION_API || " ";
  const flashKey = useSelector((state: any) => state.user.flashKey);

  const handleGetDetails = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${api}/v1/medicine-details?`, {
        params: {
          IDENTIFIER: id,
        },
        headers: {
          Authorization: `Bearer ${flashKey}`,
        },
      });

      const data = res?.data?.response;
      setData(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (axios.isCancel(error)) {
        console.log("Request Cancelled");
      } else if (axios.isAxiosError(error)) {
        console.log("Axios Error");
      } else {
        console.log("Error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetDetails();
  }, []);

  const discount = ((data?.MRP - data?.PRICE) / data?.MRP) * 100;

  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="h-20 flex-row justify-between items-center px-5 border-b border-gray-200">
        <Pressable onPress={() => router.back()} className="">
          <Ionicons name="chevron-back" size={30} color="black" />
        </Pressable>
        <View className="flex-row items-center gap-2">
          <Pressable
            className={`${isIOS ? "p-3 bg-[#f2f2f7] rounded-full" : "p-2"}`}
            onPress={() => alert("Search")}
          >
            <AntDesign
              name="search1"
              size={18}
              color={isIOS ? "black" : "#1a73e8"}
            />
          </Pressable>
          <Pressable
            className={`${isIOS ? "p-3 bg-[#f2f2f7] rounded-full" : "p-2"}`}
            onPress={() => alert("Notifications")}
          >
            <Ionicons
              name="notifications-sharp"
              size={18}
              color={isIOS ? "black" : "#1a73e8"}
            />
          </Pressable>
          <Pressable
            className={`mr-0 ${
              isIOS ? "p-3 bg-[#f2f2f7] rounded-full" : "p-2"
            }`}
            onPress={() => alert("Cart")}
          >
            <Entypo
              name="shopping-cart"
              size={18}
              color={isIOS ? "black" : "#1a73e8"}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {(loading && !data) ? (
          <View className="flex h-[15rem] justify-center items-center mt-5">
            <LottieView
              autoPlay
              loop
              ref={animation}
              style={{
                width: 200,
                height: 200,
                backgroundColor: "transparent",
              }}
              source={require("@/assets/MainScene.json")}
            />
          </View>
        ) : (
          <View className="w-full mt-5 flex-col items-center overflow-hidden pb-24">
            <FlatList
              data={data?.IMAGES}
              horizontal
              keyExtractor={(item) => item}
              pagingEnabled // Enables full-screen swiping behavior
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{ width }}>
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: width, // Ensures full screen width
                      height: 400, // Adjust height as needed
                      marginHorizontal: 5,
                      borderRadius: 10,
                    }}
                    className={`${
                      isIOS ? "rounded-xl " : "rounded-md shadow-sm"
                    }`}
                  />
                </View>
              )}
            />
            <View className="w-full px-4 mt-4">
              <Text
                className={`${
                  isIOS ? "text-xl font-semibold" : "text-lg font-medium"
                }`}
              >
                {data?.DRUGS}
              </Text>

              <View
                className={`w-full mt-3 flex-row items-center gap-5 ${
                  isIOS
                    ? "bg-[#F6F6F7] p-4 rounded-xl"
                    : "bg-white p-3 border-b border-gray-200"
                }`}
              >
                <View className="w-[50%]">
                  <Text className="text-2xl font-semibold">₹{data?.PRICE}</Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-sm">
                      MRP <Text className="line-through">₹{data?.MRP}</Text>
                    </Text>
                    <Text className="text-red-600 text-sm ml-4">
                      {Math.round(discount)}% off
                    </Text>
                  </View>
                  <Text
                    className={`underline text-sm mt-1 ${
                      isIOS ? "text-[#007AFF]" : "text-[#1a73e8]"
                    }`}
                  >
                    {data?.COMPANY}
                  </Text>
                </View>
                <View className=" w-[50%] flex-col  gap-5 justify-between">
                  <Text className="text-sm text-gray-500 text-left uppercase">
                    {data?.COMPOSITION}
                  </Text>
                  <Text className="text-sm text-gray-500 text-left">
                    {data?.COLLECTION}
                  </Text>
                </View>
              </View>

              <Pressable
                className={`w-full mt-4 ${
                  isIOS
                    ? "border-t border-b border-gray-200"
                    : "bg-white shadow-sm rounded-sm"
                }`}
                onPress={() => setShowDetails(!showDetails)}
              >
                <View className="p-4 flex-row items-center justify-between">
                  <Text className={isIOS ? "text-base" : "text-sm"}>
                    Product Details
                  </Text>
                  <AntDesign
                    name={showDetails ? "down" : "right"}
                    size={18}
                    color={isIOS ? "black" : "#1a73e8"}
                  />
                </View>
                {showDetails && (
                  <Text className="px-4 pb-4 text-sm text-gray-600">
                    {data?.DESCRIPTION}
                  </Text>
                )}
              </Pressable>

              <View className="w-full mt-4 px-4">
                <Text className="text-lg font-pregular uppercase">USAGE</Text>

                {data?.USAGE?.map((item: { item: { itme: string } }) => {
                  return <Text>• {item}</Text>;
                })}
              </View>

              <View className="w-full mt-4 px-4">
                <Text className="text-lg font-pregular uppercase">
                  Side Effects
                </Text>
                <Text>• Prevention from Heart Attack</Text>
              </View>

              <View className="w-full mt-4 px-4">
                <Text className="text-lg font-pregular uppercase">
                  Safety Advice
                </Text>
                <Text>• Prevention from Heart Attack</Text>
              </View>

              <View className="w-full mt-5 border-t border-gray-300">
                <View className="w-[100%] px-4 mt-2">
                  <Text className="text-lg">F&Q</Text>{" "}
                </View>
                {data?.FAQ?.map((item) => (
                  <Pressable
                    className={`w-full ${
                      isIOS
                        ? " border-b border-gray-200"
                        : "bg-white shadow-sm rounded-sm"
                    }`}
                    onPress={() => setShowFQ(!showFQ)}
                  >
                    <View className="p-4 flex-row items-center justify-between">
                      <Text className={isIOS ? "text-base" : "text-sm"}>
                        {item?.Q}
                      </Text>
                      <AntDesign
                        name={showFQ ? "down" : "right"}
                        size={18}
                        color={isIOS ? "black" : "#1a73e8"}
                      />
                    </View>
                    {showFQ && (
                      <Text className="px-4 pb-4 text-sm text-gray-600">
                        {item?.A}
                      </Text>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View
        className="w-full bg-white absolute bottom-0 py-4 px-4 border-t border-gray-200"
        style={{ paddingBottom: insets.bottom }}
      >
        {itemsCount > 0 ? (
          <View className="flex-row items-center justify-between">
            <View
              className={`flex-row items-center justify-between gap-4 p-2 ${
                isIOS
                  ? "border border-gray-200 rounded-xl"
                  : "bg-gray-100 rounded-md"
              }`}
            >
              <Pressable
                onPress={() => {
                  if (itemsCount > 0) {
                    setItemsCount(itemsCount - 1);
                    setAmount(amount - 133);
                  }
                }}
              >
                <AntDesign
                  name="minus"
                  size={22}
                  color={isIOS ? "#007AFF" : "#1a73e8"}
                />
              </Pressable>
              <Text
                className={`${
                  isIOS ? "text-[#007AFF]" : "text-[#1a73e8]"
                } font-medium`}
              >
                {itemsCount}
              </Text>
              <Pressable
                onPress={() => {
                  setItemsCount(itemsCount + 1);
                  setAmount(amount + 133);
                }}
              >
                <AntDesign
                  name="plus"
                  size={22}
                  color={isIOS ? "#007AFF" : "#1a73e8"}
                />
              </Pressable>
            </View>

            <Pressable
              className={`flex-1 ml-4 ${
                isIOS
                  ? "bg-primary rounded-xl py-4"
                  : "bg-primary rounded-md py-3 shadow-sm"
              }`}
            >
              <View className="flex-row items-center justify-center gap-4">
                <Text className="text-white font-semibold text-lg">
                  Go to Cart
                </Text>
                <Text className="text-white font-semibold text-lg">|</Text>
                <Text className="text-white font-semibold text-lg">
                  ₹{amount}
                </Text>
              </View>
            </Pressable>
          </View>
        ) : (
          <Pressable
            className={`w-full ${
              isIOS
                ? "bg-primary rounded-xl py-4"
                : "bg-primary rounded-md py-3 shadow-sm"
            }`}
            onPress={() => setItemsCount(1)}
          >
            <Text className="text-white font-semibold text-lg text-center">
              ADD
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
