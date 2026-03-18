import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { useUIStore } from './store/uiStore.js';

// Apply theme on initial load
const savedUI = JSON.parse(localStorage.getItem('modforge-ui') || '{}');
const theme = savedUI?.state?.theme || 'dark';
document.documentElement.setAttribute('data-theme', theme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
