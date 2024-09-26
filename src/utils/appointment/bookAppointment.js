import API_APP from "../config";
const bookAppointment = async ({ doctorId, userId, startTime, endTime }) => {
  //   console.log(doctorId, userId, startTime, endTime);
  try {
    const res = await fetch(`${API_APP}/v1/api/book-appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ doctorId, userId, startTime, endTime }),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Something went wrong");
    }
    const data = await res.json();
    console.log("Đặt hàng thành công", data);
  } catch (error) {
    console.log("Error bookAppointment:", error.message || error);
  }
};
export default bookAppointment;
