import API_APP from "../config";
const fetchMedicines = async setMedicines => {
  const res = await fetch(`${API_APP}/v1/api/medicines`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  setMedicines(data.data.medicines);
};
export default fetchMedicines;
