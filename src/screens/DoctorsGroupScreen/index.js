import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import styles from "./style";
import fetchDoctorGroup from "../../utils/doctorgroup/fetchDoctorGroup";
import ItemDoctorGroup from "../../components/ItemDoctorGroup";
import { useNavigation } from "@react-navigation/native";
export default function DoctorsGroupScreen() {
  const [doctorGroups, setDoctorGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const functionFetchDoctorGroup = async () => {
      try {
        await fetchDoctorGroup(setDoctorGroups);
      } catch (error) {
        console.log("Error fetching fetchDoctorGroup:", error.message || error);
      } finally {
        setLoading(false);
      }
    };
    functionFetchDoctorGroup();
  }, []);
  if (loading) {
    // Show loading indicator while loading
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lịch khám </Text>
      <ScrollView
        // horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <View style={styles.cardContainer}>
          {doctorGroups.length > 0 &&
            doctorGroups.map((group) => (
              <ItemDoctorGroup
                key={group.id}
                group={group}
                navigation={navigation}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
