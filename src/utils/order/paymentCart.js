import API_APP from "../config";
const paymentCart = async (id) => {
  // http://localhost:3000/v1/api/order
  // {"idOrder":28,
  //  "payload":{"quantity":8000,"status":"pending"}
  // }
  try {
    console.log("thanh toan xong", id);
    const res = await fetch(`${API_APP}/v1/api/order`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idOrder: id,
        payload: {
          status: "done",
        },
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export default paymentCart;
