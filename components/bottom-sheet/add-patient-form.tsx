import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface AddPatientFormProps {
  onBack: () => void;
}

export function AddPatientForm({ onBack }: AddPatientFormProps) {
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
          <Text className="font-pregular">Name</Text>
          <TextInput
            className="w-full p-2 bg-[#EFEFF0] mt-3 rounded-md text-black"
            placeholder="Ex. Thaman"
          />
        </View>
        <View className="w-full mt-6">
          <Text className="font-pregular">Age</Text>
          <TextInput
            className="w-full p-2 py-3 bg-[#EFEFF0] mt-3 rounded-md text-black"
            placeholder="Ex. 25"
          />
        </View>
        <View className="w-full mt-6">
          <Text className="font-pregular">Phone Number</Text>
          <TextInput
            className="w-full p-2 py-3 bg-[#EFEFF0] mt-3 rounded-md text-black"
            placeholder="Ex. +91 9999999999"
          />
        </View>
        <View className="w-full mt-6">
          <Text className="font-pregular">Gender</Text>
          <TextInput
            className="w-full p-2 py-3 bg-[#EFEFF0] mt-3 rounded-md text-black"
            placeholder="Ex. Male"
          />
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

