import API_APP from "../config";
const fetchAppointment = async ({ userId, limit, setAppoinments, status }) => {
  try {
    console.log("status", status);
    if (!userId) return;
    console.log("fetch appointment", userId);
    let url = `${API_APP}/v1/api/book-appointments?userId=${userId}&status=${status}`;
    if (status === "all") {
      url = `${API_APP}/v1/api/book-appointments?userId=${userId}`;
    }
    if (limit) {
      url = `${API_APP}/v1/api/book-appointments?userId=${userId}&limit=${limit}&page=1`;
    }
    const res = await fetch(`${url}`, {
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
    // console.log(dataRes.data.appointments);
    setAppoinments(data.data.appointments);
  } catch (error) {
    console.log("Error fetching fetchAppointments:", error.message || error);
  } finally {
    // console.log("Finally");
  }
};
export default fetchAppointment;
