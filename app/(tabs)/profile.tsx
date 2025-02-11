import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, {useEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Icons from "../../constants/icons";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "@/redux/UserSlice";

const profile = () => {
  const router = useRouter();
   const flashKey = useSelector((state: any) => state.user.flashKey);
    const userID = useSelector((state: any) => state.user.userID);
    const api = process.env.EXPO_PUBLIC_CUSTOMER_API || "";
    const dispatch = useDispatch();
    const [data, setData] = useState({
      name:"",
      mNumber:"",
    })

    const handleGetProfile = async () => {
      try {
        
        const res = await axios.get(`${api}/v1/customer/get-profile?`, {
          params: {
            CUSTOMER_ID: userID,
          },
          headers: {
            Authorization: `Bearer ${flashKey}`,
          },
        });
        const data = res.data.response.response;
        dispatch(setUser(data));
        setData({
          name: data.NAME,
          mNumber: data.MOBILE
        })
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
        }
      } finally {
       
      }
    };

    useEffect(() =>{
        handleGetProfile()
    },[])

    

  const options = [
    {
      title: "Your Profile",
      screen: "/profile/yourProfile",
      icon: Icons.profileBlack,
    },
    {
      title: "My Orders",
      screen: "/profile/myOrders",
      icon: Icons.orders,
    },
    {
      title: "Manage Address",
      screen: "/profile/manageAddress",
      icon: Icons.location,
    },
    {
      title: "Payment Methods",
      screen: "/profile/paymentMethods",
      icon: Icons.payment,
    },
    {
      title: "Settings",
      screen: "settings",
      icon: Icons.settings,
    },
    {
      title: "Help Center",
      screen: "helpCenter",
      icon: Icons.helpCenter,
    },
    {
      title: "Privacy Policy",
      screen: "privacyPolicy",
      icon: Icons.privacyPolicy,
    },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.push(item.screen)}
      className="flex flex-row items-center justify-between px-5 py-4 border-b border-gray-300"
    >
      <View className="flex flex-row items-center">
        <Image source={item.icon} style={{ height: 30, width: 30 }} />
        <Text className="ml-4 text-lg font-pregular">{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} className="text-gray-500" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col">
        <View className="flex justify-center items-center border-b border-gray-300 h-24 ">
          <Text className="text-2xl font-pmedium">Profile</Text>
        </View>
        <View className="flex flex-row justify-between px-5 mt-4">
          <View>
            <Text className="text-xl font-pmedium">{data.name}</Text>
            <Text className="text-sm">{data.mNumber}</Text>
          </View>
          <View className="h-14 w-14 bg-slate-300 rounded-full"></View>
        </View>
        <View className="mt-5">
          <FlatList data={options} renderItem={renderItem} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default profile;
