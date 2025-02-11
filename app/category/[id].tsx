import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Pressable,
  Platform,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "@/redux/CartSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import LottieView from "lottie-react-native";

type DrugItem = {
  ID: number;
  RATING: number;
  Description: string;
  PRICE: number;
  WEIGHT: string;
  IMAGE: string;
  quantity?: number;
  flashKey: {
    flashKey: string;
  };
};

type RootState = {
  cart: {
    cart: DrugItem[];
  };
};

const CategoryId = () => {
  const [medicines, setMedicines] = useState<DrugItem[]>([]);
  const animation = useRef(null);
  const [loading, setLoading] = useState(true);
  const { Id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const flashKey = useSelector((state: any) => state.user.flashKey);
  const { id } = useLocalSearchParams();
  const api = process.env.EXPO_PUBLIC_APPLICATION_API || " ";
  let CATEGORY_NAME = id;

  const handleGetData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/v1/get-category-medicines?`, {
        params: {
          CATEGORY_NAME: id,
        },
        headers: {
          Authorization: `Bearer ${flashKey}`,
        },
      });
      const data = res?.data?.response;
      setMedicines(data?.MEDICINES);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (axios.isCancel(error)) {
        console.log("Request Cancelled");
      } else if (axios.isAxiosError(error)) {
        console.log("Axios Error");
      } else {
        console.log("Error");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetData();
  }, []);

  const totalQuantity = useMemo(
    () => cart.reduce((total, item) => total + (item.quantity || 0), 0),
    [cart]
  );



  const totalPrice = useMemo(
    () =>
      cart
        .reduce((total, item) => total + item.PRICE * (item.quantity || 0), 0)
        .toFixed(2),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + (item.quantity || 0), 0),
    [cart]
  );

  // Callback handlers
  const handleAddToCart = useCallback(
    (item: DrugItem) => {
      dispatch(addToCart(item));
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (item: DrugItem) => {
      dispatch(decrementQuantity(item));
    },
    [dispatch]
  );

  const handleNavigateToDetails = useCallback(
    (id: string) => {
      router.push(`/productDetails/${id}`);
    },
    [router]
  );

  const handleNavigateToCart = useCallback(() => {
    router.push("/cart");
  }, [router]);

  const isIOS = Platform.OS === "ios";
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="relative flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="h-20 flex-row justify-between items-center px-5 border-b border-gray-200">
        <Pressable onPress={() => router.back()} className="">
          <Ionicons name="chevron-back" size={30} color="black" />
        </Pressable>
        <View className="flex-row items-center gap-2">
          <Pressable
            className={`${isIOS ? "p-3 bg-[#f2f2f7] rounded-full" : "p-2"}`}
            onPress={() => alert("Search")}
          >
            <AntDesign
              name="search1"
              size={18}
              color="black"
            />
          </Pressable>
          <Pressable
            className={`${isIOS ? "p-3 bg-[#f2f2f7] rounded-full" : "p-2"}`}
            onPress={() => alert("Notifications")}
          >
            <Ionicons
              name="notifications-sharp"
              size={18}
              color="black"
            />
          </Pressable>
          <Pressable
            className={`mr-0 ${
              isIOS ? "p-3 bg-[#f2f2f7] rounded-full" : "p-2"
            }`}
            onPress={() =>router.push("/cart")}
          >
            <Entypo
              name="shopping-cart"
              size={18}
              color="black"
            />
            {totalQuantity > 0 && (
              <View className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary rounded-full px-1">
                <Text className="text-white font-pmedium text-xs">
                  {totalQuantity}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white h-full relative"
      >
        <View className="w-full mt-4 px-3 flex-col gap-3">
          {loading ? (
            <View className="flex h-[15rem] justify-center items-center mt-5">
              <LottieView
                autoPlay
                loop
                ref={animation}
                style={{
                  width: 200,
                  height: 200,
                  backgroundColor: "transparent",
                }}
                source={require("@/assets/MainScene.json")}
              />
            </View>
          ) : (
            <>
              <Text className="font-pmedium text-xl">{CATEGORY_NAME}</Text>
              <View className="w-full flex-row flex-wrap pb-24">
                {medicines?.map((item:any) => (
                  <View
                    className="w-1/2 p-2 flex-col rounded-lg"
                    key={item.ID}
                  >
                    <TouchableOpacity
                      className="relative shadow-sm rounded-2xl"
                      onPress={() =>
                        handleNavigateToDetails(item.ID.toString())
                      }
                      activeOpacity={0.7}
                    >
                      <Image
                        src={item?.IMAGE}
                        alt="Sample Drug"
                        style={{ width: "100%", height: 200 }}
                        className="shadow-md rounded-2xl "
                      />
                      {/* <View className="absolute bottom-3 left-1 p-1 bg-[#007C57] rounded-md flex-row items-center gap-1">
                    <Text className="font-pmedium text-white text-[0.7rem]">
                    
                    </Text>
                    <AntDesign name="star" size={9} color="white" />
                  </View> */}
                    </TouchableOpacity>
                    <View className=" mt-2">
                      <Text className="font-pregular text-MountainMist">
                        {item?.NAME}
                      </Text>
                      <Text className="font-pbold">₹ {item?.PRICE}</Text>
                      <Text className="font-pregular text-sm text-MountainMist">
                        {item?.COMPANY}
                      </Text>

                      {cart.find(
                        (cartItem) => cartItem.ID === item.ID
                      ) ? (
                        <View className="flex-row justify-between items-center px-3 py-2 bg-AddToCart rounded-md mt-2">
                          <TouchableOpacity
                            onPress={() => handleRemoveFromCart(item)}
                            activeOpacity={0.7}
                          >
                            <AntDesign name="minus" size={18} color="white" />
                          </TouchableOpacity>
                          <Text className="font-pmedium text-lg text-center text-white">
                            {
                              cart.find(
                                (cartItem) => cartItem.ID === item.ID
                              )?.quantity
                            }
                          </Text>
                          <TouchableOpacity
                            onPress={() => handleAddToCart(item)}
                            activeOpacity={0.7}
                          >
                            <AntDesign name="plus" size={18} color="white" />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity
                          className="py-2 bg-AddToCart rounded-md mt-2"
                          onPress={() => handleAddToCart(item)}
                          activeOpacity={0.7}
                        >
                          <Text className="font-pmedium text-lg text-center text-white">
                            ADD
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {cart.length > 0 && (
        <View
          className="w-full absolute bottom-0 bg-white shadow-lg flex-row justify-between items-center"
          style={{ paddingBottom: insets.bottom }}
        >
          <View className="flex-row items-center justify-between w-full px-7">
            <View className="p-3 rounded-lg">
              <Text className="text-gray-600 font-pmedium text-xl">
                ₹{totalPrice}
              </Text>
              <Text className="font-pregular text-sm">{totalItems} Items</Text>
            </View>
            <TouchableOpacity
              className="p-3 rounded-lg bg-primary px-10"
              onPress={handleNavigateToCart}
              activeOpacity={0.7}
            >
              <Text className="font-pmedium text-lg text-white">
                Go to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CategoryId;
