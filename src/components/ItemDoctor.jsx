import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function ItemDoctor({ doctor, navigation }) {
  return (
    <Pressable>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: doctor.image }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.experience}>
              {doctor.exp} years of experience
            </Text>
            <Text style={styles.branch}>{doctor.branch.address}</Text>
          </View>
          <Pressable
            onPress={() => {
              console.log("Đặt ngay button pressed");
              navigation.navigate("Appointment", { doctorId: doctor.id });
            }}
          >
            <Text style={styles.btn_book}>Đặt ngay</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  group: {
    fontSize: 16,
    color: "#666",
  },
  experience: {
    fontSize: 14,
    color: "#2ecc71",
    marginTop: 5,
    fontStyle: "italic",
  },
  branch: {
    fontSize: 14,
    color: "#95a5a6",
    marginTop: 5,
    fontStyle: "italic",
  },
  btn_book: {
    backgroundColor: "#28a745",
    color: "#FFFFFF",
    paddingVertical: 4,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginVertical: 5,
  },
  btn_book_pressed: {
    backgroundColor: "#218838",
  },
});
