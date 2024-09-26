import { API_URL_PAYMENT } from "../config";
const createPaymentIntent = async (amount) => {
  try {
    const res = await fetch(`${API_URL_PAYMENT}/payments/intents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Something went wrong");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching createPaymentIntent:", error.message || error);
  }
};
export default createPaymentIntent;
