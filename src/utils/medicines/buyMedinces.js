import toastCustom from '../notifications/toastCustom';
import API_APP from "../config";
const byMedinines = async data => {
  console.log(data);
  const res = await fetch(`${API_APP}/v1/api/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const dataRes = await res.json();
  console.log(dataRes);
  if (!res.ok) {
    throw new Error(dataRes.message || 'Something went wrong');
  }
  toastCustom('Order created successfully');
};
export default byMedinines;
