import API_APP from "../config";
const fetchDoctorGroupDetail = async (id, setDoctor) => {
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
    setDoctor(data.data.doctors);
  } catch (error) {}
};

export default fetchDoctorGroupDetail;
