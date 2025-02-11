import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStatusBar } from "@/components/HomeStatusBar";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

const CartSummary = () => {
  const router = useRouter();
  const cart = useSelector(
    (state: { cart: { cart: any[] } }) => state.cart.cart
  );
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setData(cart || []);
  }, []);

  const totalAmount = data.reduce(
    (total, item) => total + item.PRICE * item.quantity,
    0
  );

  const gst = totalAmount * 0.18;
  const totalAmountWithGST = totalAmount + gst;

  const totalQuantity = data.reduce(
          (total, item) => total + item.quantity,
          0
  )

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <HomeStatusBar />
      <Stack.Screen options={{ headerShown: false }} />
      <View className="h-20 flex-row justify-between items-center px-5 border-b border-[#D4D6DD]">
        <Pressable onPress={() => router.back()} className="">
          <Ionicons name="chevron-back" size={30} color="black" />
        </Pressable>
        <Text className="text-2xl font-pmedium">Order Summary</Text>
        <TouchableOpacity className="p-2 bg-[#D4D6DD] rounded-full">
          <AntDesign name="search1" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {data.length != 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-full mt-5 mb-5  px-3 flex-col items-center">
            {data.map((item, index) => {
              const tAmount = item.quantity * item.PRICE;
              return (
                <View
                  className="w-[100%] flex-row items-start gap-4 my-2"
                  key={item.ID}
                >
                  <TouchableOpacity className="w-1/5 h-24 border border-gray-300 rounded-md overflow-hidden">
                    <Image
                      source={require("@/assets/images/ProductSample.png")}
                      alt="product image"
                      className="w-full h-full"
                    />
                  </TouchableOpacity>
                  <View className="w-full flex-row  items-center gap-5">
                    <TouchableOpacity className=" w-[50%]">
                      <Text
                        className="text-sm font-pregular text-gray-800"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {item.Description}
                      </Text>
                      <Text className="text-sm mt-1 font-pregular text-gray-600">
                        Quantity: {item.quantity}
                      </Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center">
                      <Text className="text-lg font-pmedium text-black">
                        ₹{tAmount.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}

            <View className="w-full p-3 mb-24">
              <Text className="font-pmedium text-sm">
                Price Details ({totalQuantity}items)
              </Text>
              <View className="w-full flex-row justify-between items-center mt-4">
                <Text className="font-pregular text-sm">Cart Total</Text>
                <Text className="font-pregular text-sm">
                  ${totalAmount.toFixed(2)}
                </Text>
              </View>
              <View className="w-full flex-row justify-between items-center mt-2">
                <Text className="font-pregular text-sm">GST</Text>
                <Text className="font-pregular text-sm">${gst.toFixed(2)}</Text>
              </View>
              <View className="w-full border border-gray-300 mt-4 " />
              <View className="w-full flex-row justify-between items-center mt-2">
                <Text className="font-pregular text-sm">Total</Text>
                <Text className="font-pregular text-sm">${totalAmountWithGST.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center">
          <Text className="text-xl font-pmedium mt-10">Your Cart is Empty</Text>
          <Text className="text-lg font-pmedium mt-2">Add items to it now</Text>
        </View>
      )}

      {data.length != 0 && (
        <View className="w-full absolute bg-white bottom-0 border-t border-gray-300 p-4 flex-row justify-between items-center">
          <View>
            <Text className="font-pmedium text-lg">
              {" "}
              ${totalAmountWithGST.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            className="p-3 px-24 bg-primary rounded-lg"
          >
            <Text className="text-white font-pmedium">Pay</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartSummary;
