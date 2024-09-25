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
      url = `${API_APP}/v1/api/book-appointments?userId=${userId}&limit=${limit}&page=1&status=done`;
    }

    const res = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRes = await res.json();
    console.log(dataRes.data.appointments);
    if (!res.ok) {
      throw new Error(dataRes.message || "Something went wrong");
    }
    setAppoinments(dataRes.data.appointments);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Finally");
  }
};
export default fetchAppointment;
