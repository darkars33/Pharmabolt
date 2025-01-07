import { useState } from "react";
import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const accountInfo = () => {

  const isLogged = false;

  if(!isLogged) {
    return <Redirect href="/auth/login" />;
  }else{
    return (
      <View>
        <Text>Account Info</Text>
      </View>
    );
  }
  
};

export default accountInfo;
