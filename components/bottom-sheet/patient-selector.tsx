import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface PatientSelectorProps {
  onBack: () => void;
  onAddNew: () => void;
}

export function PatientSelector({ onBack, onAddNew }: PatientSelectorProps) {
  return (
    <View className="flex-1 relative">
      <View className="w-full p-2 px-5">
        <View className="w-[100%] flex-row items-center gap-4 space-x-2">
          <TouchableOpacity onPress={onBack}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-pmedium">ADD Patient Details</Text>
        </View>

        <View className="w-full mt-6">
          <View className="flex-row gap-4 border-b border-gray-300 pb-2">
            <AntDesign name="user" size={22} color="#555555" />
            <View>
              <Text className="font-pregular text-[#555555]">Vipin Kumar</Text>
              <Text className="font-pregular text-[#555555] text-sm">Age:24</Text>
            </View>
          </View>
          <View className="flex-row gap-4 border-b mt-4 border-gray-300 pb-2">
            <AntDesign name="user" size={22} color="#555555" />
            <View>
              <Text className="font-pregular text-[#555555]">Neha R.</Text>
              <Text className="font-pregular text-[#555555] text-sm">Age:20</Text>
            </View>
          </View>
        </View>

        <View className="w-full mt-6">
          <TouchableOpacity
            className="flex-row items-center gap-4 p-3 bg-[#F6F6F6] rounded-md"
            onPress={onAddNew}
          >
            <AntDesign name="plus" size={20} color="black" />
            <Text className="font-pmedium text-sm">Add New Patient</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-full absolute bottom-2 px-4 mt-4 rounded-md border-t border-gray-300">
        <TouchableOpacity className="w-full p-3 mt-4 rounded-md bg-primary">
          <Text className="text-center font-pmedium text-white text-xl">
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

