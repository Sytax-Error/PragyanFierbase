import axios from 'axios';
import { onError, onRequest } from './interceptors';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // This will be the base for all API calls
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the interceptors
api.interceptors.request.use(onRequest, onError);
// Note: A response interceptor would go here, but we don't have one yet.

console.log('axios.ts: Axios instance created and interceptors attached.');

export default api;
