import axios from "axios";

const API_URL = "http://localhost:3000/api/opd-monitoring";

export const getOPDMonitoring = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};
