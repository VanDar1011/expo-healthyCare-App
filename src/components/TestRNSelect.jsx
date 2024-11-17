import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const TestRNSelect = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const departments = [
    { label: "Khoa A", value: "a" },
    { label: "Khoa B", value: "b" },
    { label: "Khoa C", value: "c" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chọn khoa:</Text>
      <RNPickerSelect
        onValueChange={handleValueChange}
        items={departments}
        placeholder={{
          label: "Chọn khoa...",
          value: null,
        }}
        style={{
          inputIOS: {
            padding: 10,
            backgroundColor: "#FFF",
            color: "black",
            borderWidth: 1,
            borderColor: "#CCC",
            borderRadius: 5,
          },
          inputAndroid: {
            padding: 10,
            backgroundColor: "#FFF",
            color: "black",
            borderWidth: 1,
            borderColor: "#CCC",
            borderRadius: 5,
          },
        }}
      />
      {selectedValue && (
        <Text style={styles.selectedText}>Khoa đã chọn: {selectedValue}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default TestRNSelect;
