import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = () => {

  const animation = useRef(null);

  const [ani, SetAni] = useState(false);
 

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} className="">
      <LottieView
        autoPlay
        loop
        ref={animation}
        style={{
          width: 400,
          height: 400,
          backgroundColor: "transparent",
          marginRight:50
        }}
        source={require("@/assets/MainScene.json")}
      />
      <View className="flex flex-col items-center mt-[5rem]">
      <Image source={require('@/assets/images/pharmaboltLogo.png')} style={{ width: 100, height: 100 }} /> 
      <Text style={styles.text} className="text-2xl font-bold text-[#007C6A]">PharmaBolt</Text>
      <Text style={styles.text} className="text-[#E1E3E4]">Your Health, Our Priority</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Regular",
  },
});

export default SplashScreen;
