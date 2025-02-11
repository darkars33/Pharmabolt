import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { loadUserData } from "@/redux/UserSlice";

const AccountInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { flashKey } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(loadUserData()).unwrap();
      } catch (error) {
        console.log("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return flashKey ? <Redirect href="/home" /> : <Redirect href="/auth/login" />;
};

export default AccountInfo;
