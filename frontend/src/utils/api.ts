import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  analyze: async (text: string) => {
    const response = await axios.post(`${API_URL}/api/analyze`, { text });
    return response.data;
  },

  getRecommendations: async () => {
    const response = await axios.post(`${API_URL}/api/recommend`);
    return response.data;
  },

  getDashboardData: async () => {
    const response = await axios.get(`${API_URL}/api/dashboard`);
    return response.data;
  }
};