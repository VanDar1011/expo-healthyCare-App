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
  const [day, month, year] = formattedStartDate.split("/").map(Number);
  const selectedDate = new Date(year, month - 1, day);

  const currentDate = new Date();
  const isExpired = selectedDate < currentDate; //
  const formattedStartTime = new Date(startTime).toLocaleTimeString();
  const formattedEndTime = new Date(endTime).toLocaleTimeString();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: doctor?.image
            ? doctor.image
            : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctor_group}>{doctor.group}</Text>
        <Text style={styles.time}>
          {formattedStartTime} - {formattedEndTime}
        </Text>
        <Text style={styles.dateText}>{formattedStartDate}</Text>
        <View style={styles.statusContainer}>
          {isExpired ? (
            <Text style={styles.expiredText}>Hết hạn</Text>
          ) : (
            <Text style={styles.upcomingText}>Sắp tới </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10 * scaleWidth,
    backgroundColor: "#fff",
    borderRadius: 12 * scaleWidth,
    marginBottom: 10 * scaleHeight,
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
    fontSize: 16 * scaleWidth,
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
  expiredText: {
    color: "red",
    fontWeight: "bold",
  },
  upcomingText: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default AppointmentItem;
