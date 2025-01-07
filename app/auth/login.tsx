import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="items-center mt-[10rem] gap-2">
            <Text className="text-[2rem] font-pbold">Sign In</Text>
            <Text className="text-MountainMist font-pthin text-sm">
              Hi! Welcome back, you’ve been missed
            </Text>
          </View>

          <View className="w-[100%] px-7 mt-8 items-center gap-4">
            <View className="w-full gap-3">
              <Text className="font-pmedium">Email</Text>
              <TextInput
                className="w-[100%] border-2 border-[#EFEFF0] rounded-lg px-4 bg-[#EFEFF0] py-4 font-pregular"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View className="w-full gap-3">
              <Text className="font-pmedium">Password</Text>
              <TextInput
                className="w-[100%]  border-2 border-[#EFEFF0] rounded-lg px-4 bg-[#EFEFF0] py-4 font-pregular"
                placeholder="Enter your password"
                secureTextEntry={true}
              />
            </View>
            <View className="w-full items-end">
              <Text className="text-MountainMist underline font-pmedium">
                Forgot Password?
              </Text>
            </View>
          </View>

          <View className="w-[100%] px-7">
            <TouchableOpacity className="w-full h-12 justify-center items-center mt-12 bg-primary rounded-lg">
              <Text className="text-center text-white font-pmedium text-xl">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          <View className="absolute bottom-0 items-center mb-10 w-full">
            <Text className="text-MountainMist font-pmedium">
              Don’t have an account?{" "}
              <Text
                className="text-primary underline"
                onPress={() => {
                  router.push("/auth/signup");
                }}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Regular",
  },
});

export default Login;
