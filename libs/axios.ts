import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
