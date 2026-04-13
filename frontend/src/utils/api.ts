import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 seconds to allow for Render cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for automatic retries
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, message } = error;
    
    // Retry if it's a timeout or network error (common for sleeping servers)
    if (!config || !config.retry) {
      config.retry = 0;
    }

    const MAX_RETRIES = 2;
    if (config.retry < MAX_RETRIES && (message.includes('timeout') || !error.response)) {
      config.retry += 1;
      const delay = config.retry * 2000; // Exponential backoff
      
      console.log(`Retrying request (${config.retry}/${MAX_RETRIES}) after ${delay}ms...`);
      
      await new Promise((resolve) => setTimeout(resolve, delay));
      return api(config);
    }

    return Promise.reject(error);
  }
);

export default api;
