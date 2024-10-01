import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import AppointmentItem from "./ItemAppointment";
import fetchAppointment from "../utils/appointment/fetchAppointment";
import { getProfile } from "../utils/user/profileUser";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();
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
          <Text style={styles.text_center}>"Bạn chưa có lịch hẹn nào!"</Text>
          <TouchableOpacity
            style={styles.btnBookNow}
            onPress={() => {
              navigation.navigate("DoctorGroup");
            }}
          >
            <Text style={styles.textBook}>Đặt ngay</Text>
          </TouchableOpacity>
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
  textBook: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    letterSpacing: 1.2,
  },
  btnBookNow: {
    backgroundColor: "#2ecc71",
    borderRadius: 8,
  },
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
    color: "#2ecc71",
    paddingVertical: 15,
    letterSpacing: 1.2,
    lineHeight: 24,
  },
});
