import axios from "axios";

const API_URL = "http://localhost:3000/api/dropouts";

export const getDropouts = async ({
  page = 1,
  limit = 20,
  search = "",
  kecamatan = "",
  status = "",
}) => {
  const response = await axios.get(API_URL, {
    params: {
      page,
      limit,
      search,
      kecamatan,
      status,
    },
  });

  return response.data;
};

export const getDropoutById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};

export const getDropoutStats = async () => {
  const response = await axios.get(`${API_URL}/stats`);

  return response.data;
};

export const uploadDropoutExcel = async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const verifyDropout = async (
  id: number,
  payload: {
    catatan_verifikasi: string;
    verifikator: string;
  },
) => {
  const response = await axios.put(`${API_URL}/${id}/verify`, payload);

  return response.data;
};
