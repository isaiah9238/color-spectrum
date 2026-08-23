export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
export const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'color-spectrum';
export const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY || 'your_firebase_api_key';

export async function fetchData(endpoint: string) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  return response.json();
}