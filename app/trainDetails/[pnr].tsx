import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const Index = () => {
  const { pnr } = useLocalSearchParams();
  const router = useRouter();

  const [selectStation, setSelectStation] = useState<string>();


  const trainJourneyData = [
    {
      stationName: "Kanpur Central",
      stationCode: "CNB",
      time: "Today, 7:11 PM",
    },
    {
      stationName: "Lucknow Junction",
      stationCode: "LJN",
      time: "Today, 8:45 PM",
    },
    {
      stationName: "New Delhi",
      stationCode: "NDLS",
      time: "Tomorrow, 5:30 AM",
    },
    {
      stationName: "Mumbai Central",
      stationCode: "BCT",
      time: "Tomorrow, 3:15 PM",
    },
  ];

  const renderItem = ({ item }: { item: { stationName: string; stationCode: string; time: string } }) => (
    <TouchableOpacity className={`w-full p-3 border  rounded-xl mb-3 ${selectStation == item.stationName ? "bg-[#EBFEF5] border-primary": "bg-white border-gray-300"}`} onPress={() =>{
          setSelectStation(item.stationName);
    }}>
      <View className="flex-row items-center justify-between w-full rounded-xl">
        <Text className="text-lg font-pregular text-gray-800">
          {item.stationName}
        </Text>
        <Text className="font-pregular text-sm text-MountainMist">
          {item.stationCode}
        </Text>
      </View>
      <Text className="text-sm text-MountainMist font-pregular mt-2">{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 relative bg-gray-50">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full h-80 relative">
        <Image
          source={require("@/assets/images/trainPNR.png")}
          alt="trainPNR"
          className="w-[100%] h-[100%] rounded-b-3xl"
        />
        <View className="absolute -bottom-16 left-0 right-0 w-full px-4">
          <View className="p-4 bg-white w-[100%] flex items-center justify-between rounded-2xl border border-gray-300">
            <View className="flex flex-row justify-between w-full">
              <View>
                <Text className="font-pregular">PNR: {pnr}</Text>
                <Text className="font-pregular text-sm text-MountainMist">
                  Seat No: RAC/S1/15
                </Text>
              </View>
              <View>
                <Text className="font-pregular text-sm text-MountainMist text-right">
                  DDN SFH EXP - 14114
                </Text>
                <Text className="font-pregular text-sm text-right text-MountainMist">
                  Boarding: 13 Dec
                </Text>
              </View>
            </View>
            <View className="flex flex-row justify-between w-full mt-10">
              <View>
                <Text className="font-pregular text-sm text-MountainMist">
                  Dehradon
                </Text>
                <Text className="font-pregular text-sm text-MountainMist">
                  Fri, 13 Dec
                </Text>
              </View>
              <View>
                <Text className="font-pregular text-sm text-MountainMist text-right">
                  Subedragraj
                </Text>
                <Text className="font-pregular text-sm text-right text-MountainMist">
                  Sat, 14 Dec
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="p-4 px-6 absolute top-16 ">
            <TouchableOpacity className="p-2 bg-white rounded-full" onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          </View>
      </View>

      <View className="flex-1 w-full px-4 mt-24">
        <View className="w-full flex-row items-center mb-4">
          <View className="flex-1 border-t border-dashed border-MountainMist/30" />
          <Text className="text-center font-pmedium text-MountainMist mx-3">
            AVAILABLE STATIONS
          </Text>
          <View className="flex-1 border-t border-dashed border-MountainMist/30" />
        </View>
        
        <FlatList
          data={trainJourneyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.stationCode}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View className="w-full p-4 absolute bottom-0 bg-white border-t border-gray-300">
        <TouchableOpacity
          className={`w-[100%] rounded-xl p-3 flex items-center justify-center ${
            selectStation ? "bg-primary" : "bg-gray-300"
          }`}
          
        >
          <Text className="font-pmedium text-white text-xl">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

