import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Signup = () => {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isMobileFocused, setIsMobileFocused] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center">
      <View className="items-center mt-[10rem] gap-2 w-[80%]">
        <Text className="text-[2rem] font-pbold">Create Account</Text>
        <Text className="text-MountainMist font-pthin text-sm text-center">
          Fill your information below or register with your social account.
        </Text>
      </View>
      <View className="w-[100%] px-7 mt-8 items-center gap-4">
        <View className="w-full gap-3">
          <Text className="font-pmedium">Name</Text>
          <TextInput
            className={`w-[100%] border-2  rounded-lg px-4 bg-[#EFEFF0] py-4 font-pregular ${
              isNameFocused ? "border-primary bg-[#cdf1e4]" : "border-[#EFEFF0]"
            }`}
            placeholder="Enter your name"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
          />
        </View>

        <View className="w-full gap-3">
          <Text className="font-pmedium">Mobile Number</Text>
          <View className="flex-row w-full gap-3">
            <TextInput
              className="border-2  rounded-lg px-4 bg-[#EFEFF0] py-4 border-[#EFEFF0] font-pregular "
              placeholder="+91"
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue="+91 "
              editable={false}
            />

            <TextInput
              className={`flex-1 border-2  rounded-lg px-4 py-4 font-pregular ${
                isMobileFocused
                  ? "border-primary bg-[#cdf1e4]"
                  : "border-[#EFEFF0] bg-[#EFEFF0]"
              }`}
              placeholder="0000000000"
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setIsMobileFocused(true)}
              onBlur={() => setIsMobileFocused(false)}
            />
          </View>
        </View>
      </View>

      <View className="w-[100%] px-7">
        <TouchableOpacity className="w-full h-12 justify-center items-center mt-12 bg-primary rounded-lg" onPress={() =>{
          router.push("/auth/verify");
        }}>
          <Text className="text-center text-white font-pmedium text-xl">
            Send OTP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Signup;
