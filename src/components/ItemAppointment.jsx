import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../utils/config";
const AppointmentItem = ({ appointment }) => {
  const { group, doctor, startTime, endTime, status } = appointment;
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedStartDate = new Date(startTime).toLocaleDateString(
    undefined,
    options
  );
  // Định dạng thời gian (có thể sử dụng thư viện moment.js để dễ hơn)
  const formattedStartTime = new Date(startTime).toLocaleTimeString();
  const formattedEndTime = new Date(endTime).toLocaleTimeString();

  return (
    <View style={styles.container}>
      <Image source={{ uri: doctor.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctor_group}>{doctor.group}</Text>
        <Text style={styles.time}>
          {formattedStartTime} - {formattedEndTime}
        </Text>
        <Text style={styles.dateText}>{formattedStartDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16 * scaleWidth,
    backgroundColor: "#fff",
    borderRadius: 12 * scaleWidth,
    marginBottom: 16 * scaleHeight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 80 * scaleWidth,
    height: 80 * scaleHeight,
    borderRadius: 40 * scaleWidth,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  infoContainer: {
    marginLeft: 16 * scaleWidth,
    justifyContent: "center",
    flex: 1,
  },
  doctorName: {
    fontSize: 18 * scaleWidth,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8 * scaleHeight,
  },
  doctor_group: {
    color: "green",
    fontSize: 16 * scaleWidth,
    fontWeight: "600",
    marginBottom: 4 * scaleHeight,
  },
  time: {
    fontSize: 14 * scaleWidth,
    color: "#888",
    marginBottom: 6 * scaleHeight,
  },
  dateText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
});

export default AppointmentItem;
