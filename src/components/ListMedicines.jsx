import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ItemMedicines from "./ItemMedicines";
import { scaleHeight, scaleWidth } from "../utils/config";
export default function ListMedicines({ navigation, medicines }) {
  //   console.log(medicines);
  return (
    <ScrollView style={styles.view_holder}>
      <Text style={styles.title_medicine}>Danh sách thuốc</Text>
      <View style={styles.container}>
        {medicines.map((item, index) => {
          return (
            <ItemMedicines key={index} item={item} navigation={navigation} />
          );
        })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  view_holder: {
    paddingRight: 3 * scaleWidth,
  },
  title_medicine: {
    fontSize: 20 * scaleWidth,
    fontWeight: "bold",
    marginLeft: 15 * scaleWidth,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10 * scaleWidth,
  },
});
