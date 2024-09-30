import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "./style";
import AppointmentScheduler from "../../components/AppointmentScheduler";
export default function Appointment() {
  const route = useRoute();
  const { doctorId } = route.params;
  console.log("doctorId", doctorId);
  return (
    <View style={styles.container}>
      <AppointmentScheduler doctorId={doctorId} />
    </View>
  );
}
