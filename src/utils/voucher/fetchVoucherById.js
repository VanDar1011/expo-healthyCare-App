import API_APP from "../config";
const fetchVouchers = async (userId, setVouchers) => {
  try {
    console.log("userId is", userId);
    console.log("setVouchers is", setVouchers);
    const response = await fetch(`${API_APP}/v1/api/voucher?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }); // URL API của bạn
    // console.log("response", response);
    const data = await response.json();
    // console.log("data", data.data.vouchers);
    setVouchers(data.data.vouchers); // Lưu dữ liệu voucher từ API
  } catch (error) {
    console.error("Error fetching vouchers:", error);
  }
};
export default fetchVouchers;
