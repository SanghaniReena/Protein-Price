import axios, { AxiosInstance } from "axios";

// Create an Axios instance with base URL taken from environment variables
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Base URL for API requests
});

export default axiosInstance; // Export the configured Axios instance
