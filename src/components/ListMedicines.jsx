import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ItemMedicines from "./ItemMedicines";
import { scaleHeight, scaleWidth } from "../utils/config";
export default function ListMedicines({
  navigation,
  medicines,
  loading,
  setCount,
}) {
  // console.log("loading", loading);
  //   console.log(medicines);
  return (
    <View style={styles.view_holder}>
      <View>
        <Text style={styles.title_medicine}>Danh sách thuốc</Text>
      </View>

      {loading ? ( // Show loading indicator while fetching
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={medicines}
          renderItem={({ item, index }) => (
            <ItemMedicines key={index} item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
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
    marginBottom: 10,
  },
  // container: {
  //   flex: 1,
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "space-between",
  //   gap: 10 * scaleWidth,
  // },
  container: {
    // paddingBottom: 20 * scaleHeight,
    // width: "100%",
    paddingBottom: 5 * scaleHeight,
  },
  row: {
    justifyContent: "space-between", // Space between items in each row
    marginBottom: 10, // Space between rows
  },
  loadingContainer: {
    flex: 1,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Optional: Background color
  },
});
