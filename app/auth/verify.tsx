import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

const Verify = () => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView className="flex-1 items-center">
      <View className="items-center mt-[5rem] gap-2 w-[80%]">
        <Text className="text-[2rem] font-pbold">Verify Code</Text>
        <Text className="text-MountainMist font-pthin text-sm text-center">
          Please enter the 6-digit code sent to
        </Text>
      </View>

      <View className="w-[90%]">
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[
                styles.cell,
                isFocused && styles.focusCell,
              ]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>

      <View className="w-[100%] px-7">
        <TouchableOpacity
          className="w-full h-12 justify-center items-center mt-12 bg-primary rounded-lg"
          onPress={() => {}}
        >
          <Text className="text-center text-white font-pmedium text-xl">
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 20 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 45,
    height: 45,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#EFEFF0", 
    backgroundColor: "#EFEFF0",
    textAlign: "center",
    borderRadius: 5,
    fontFamily: "Roboto-Regular",
  },
  focusCell: {
    borderColor: "#0ABF80", 
  },
});

export default Verify;
