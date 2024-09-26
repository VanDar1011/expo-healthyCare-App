import { useEffect, useState } from "react";
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import fetchNumberOfDocters from "../utils/doctorgroup/fetchNumberOfDocters";
export default function ItemDoctorGroup({ navigation, group }) {
  const [numberDocters, setNumberDocters] = useState(0);
  const handleClickDoctorDetails = () => {
    navigation.navigate("DoctorGroupDetail", { group: group });
  };
  useEffect(() => {
    const getNumberOfDocters = async () => {
      setNumberDocters(await fetchNumberOfDocters(group.id));
    };
    getNumberOfDocters();
  }, []);
  return (
    <View key={group.id} style={styles.card}>
      <Pressable onPress={handleClickDoctorDetails}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: group.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.name}>{group.name}</Text>
        <Text>({numberDocters}) bác sĩ</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: "45%",
    height: "35%",
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: "center",
    padding: 10,
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
    marginBottom: 10,
  },
  name: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
