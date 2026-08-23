import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('App Version:', import.meta.env.VITE_APP_VERSION);
console.log('Port:', import.meta.env.VITE_PORT);
console.log('API URL:', import.meta.env.VITE_API_URL);
console.log('App Title:', import.meta.env.VITE_APP_TITLE);
console.log('Firebase API Key:', import.meta.env.VITE_FIREBASE_API_KEY);
console.log('APP_VERSION:', import.meta.env.VITE_APP_VERSION || '1.0.0');
console.log('App Mode:', import.meta.env.MODE);
console.log('Is Development:', import.meta.env.DEV);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);