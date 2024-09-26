import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function ItemDoctor({ doctor, navigation }) {
  // console.log("Item doctors", doctor);
  return (
    <Pressable
    //   onPress={() =>
    //     navigation.navigate("DoctorDetails", { doctorId: doctor.id })
    //   }
    // Reset pressed state
    >
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
    backgroundColor: "#fff", // White background for the item
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
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
    borderRadius: 50, // Circular image
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Darker text color for readability
    marginBottom: 5,
  },
  group: {
    fontSize: 16,
    color: "#666", // Lighter text for the group name
  },
  experience: {
    fontSize: 14, // Slightly smaller font for experience
    color: "#2ecc71", // Green color to make it stand out
    marginTop: 5,
    fontStyle: "italic", // Optional: Italicize the text for emphasis
  },
  branch: {
    fontSize: 14, // Same size as experience, or slightly smaller
    color: "#95a5a6", // Lighter grey color for subtlety
    marginTop: 5, // Space between the experience and branch
    fontStyle: "italic", // Italicized for subtle emphasis
  },
  btn_book: {
    backgroundColor: "#28a745", // Green background
    color: "#FFFFFF", // White text color
    paddingVertical: 4, // Vertical padding for button
    // paddingHorizontal: 6, // Horizontal padding for button
    borderRadius: 5, // Rounded corners
    textAlign: "center", // Center text
    fontSize: 16, // Font size
    fontWeight: "bold", // Bold text
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 2, // Shadow radius
    marginVertical: 5, // Space around button
  },
  btn_book_pressed: {
    backgroundColor: "#218838", // Darker green when pressed
  },
});
