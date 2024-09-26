import { StyleSheet } from "react-native";
import API_APP from "../config";
const fetchNumberOfDocters = async (id) => {
  try {
    const res = await fetch(`${API_APP}/v1/api/doctors?doctorGroupId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errData = await res.json();

      throw new Error(errData.message || "Something went wrong");
    }

    const data = await res.json();
    console.log(data.data.count);
    return data.data.count;
  } catch (error) {
    console.log("Error fetching fetchDoctorGroup:", error.message || error);
  }
};

export default fetchNumberOfDocters;
