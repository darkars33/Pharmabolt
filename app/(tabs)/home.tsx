import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";
import Carousel from "@/components/Carousel";

const home = () => {
  return (
    <SafeAreaView>
      <View className="bg-primary h-[393px] rounded-b-3xl">
        <View className="flex flex-row px-4 justify-between mt-4">
          <View className="flex flex-row">
            <Image
              source={require("../../assets/icons/Location Icon.png")}
              style={{ width: 40, height: 40 }}
            />
            <View className="flex flex-col ml-2">
              <Text className="text-xl font-pbold color-white">Home</Text>
              <Text className="color-white ml-1">ABC,13th Main...</Text>
            </View>
          </View>

          {/* Make this a pressable button later */}
          <View className="bg-white h-12 w-12 justify-center items-center  rounded-full">
            <Image
              source={require("../../assets/icons/Notification.png")}
              className="h-7 w-7"
            />
          </View>
          {/* \\\\\\\\\\\ */}
        </View>
        <View className="flex justify-center items-center mx-4">
          <SearchBar />
        </View>
        <ScrollView>
          <View className="mt-14">
            <Carousel />
          </View>
        </ScrollView>
      </View>
      <View className="flex flex-row justify-around content-center mt-5">
        <TouchableOpacity className="h-28 w-48 flex items-center justify-center bg-slate-400 rounded-3xl">
          <Text>DELIVER ON TRAIN</Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-28 w-48 flex items-center justify-center bg-slate-400 rounded-3xl">
          <Text>DELIVER AT HOME</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default home;
