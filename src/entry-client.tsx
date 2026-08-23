import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

console.log('App Mode:', import.meta.env.MODE);
console.log('Is Dev:', import.meta.env.DEV);
console.log('App Title:', import.meta.env.VITE_APP_TITLE);

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);