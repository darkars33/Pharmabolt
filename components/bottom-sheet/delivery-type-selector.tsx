import { View, Text, TouchableOpacity, Image } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";

interface DeliveryTypeSelectorProps {
  deliveryType: string;
  onSelectDeliveryType: (type: string) => void;
  onConfirm: () => void;
}

export function DeliveryTypeSelector({ 
  deliveryType, 
  onSelectDeliveryType,
  onConfirm 
}: DeliveryTypeSelectorProps) {
  return (
    <View>
      <View className="w-full flex items-center justify-center mb-2">
        <Fontisto name="map-marker-alt" size={40} color="#DD5202" />
        <Text className="text-center font-pregular mt-2">
          Select Your Delivery Location
        </Text>
      </View>
      <View className="flex flex-row justify-around content-center gap-4 px-1 mt-4">
        <TouchableOpacity
          className={`h-28 w-48 p-2 flex flex-row relative rounded-2xl overflow-hidden ${
            deliveryType === "train" ? "bg-primary" : "bg-[#0684FF]"
          }`}
          onPress={() => onSelectDeliveryType("train")}
        >
          <Text className="text-xl text-white font-pbold ml-1">
            DELIVER ON TRAIN
          </Text>
          <Image
            source={require("@/assets/images/Train.png")}
            style={{ width: 100, height: 80 }}
            className="absolute right-0 bottom-0"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-28 w-48 p-2 flex flex-row relative rounded-2xl overflow-hidden ${
            deliveryType === "home" ? "bg-primary" : "bg-[#0684FF]"
          }`}
          onPress={() => onSelectDeliveryType("home")}
        >
          <Text className="text-xl text-white font-pbold ml-1">
            DELIVER AT HOME
          </Text>
          <Image
            source={require("@/assets/images/Home.png")}
            style={{ width: 100, height: 60 }}
            className="absolute right-1 bottom-0"
          />
        </TouchableOpacity>
      </View>
      <View className="w-full px-4 mt-4 rounded-md border-t border-gray-300">
        <TouchableOpacity
          className={`w-full p-3 mt-4 rounded-md ${
            deliveryType === "" ? "bg-[#D4D6DD]" : "bg-primary"
          }`}
          onPress={onConfirm}
        >
          <Text className="text-center font-pmedium text-white text-xl">
            Select
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

