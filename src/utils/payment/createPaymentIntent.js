import { API_URL_PAYMENT } from "../config";
const createPaymentIntent = async (amount) => {
  const res = await fetch(`${API_URL_PAYMENT}/payments/intents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
    }),
  });
  const data = await res.json();
  console.log(data);
  return data;
};
export default createPaymentIntent;
