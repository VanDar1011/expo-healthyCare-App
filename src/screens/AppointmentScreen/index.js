import React from "react";
import { View, Text } from "react-native";

import styles from "./style";
import AppointmentScheduler from "../../components/AppointmentScheduler";
export default function Appointment({ route }) {
  const { doctorId } = route.params;
  console.log("doctorId", doctorId);
  return (
    <View style={styles.container}>
      <AppointmentScheduler doctorId={doctorId} />
    </View>
  );
}
