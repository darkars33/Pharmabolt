import * as SecureStore from "expo-secure-store";

const USER_ID_KEY = "user_id";
const FLASH_KEY = "flash_key";

export const saveUserData = async (userID: string, flashKey: string) => {
  await SecureStore.setItemAsync(USER_ID_KEY, userID);
  await SecureStore.setItemAsync(FLASH_KEY, flashKey);
};

export const getUserData = async () => {
  const userID = await SecureStore.getItemAsync(USER_ID_KEY);
  const flashKey = await SecureStore.getItemAsync(FLASH_KEY);
  return { userID, flashKey };
};

export const removeUserData = async () => {
  await SecureStore.deleteItemAsync(USER_ID_KEY);
  await SecureStore.deleteItemAsync(FLASH_KEY);
};
