import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const category = () => {
  return (
    <SafeAreaView>
      <Text>category</Text>
      <Link href={"/accountInfo"}>
        <Text>Account info this is</Text>
      </Link>
    </SafeAreaView>
  );
};

export default category;
