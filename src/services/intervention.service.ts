import axios from "axios";

const API_URL = "http://localhost:3000/api/interventions";

export const getAllInterventions = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const getInterventionsByStudent = async (studentId: number) => {
  const response = await axios.get(`${API_URL}/student/${studentId}`);

  return response.data;
};

export const createIntervention = async (data: any) => {
  const response = await axios.post(API_URL, data);

  return response.data;
};

export const getInterventionById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};

export const updateInterventionStatus = async (id: number, payload: any) => {
  const response = await axios.put(`${API_URL}/${id}/status`, payload);

  return response.data;
};

export const getInterventionLogs = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}/logs`);

  return response.data;
};
