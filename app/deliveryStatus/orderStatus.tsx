import { View, Text, Pressable, TouchableOpacity, Linking, Platform, PermissionsAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { HomeStatusBar } from "@/components/HomeStatusBar";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSelector} from "react-redux";

const OrderStatus = () => {
  const router = useRouter();
  const data = useSelector((state: { cart: { cart: any } }) => state.cart.cart);

  const [show, setShow] = useState({
    address: false,
    items: false,
  });

  const requestCallPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
          {
            title: 'Phone Call Permission',
            message: 'This app needs access to make phone calls.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  useEffect(() =>{
    requestCallPermission();
  },[])

  const handlePhonePress = async ({ phoneNumber }: { phoneNumber: string }) => {
    try {
      const phoneUrl = `tel:${phoneNumber}`;
      const supported = await Linking.canOpenURL(phoneUrl);

      if (supported) {
        await Linking.openURL(phoneUrl);
      } else {
        console.warn("Phone dialer not supported");
      }
    } catch (error) {
      console.error("Error opening phone dialer:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HomeStatusBar />
      <Stack.Screen options={{ headerShown: false }} />
      <View className="p-5 bg-primary pb-10 rounded-b-3xl">
        <View className="flex-row items-center gap-10">
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>
          <Text className="text-xl font-pmedium text-white">Order Status</Text>
        </View>
        <View className="p-3 w-[9rem] bg-[#08D2C6] rounded-xl drop-shadow-xl mt-7">
          <Text className="font-pregular text-white">ARRIVING IN</Text>
          <Text className="font-pmedium text-white text-2xl">10 Mins</Text>
        </View>
      </View>

      <View className="w-full mt-5 p-2 px-4">
        <View className="w-full flex-row items-center justify-between">
          {/* Packing */}
          <View className="flex-row items-center gap-1">
            <View className="p-2 bg-[#009262] rounded-full" />
            <Text className="font-pregular text-[0.75rem] text-[#009262]">
              PACKING
            </Text>
          </View>
          <View className="flex-1 border-t border-dashed border-[#009262]" />

          {/* On the Way */}
          <View className="flex-row items-center gap-1">
            <View className="p-2 bg-[#009262] rounded-full" />
            <Text className="font-pregular text-[0.75rem] text-[#009262]">
              ON THE WAY
            </Text>
          </View>
          <View className="flex-1 border-t border-dashed border-gray-300" />

          {/* Arrived */}
          <View className="flex-row items-center gap-1">
            <View className="p-2 bg-gray-300 rounded-full" />
            <Text className="font-pregular text-[0.75rem] text-gray-700">
              ARRIVED
            </Text>
          </View>
        </View>

        <View className="w-full mt-6 p-3 px-6 border border-[#D6F0FF] rounded-2xl items-center bg-[#EFFEFB]">
          <Text className="font-pregular text-lg">Delivery On Time</Text>
          <Text className="text-center font-pregular text-[#888888] text-sm mt-2">
            Great news! Your order is on track and will be delivered on time.
          </Text>
        </View>

        <View className="w-full mt-6 p-4 border border-[#FFD388] rounded-2xl bg-[#FFF8EB]">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Ionicons name="location-outline" size={20} color="#DD5202" />
              <Text className="font-pregular">Work</Text>
            </View>
            <Pressable
              onPress={() => setShow({ ...show, address: !show.address })}
            >
              <AntDesign
                name={show.address ? "down" : "right"}
                size={20}
                color="black"
              />
            </Pressable>
          </View>
          {show.address && (
            <View className="px-6 duration-100">
              <Text className="font-pregular text-sm mt-3">
                123, Evergreen Apartments, Gandhi Nagar, Mumbai, Maharashtra
              </Text>
            </View>
          )}
        </View>

        <View className="w-full mt-6 p-4 px-6 border border-primary rounded-2xl">
          <View className="flex-row items-center justify-between">
            <Text className="font-pregular">4 Items</Text>
            <Pressable
              onPress={() => setShow({ ...show, items: !show.items })}
              className="flex-row items-center gap-2"
            >
              <Text className="font-pregular">Order Details</Text>
              <AntDesign
                name={show.items ? "down" : "right"}
                size={20}
                color="black"
              />
            </Pressable>
          </View>
          {show.items && (
            <View className="mt-3 flex-col gap-4">
              {data.map((item: any) => (
                <View className="flex-row items-center justify-between" key={item.ID}>
                  <Text className="font-pregular">{item.DRUGS}</Text>
                  <Text className="font-pregular">{item.quantity}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View className="w-full mt-6 p-4 px-6 bg-[#F6F6F7] rounded-2xl flex-row items-center gap-4 justify-center">
          <View>
            <FontAwesome5 name="user-alt" size={18} color="black" />
          </View>
          <View>
            <Text className="font-pregular">
              Hi, I'm Manish (Delivery Partner)
            </Text>
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={() => {
                handlePhonePress({ phoneNumber: "1234567890" });
              }}
            >
              <Text className="font-pregular text-sm text-gray-400 underline">
                Get in touch
              </Text>
              <FontAwesome name="phone" size={15} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderStatus;
