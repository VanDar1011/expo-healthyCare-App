import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./style.js";
import fetchDoctorGroupDetail from "../../utils/doctorgroup/fetchDoctorGroupDetail";
import ItemDoctor from "../../components/ItemDoctor.jsx";
import { useNavigation, useRoute } from "@react-navigation/native";
export default function DoctorsGroupDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { group } = route.params;
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const functionFetchDoctorGroupDetail = async () => {
      try {
        await fetchDoctorGroupDetail(group.id, setDoctors);
      } catch (error) {
        console.log(
          "Error fetching fetchDoctorGroupDetail:",
          error.message || error
        );
      }
    };
    functionFetchDoctorGroupDetail();
  }, []);

  const renderItem = ({ item }) => (
    <ItemDoctor doctor={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.name}</Text>
      <FlatList
        data={doctors}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
