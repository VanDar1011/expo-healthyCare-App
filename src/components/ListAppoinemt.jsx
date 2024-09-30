import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import AppointmentItem from "./ItemAppointment";
import fetchAppointment from "../utils/appointment/fetchAppointment";
import { getProfile } from "../utils/user/profileUser";
export default function ListAppoinemt({ profile }) {
  // console.log("profile user", profile);
  // const [profile, setProfile] = useState(null);
  // const [appointments, setAppoinments] = useState([]);
  // const fetchDataAppointment = useCallback(async () => {
  //   try {
  //     const {userId, name} = await getProfile();
  //     setProfile({userId, name});
  //     console.log('profile at home', {userId, name});
  //     if (!userId) return;
  //     fetchAppointment({
  //       userId: profile?.userId,
  //       limit: 2,
  //       status: 'done',
  //       setAppoinments,
  //     });
  //   } catch (error) {
  //     console.error('Error fetching profile:', error);
  //   }
  // }, []);
  // useEffect(() => {
  //   fetchDataAppointment();
  // }, [fetchDataAppointment]);
  //
  // const [profile, setProfile] = useState(null);
  const [appointments, setAppoinments] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (profile) {
          await fetchAppointment({
            userId: profile.userId,
            limit: 2,
            status: "done",
            setAppoinments,
          });
        }
      } catch (error) {
        console.error("Error fetching profile or cart:", error);
      }
    };
    fetchProfile();
  }, [profile]);
  return (
    <View style={styles.container}>
      {!appointments.length ? (
        <View style={styles.container_text}>
          <Text style={styles.text_center}>
            "Bạn chưa có lịch hẹn nào, đặt ngay"
          </Text>
        </View>
      ) : (
        appointments.map((appointment) => (
          <AppointmentItem key={appointment.id} appointment={appointment} />
        ))
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 4,
    flex: 1,
  },
  text_center: {
    textAlign: "center",
  },
  container_text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8", // Light background color
    borderRadius: 10,
    elevation: 3, // Shadow effect on Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  text_center: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6347",
    paddingVertical: 15,
    letterSpacing: 1.2,
    lineHeight: 24,
  },
});
