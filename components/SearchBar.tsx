import { View, Text, Image, TextInput } from "react-native";
import React from "react";

const SearchBar = () => {
  return (
    <View className="w-full h-14 mt-5 mx-10 rounded-xl bg-white justify-between items-center flex flex-row">
      <View className="flex flex-row w-24 ml-4">
        <Image
          source={require("../assets/icons/Search Icon.png")}
          className="h-6 w-6"
        />
        <TextInput
          className="ml-5 text-xl  font-pregular"
          placeholder="Search"
        ></TextInput>
      </View>
      <Image
        source={require("../assets/icons/Home (2).png")}
        className="h-6 w-6 mr-4"
      />
    </View>
  );
};

export default SearchBar;
