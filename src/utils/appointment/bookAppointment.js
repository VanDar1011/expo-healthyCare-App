import API_APP from "../config";
const bookAppointment = async ({
  doctorId,
  userId,
  email,
  startTime,
  endTime,
  branch_id,
  phone,
  specialist_id,
  voucher_code = null,
}) => {
  try {
    const res = await fetch(`${API_APP}/v1/api/book-appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctorId,
        userId,
        email,
        startTime,
        endTime,
        branch_id,
        phone,
        specialist_id,
        voucher_code,
      }),
    });
    console.log("res : ", res);
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Something went wrong");
    }
    const data = await res.json();
    console.log("Đặt hàng thành công", data);
    return data;
  } catch (error) {
    console.log(error);
    console.log("Error bookAppointment:", error.message || error);
    throw error;
  }
};
export default bookAppointment;
