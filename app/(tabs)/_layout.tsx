import { Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";

const _layout = () => {
  return (
  
     <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007C6A",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            paddingTop: 10
          },
          default: {
            height: 60,
            backgroundColor: "#fff",
            borderTopWidth: 0,
            shadowOffset: {
              width: 0,
              height: 2,
            },
          },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarLabelStyle: {
            fontFamily: "Roboto-Regular",
          },
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/icons/Home (2).png")}
              style={{
                height: 26,
                width: 26,
                tintColor: focused ? "#00BFB3" : "#8E8E8E",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="category/index"
        options={{
          title: "Category",
          tabBarLabelStyle: {
            fontFamily: "Roboto-Regular",
          },
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/icons/Category.png")}
              style={{
                height: 26,
                width: 26,
                tintColor: focused ? "#00BFB3" : "#8E8E8E",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarLabelStyle: {
            fontFamily: "Roboto-Regular",
          },
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/icons/Cart.png")}
              style={{
                height: 26,
                width: 26,
                tintColor: focused ? "#00BFB3" : "#8E8E8E",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabelStyle: {
            fontFamily: "Roboto-Regular",
          },
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/icons/Profile.png")}
              style={{
                height: 26,
                width: 26,
                tintColor: focused ? "#00BFB3" : "#8E8E8E",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            />
          ),
        }}
      />
    </Tabs>
 
  );
};

export default _layout;
