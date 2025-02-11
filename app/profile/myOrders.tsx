import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { myOrderData } from "@/constants/Data";

const myOrders = () => {
  const router = useRouter();

  function handleNavigateToDetails(id: string) {
    router.push(`/productDetails/${id}`);
  }

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
          <Text className="text-2xl font-pmedium">My Orders</Text>
        </View>
        {myOrderData.length != 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="w-full py-7 border-b gap-7 mb-5 border-gray-300 px-3 flex-col items-center">
              {myOrderData.map((order, index) => {
                return (
                  <TouchableOpacity
                    className="w-full flex flex-row justify-center items-center"
                    key={index}
                    onPress={() => handleNavigateToDetails(order.ID.toString())}
                  >
                    <View className="w-1/3 h-32 border border-gray-300 rounded-md overflow-hidden">
                      <Image
                        source={require("@/assets/images/ProductSample.png")}
                        alt="product image"
                        className="w-full h-full "
                      />
                    </View>

                    <View className="flex flex-col w-[60%]">
                      <View className="mx-5">
                        <Text className="font-pregular text-lg leading-5">
                          {order.TITLE}
                        </Text>
                        <Text className="font-pbold mt-2">
                          Delivered ({order.DELIVERED})
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <Text>No orders</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default myOrders;
