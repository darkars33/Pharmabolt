import { Stack, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from "react-native";

const _layout = () => {

  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen
        name="verify"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft: () => {
            return (
              <TouchableOpacity className="p-2 mt-[5rem] ml-4 border-2 border-[#e8e8eb] rounded-full" onPress={() => router.back()}>  
                <Ionicons name="chevron-back" size={34} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
};

export default _layout;
