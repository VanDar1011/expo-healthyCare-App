import toastCustom from "../notifications/toastCustom";
import { Platform, Alert } from "react-native";
import API_APP from "../config";
const byMedinines = async (data) => {
  try {
    console.log(data);
    const res = await fetch(`${API_APP}/v1/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log(dataRes);
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Something went wrong");
    }

    if (Platform.OS === "android") {
      toastCustom("Order created successfully");
    } else {
      Alert.alert("Notification", "Order created successfully");
    }
  } catch (error) {
    console.log("Error fetching byMedinines:", error.message || error);
  }
};
export default byMedinines;
