import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const SearchBar = () => {
  return (
    <View className="w-full h-[3.5rem] mt-5 px-2 bg-white rounded-xl flex-row items-center justify-between space-x-3">
      <View className="flex-1 flex-row items-center rounded-lg px-3 py-2">
        <Image
          source={require("../assets/icons/Search Icon.png")}
          className="h-6 w-6 mr-2"
        />
        <TextInput 
          className="flex-1 font-pmedium" 
          placeholder="Search"
       
        />
      </View>
      <FontAwesome name="microphone" size={20} color="#55565A" className="mr-3" />
    </View>
  );
};

export default SearchBar;

