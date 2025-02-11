import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import SearchBar from "@/components/SearchBar";
import Carousel from "@/components/Carousel";
import { HomeStatusBar } from "@/components/HomeStatusBar";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import axios from "axios";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";


interface MasterDataItem {
  CODE: string;
  NAME: string;
  VALUE: string[];
  IMAGE: string;
}

const home = () => {
  const [masterData, setMasterData] = useState<MasterDataItem[]>([]);
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const animation = useRef(null);
  const flashKey = useSelector((state: any) => state.user.flashKey);

  const api = process.env.EXPO_PUBLIC_CUSTOMER_API || "";
  const getCurrentLocationCoordinates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const lat=location.coords.latitude;
    const long=location.coords.longitude;

    let address= await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long
    })

    setAddress(
      `${address[0].name}, ${address[0].street}, ${address[0].city}, ${address[0].region}, ${address[0].postalCode}`
    )

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
      if (data) {
        setMasterData(data);
        setLoading(false);
      }
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
      setLoading(true);
    }
  };

  useEffect(() => {
    handleFetchData();
    getCurrentLocationCoordinates();
  }, []);

  console.log(address)


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeStatusBar />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View className="bg-primary pb-5 rounded-b-3xl">
          <View className="flex flex-row px-4 justify-between items-center mt-5">
            <View className="flex flex-row justify-center items-center">
              <Image
                source={require("../../assets/icons/Location Icon.png")}
                style={{ width: 30, height: 30 }}
              />
              <View className="flex flex-col ml-2">
                <Text className="text-xl font-pbold color-white">Home</Text>
                <Text className="color-white font-pregular">
                  {address ? address.slice(0,30) : "Fetching Location..."}...
                </Text>
              </View>
            </View>

            {/* Make this a pressable button later */}
            <View className="bg-white h-10 w-10 justify-center items-center  rounded-full">
              <Image
                source={require("../../assets/icons/Notification.png")}
                className="h-5 w-5"
              />
            </View>
          </View>
          <View className="flex justify-center items-center px-5">
            <SearchBar />
          </View>
          <ScrollView>
            <View className="mt-5">
              <Carousel />
            </View>
          </ScrollView>
        </View>
        <View className="flex flex-row justify-around gap-2 content-center mt-5 px-3">
          <TouchableOpacity className="h-28 w-48 p-2 flex flex-row relative bg-[#0684FF] rounded-2xl overflow-hidden">
            <Text className="text-xl text-white font-pbold ml-1">
              DELIVER ON TRAIN
            </Text>
            <Image
              source={require("@/assets/images/Train.png")}
              style={{ width: 100, height: 80 }}
              className="absolute right-0 bottom-0 "
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/deliveryStatus/orderStatus")}
            className="h-28 w-48 p-2 flex flex-row relative bg-[#0684FF] rounded-2xl overflow-hidden"
          >
            <Text className="text-xl text-white font-pbold ml-1">
              DELIVER AT HOME
            </Text>
            <Image
              source={require("@/assets/images/Home.png")}
              style={{ width: 100, height: 60 }}
              className="absolute right-1 bottom-0"
            />
          </TouchableOpacity>
        </View>

        <View className="pb-16">
          {loading && masterData.length == 0 ? (
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
              {masterData.map((item: any) => (
                <View className="flex flex-col mt-5 px-3" key={item?.CODE}>
                  <Text className="font-pmedium ">{item?.NAME}</Text>
                  <FlatList
                    data={item?.VALUE}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity className="w-28 bg-white rounded-lg p-2 flex flex-col items-center mt-2">
                        <Image
                          src={item?.IMAGE}
                          alt="Sample Tablet"
                          style={{ width: 70, height: 60 }}
                        />
                        <Text className="font-pregular text-center text-sm">
                          {item?.NAME}
                        </Text>
                      </TouchableOpacity>
                    )}
                    contentContainerStyle={{ gap: 6 }}
                  />
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
