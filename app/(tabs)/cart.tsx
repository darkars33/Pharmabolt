import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useSelector, useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity } from "@/redux/CartSlice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { HomeStatusBar } from "@/components/HomeStatusBar";
import { DeliveryTypeSelector } from "@/components/bottom-sheet/delivery-type-selector";
import { PatientSelector } from "@/components/bottom-sheet/patient-selector";
import { AddPatientForm } from "@/components/bottom-sheet/add-patient-form";

type BottomSheetView = "delivery" | "patients" | "addPatient";

const cart = () => {
  const router = useRouter();
  const cart = useSelector(
    (state: { cart: { cart: any[] } }) => state.cart.cart
  );
  const [data, setData] = useState<any[]>([]);
  const dispatch = useDispatch();
  const sheetRef = useRef<BottomSheet>(null);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
  const [deliveryType, setDeliveryType] = useState("");
  const [currentView, setCurrentView] = useState<BottomSheetView>("delivery");

  const snapPoints = useMemo(() => {
    if (currentView === "delivery") return ["1%", "45%"];
    return ["1%", "80%"];
  }, [currentView]);

  useEffect(() => {
    setData(cart || []);
  }, [cart]);

  const removeItem = (item: any[]) => {
    dispatch(decrementQuantity(item));
  };

  const addItems = (item: any[]) => {
    dispatch(incrementQuantity(item));
  };

  const handleNavigateToDetails = (id: string) => {
    router.push(`/productDetails/${id}`);
  };

  let totalAmount = data.reduce(
    (total, item) => total + item.PRICE * item.quantity,
    0
  );
  const gst = totalAmount * 0.18;
  const totalAmountWithGST = totalAmount + gst;

  const handleOpenOrClose = () => {
    if (bottomSheetIndex === 1) {
      sheetRef.current?.close();
      setBottomSheetIndex(0);
    } else {
      sheetRef.current?.snapToIndex(1);
      setBottomSheetIndex(1);
    }
  };

  const handleBottomSheetChange = (index: number) => {
    setBottomSheetIndex(index);
    if (index === 0) {
      setDeliveryType("");
      setCurrentView("delivery");
    }
  };

  const handleDeliveryTypeSelect = (type: string) => {
    setDeliveryType(type);
  };

  const handleDeliveryConfirm = () => {
    if (deliveryType === "train") {
      router.push("/trainPNR");
    } else if (deliveryType === "home") {
      router.push("/(deliverHome)/deliverHome");
    }
  };

  const handlePatientBack = () => {
    setCurrentView("delivery");
    setDeliveryType("");
  };

  const handleAddNewPatient = () => {
    setCurrentView("addPatient");
  };

  const handleAddPatientBack = () => {
    setCurrentView("patients");
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <HomeStatusBar />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="h-20 flex-row justify-between items-center px-5">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={30} color="black" />
        </Pressable>
        <Text className="text-2xl font-pmedium">Cart</Text>
        <TouchableOpacity className="p-2 bg-[#D4D6DD] rounded-full">
          <AntDesign name="search1" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {data.length != 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-full border-b border-t mb-5 border-gray-300 px-3 flex-col items-center">
            {data.map((item, index) => {
              let tAmount = item.quantity * item.PRICE;
              return (
                <View
                  className="w-[100%] flex-row items-start gap-4 my-2"
                  key={item.ID}
                >
                  <TouchableOpacity
                    onPress={() => handleNavigateToDetails(item.ID.toString())}
                    className="w-1/3 h-36 border border-gray-300 rounded-md overflow-hidden"
                  >
                    <Image
                      src={item?.IMAGE}
                      alt="product image"
                      className="w-full h-full"
                    />
                  </TouchableOpacity>
                  <View className="flex-1">
                    <TouchableOpacity
                      onPress={() =>
                        handleNavigateToDetails(item.ID.toString())
                      }
                    >
                      <Text className="text-sm font-pregular">
                        {item?.NAME}
                      </Text>
                      <Text className="text-sm mt-1 font-pregular">100ml</Text>
                      <Text className="text-sm mt-1 font-pregular">{item?.COMPANY}</Text>
                    </TouchableOpacity>
                    <View className="flex-1 flex-row justify-between items-center mt-2">
                      <View className="flex-row items-center gap-4 p-1 border border-gray-300 rounded-md">
                        <AntDesign
                          name="minus"
                          size={18}
                          color="#00BFB3"
                          onPress={() => removeItem(item)}
                        />
                        <Text className="text-lg font-pmedium">
                          {item.quantity}
                        </Text>
                        <AntDesign
                          name="plus"
                          size={18}
                          color="#00BFB3"
                          onPress={() => addItems(item)}
                        />
                      </View>
                      <Text className="text-lg font-pmedium mr-3">
                        ${tAmount.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <View className="w-full px-3 items-center">
            <TouchableOpacity
              className="w-full p-4 bg-[#F6F6F7] rounded-md"
              onPress={handleOpenOrClose}
            >
              <View className="flex-1 flex-row items-center gap-4">
                <Entypo name="home" size={24} color="#F97607" />
                <Text className="font-pregular">Confirm Delivery Location</Text>
              </View>
              <Text className="mt-2 font-pregular text-sm">
                2-A, Maple Road, Silver Crest Building, Delhi 110033
              </Text>
            </TouchableOpacity>

            <View className="w-full p-4 bg-[#F6F6F7] my-3 flex-row items-center justify-between gap-4 rounded-md">
              <View className="flex-row items-center gap-4">
                <Ionicons name="pricetag" size={24} color="black" />
                <Text className="font-pregular">Apply Coupon</Text>
              </View>
              <TouchableOpacity className=" absolute right-3">
                <AntDesign name="right" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View className="w-full p-3 mb-24">
              <Text className="font-pmedium text-sm">
                Price Details (3items)
              </Text>
              <View className="w-full flex-row justify-between items-center mt-4">
                <Text className="font-pregular text-sm">Cart Total</Text>
                <Text className="font-pregular text-sm">
                  ${totalAmount.toFixed(2)}
                </Text>
              </View>
              <View className="w-full flex-row justify-between items-center mt-2">
                <Text className="font-pregular text-sm">GST</Text>
                <Text className="font-pregular text-sm">${gst.toFixed(2)}</Text>
              </View>
              <View className="w-full border border-gray-300 mt-4 " />
              <View className="w-full flex-row justify-between items-center mt-2">
                <Text className="font-pregular text-sm">Total</Text>
                <Text className="font-pregular text-sm">
                  ${totalAmountWithGST}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center">
          <View className="w-full relative h-[60%] bg-[#F6F6F7] justify-center items-center rounded-b-[50%]">
            <MaterialCommunityIcons
              name="cart-remove"
              size={100}
              color="#8F9098"
              className="mt-10"
            />
            <View className="w-[60%]">
              <Text className="text-center text-MountainMist font-pmedium text-xl">
                You haven't placed any order yet
              </Text>
            </View>

            <TouchableOpacity
              className="p-3 px-10 bg-[#DD5202] z-10 rounded-lg absolute -bottom-1"
              onPress={() => router.push("/category")}
            >
              <Text className="text-white font-pmedium">Order Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {data.length != 0 && (
        <View className="w-full absolute bg-white bottom-0 border-t border-gray-300 p-4 flex-row justify-between items-center">
          <View>
            <Text className="font-pmedium text-lg">
              {" "}
              ${totalAmountWithGST.toFixed(2)}
            </Text>
            <Text className="font-pregular text-[0.7rem] underline">
              VIEW DETAILS
            </Text>
          </View>
          <TouchableOpacity
            className="p-3 px-10 bg-primary rounded-lg"
            onPress={() => router.push("/checkout/prescription")}
          >
            <Text className="text-white font-pmedium">Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {bottomSheetIndex === 1 && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      )}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleBottomSheetChange}
        backgroundStyle={{ backgroundColor: "white" }}
        style={{ zIndex: 10 }}
      >
        <BottomSheetView className="w-full flex-1">
          {currentView === "delivery" && (
            <DeliveryTypeSelector
              deliveryType={deliveryType}
              onSelectDeliveryType={handleDeliveryTypeSelect}
              onConfirm={handleDeliveryConfirm}
            />
          )}
          {currentView === "patients" && (
            <PatientSelector
              onBack={handlePatientBack}
              onAddNew={handleAddNewPatient}
            />
          )}
          {currentView === "addPatient" && (
            <AddPatientForm onBack={handleAddPatientBack} />
          )}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default cart;
