import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "#00BFB3", headerShown: false }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/icons/Home (2).png")}
              className="h-8 w-8"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/icons/Category.png")}
              className="h-8 w-8"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/icons/Cart.png")}
              className="h-8 w-8"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/icons/Profile.png")}
              className="h-8 w-8"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
