import axios from 'axios';
import { useUserStore } from '@/stores/user';
import router from '@/router';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Your API server URL from the spec
  timeout: 10000, // Request timeout
});

// Request Interceptor: Add the JWT token to every outgoing request
apiClient.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors like 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      const userStore = useUserStore();
      userStore.logout(); // Use the logout action to clear state and redirect
      // Optionally show a message
      // ElMessage.error('Your session has expired. Please log in again.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
