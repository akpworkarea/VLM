import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock interceptor for demo
apiClient.interceptors.request.use((config) => {
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

export default apiClient;

