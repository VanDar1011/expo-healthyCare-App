import API_APP from "../config";
const fetchDoctorGroup = async (setDoctorGroup, flag) => {
  try {
    const res = await fetch(`${API_APP}/v1/api/doctor-group`, {
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
    if (flag) {
      console.log(data.data.doctorGroups);
      setDoctorGroup(data.data.doctorGroups);
    } else {
      setDoctorGroup(data.data.doctorGroups);
    }
  } catch (error) {
    console.log("Error fetching fetchDoctorGroup:", error.message || error);
  }
};
export default fetchDoctorGroup;
