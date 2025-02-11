import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { HomeStatusBar } from "@/components/HomeStatusBar";
import { useSelector } from "react-redux";
import axios from "axios";
import LottieView from "lottie-react-native";

interface MasterDataItem {
  CODE: string;
  VALUE: string[];
  NAME: string;
}

const Index = () => {
  const router = useRouter();
  const [masterData, setMasterData] = useState<MasterDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const animation = useRef(null);
  const flashKey = useSelector((state: any) => state.user.flashKey);
  const api = process.env.EXPO_PUBLIC_CUSTOMER_API || "";

  const handleNavigate = (id: string) => {
    router.push(`/category/${id}`);
  };

  const handleFetchData = async () => {
    try {
      const res = await axios.get(`${api}/v1/customer/get-master-data?`, {
        params: {
          CODE: "CATEGORIES_DATA",
        },
        headers: {
          Authorization: `Bearer ${flashKey}`,
        },
      });
      const data = res?.data?.response?.response?.VALUE;
      if(data){
        setMasterData(data);
      }
    } catch (error) {
      console.log(error);
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
    handleFetchData();
  }, []);


  return (
    <SafeAreaView className="bg-white h-full">
      <HomeStatusBar />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="h-20 flex-row justify-between items-center px-5 border-b border-gray-200">
        <Pressable onPress={() => router.back()} className="">
          <Ionicons name="chevron-back" size={30} color="black" />
        </Pressable>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            className=" p-3 rounded-full bg-[#f2f2f7]"
            onPress={() => alert("Search")}
          >
            <AntDesign name="search1" size={18} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-3 rounded-full bg-[#f2f2f7]"
            onPress={() => alert("Notifications")}
          >
            <Ionicons name="notifications-sharp" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="pb-16">
          {loading ? (
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
            <>
              {masterData.map((item:any) => (
                <View className="w-full px-3 mt-5 flex-col gap-3" key={item?.CODE}>
                  <Text className="font-pmedium">{item?.NAME}</Text>
                  <View className="flex-row w-full gap-0 flex-wrap">
                    {item.VALUE?.map((item:any) => (
                      <TouchableOpacity
                        key={item?.NAME}
                        className="w-1/4 flex-col items-center gap-1 p-1"
                        onPress={() =>handleNavigate(item?.NAME)}
                      >
                        <Image
                                                src={item?.IMAGE}
                                                alt="Sample Tablet"
                                                style={{ width: 70, height: 60 }}
                                              />
                        <Text className="font-pregular text-[0.8rem] text-center">
                          {item?.NAME}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
