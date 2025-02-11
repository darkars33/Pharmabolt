import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type PrescriptionOption = "none" | "have";

export default function PrescriptionScreen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] =
    useState<PrescriptionOption>("have");
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status: mediaStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaStatus !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }

        const { status: cameraStatus } =
          await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== "granted") {
          Alert.alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        aspect: [4, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className="h-20 flex-row justify-between items-center px-5 border-b border-gray-200">
        <TouchableOpacity className="p-4" onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-4">
        <View className="border bg-[#F6F6F7] border-gray-200 mt-4 rounded-xl overflow-hidden">
          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={() => setSelectedOption("none")}
          >
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedOption === "none"
                  ? "border-[#00BFA5]"
                  : "border-gray-300"
              } items-center justify-center mr-3`}
            >
              {selectedOption === "none" && (
                <View className="w-2.5 h-2.5 rounded-full bg-[#00BFA5]" />
              )}
            </View>
            <Text className="text-base text-black font-pmedium">
              Do not have a prescription?
            </Text>
          </TouchableOpacity>

          {selectedOption === "none" && (
            <View className="p-4">
              <View className="w-[200px] h-[200px] rounded-full bg-gray-200 self-center mb-6" />

              <Text className="text-sm text-gray-700 font-pregular mb-4 leading-6">
                An experienced doctor will call you for a consultation within 10
                minutes.
              </Text>

              <Text className="text-lg font-semibold text-black mb-4 font-pmedium">
                FREE
              </Text>

              <TouchableOpacity className="bg-[#00BFA5] rounded-lg p-4 items-center">
                <Text className="text-white text-base font-medium font-pmedium">
                  Proceed to Buy
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View className="border bg-[#F6F6F7] border-gray-200 mt-4 rounded-xl overflow-hidden">
          <View>
            <TouchableOpacity
              className="flex-row items-center p-4 border-b border-gray-200"
              onPress={() => setSelectedOption("have")}
            >
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedOption === "have"
                    ? "border-[#00BFA5]"
                    : "border-gray-300"
                } items-center justify-center mr-3`}
              >
                {selectedOption === "have" && (
                  <View className="w-2.5 h-2.5 rounded-full bg-[#00BFA5]" />
                )}
              </View>
              <Text className=" text-black flex-1 font-pmedium">
                Have a prescription?
              </Text>
              <Text className="text-[0.7rem] text-[#00BFA5] font-pregular">
                See prescription guide
              </Text>
            </TouchableOpacity>

            {selectedOption === "have" && (
              <View className="p-4">
                {imageUri ? (
                  <View>
                    <View className="mt-4 p-2 rounded-lg items-center bg-white">
                      <Image
                        source={{ uri: imageUri }}
                        className="w-[100%] h-96 rounded-lg"
                        resizeMode="cover"
                      />
                    </View>
                    <TouchableOpacity
                      className="mt-4 bg-[#FF4D4D] rounded-lg p-2 items-center"
                      onPress={() => setImageUri(null)}
                    >
                      <Text className="text-white text-sm font-medium font-pregular">
                        Remove
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="mt-4 bg-primary rounded-lg p-2 items-center"
                      onPress={() => router.push('/checkout/cartSummary')}
                    >
                      <Text className="text-white text-sm font-medium font-pregular">
                        Upload
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View className="p-4 flex-col items-center">
                    <Text className="text-sm text-gray-600 mb-4 font-pregular">
                      Choose an option to upload prescription
                    </Text>
                    <View className="flex-row gap-4">
                      <TouchableOpacity
                        className="items-center"
                        onPress={openCamera}
                      >
                        <View className="w-16 h-16 rounded-full bg-white items-center justify-center mb-2">
                          <MaterialIcons
                            name="camera-alt"
                            size={40}
                            color="#666"
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="items-center"
                        onPress={selectImage}
                      >
                        <View className="w-16 h-16 rounded-full bg-white items-center justify-center mb-2">
                          <MaterialIcons
                            name="photo-library"
                            size={40}
                            color="#666"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
