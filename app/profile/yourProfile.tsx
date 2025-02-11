import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-date-picker";
import Icons from "../../constants/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";

const yourProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    mNumber: "",
    email: "",
    gender: "",
    dob: "",
  });
  const userData = useSelector((state: any) => state.user.user);

  const [date, setDate] = useState(new Date());
  const [openDate, setDateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View className="h-24 justify-center items-center border-b border-gray-300">
          <Pressable
            onPress={() => router.back()}
            className="absolute top-1/3 left-5"
          >
            <Ionicons name="chevron-back" size={30} color="black" />
          </Pressable>
          <Text className="text-2xl font-pmedium">Your Profile</Text>
        </View>

        <>
          <View className=" flex-1 justify-between items-center mt-10">
            <View className="w-[85%] flex justify-between h-[70%]">
              <View>
                <Text className="font-pregular">Name</Text>
                <TextInput
                  className="w-full mt-2 rounded-lg p-4 bg-MountainMist/20"
                  onChangeText={(newText) => {
                    setData({ ...data, name: newText });
                  }}
                  value={userData.NAME}
                />
              </View>
              <View>
                <Text className="font-pregular">Phone Number</Text>
                <TextInput
                  className="w-full mt-2 rounded-lg p-4 bg-MountainMist/20"
                  keyboardType="numeric"
                  onChangeText={(num) => {
                    const numericText = num.replace(/[^0-9]/g, "");
                    setData({ ...data, mNumber: numericText });
                  }}
                  value={userData.MOBILE}
                />
              </View>
              <View>
                <Text className="font-pregular">Email</Text>
                <TextInput
                  className="w-full mt-2 rounded-lg p-4 bg-MountainMist/20"
                  placeholder="example@gmail.com"
                  onChangeText={(mail) => {
                    setData({ ...data, email: mail });
                  }}
                  value={userData.EMAIL}
                />
              </View>
              <View>
                <Text className="font-pregular">Gender</Text>
                <DropDownPicker
                  open={open}
                  value={userData.GENDER}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={{
                    backgroundColor: "#E1E3E4",
                    borderColor: "#E1E3E4",
                  }}
                />
              </View>
              <View>
                <Text className="font-pregular">Date of Birth</Text>
                {/* <TextInput
                className="w-full mt-2 rounded-lg p-4 bg-MountainMist/20"
                placeholder="John Doe"
              /> */}
                <View className="w-full mt-2 rounded-lg p-4 bg-MountainMist/20 flex flex-row justify-between items-center">
                  <Text>
                    {userData.DOB || date.toLocaleDateString("en-GB")}
                  </Text>
                  <View>
                    {/* <Button title="Open" onPress={() => setDateOpen(true)} /> */}
                    <Pressable onPress={() => setDateOpen(true)}>
                      <Image source={Icons.dob} />
                    </Pressable>
                    <DatePicker
                      modal
                      open={openDate}
                      date={date}
                      mode="date"
                      onConfirm={(date) => {
                        setDateOpen(false);
                        setDate(date);
                      }}
                      onCancel={() => {
                        setDateOpen(false);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="w-full flex justify-center items-center border-t border-gray-300 h-28">
            <View className="w-[90%]">
              <TouchableOpacity
                className="p-5 rounded-lg bg-primary px-10 items-center "
                onPress={() => alert("Update")}
              >
                <Text className="font-pmedium text-xl text-white">Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </View>
    </SafeAreaView>
  );
};

export default yourProfile;
