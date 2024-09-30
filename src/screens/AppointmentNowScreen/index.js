import React, { useEffect } from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";
import { GOOGLE_KEY } from "../../utils/config";
import styles from "./style";

export default function AppointmentNowScreen() {
  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // alert('Permission to access location was denied');
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      const { latitude, longitude } = location.coords;
      //   https://nominatim.openstreetmap.org/reverse?lat=20.972063648650284&lon=105.75672765551666&format=json
      console.log(GOOGLE_KEY);
      const responseAddress = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}`,
        // `https://nominatim.openstreetmap.org/reverse?lat=20.972063648650284&lon=105.75672765551666&format=json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!responseAddress.ok) {
        // alert('Permission to access location was denied');
        console.log("Permission to access location was denied");
        return;
      }
      //   const dataAddress = responseAddress.json();
      //   console.log("address: ", dataAddress);
      const data = await responseAddress.json();
      const addressComponents = data.results[0].address_components;
      const district = addressComponents.find((component) =>
        component.types.includes("administrative_area_level_2")
      );
      console.log("Tên quận:", district.long_name);
    };
    getPermission();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Appointment Now</Text>
    </View>
  );
}
