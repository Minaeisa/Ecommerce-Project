import React from 'react';
import './index.css'; // مهم علشان Tailwind يشتغل

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "@fortawesome/fontawesome-free/css/all.min.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>

);

