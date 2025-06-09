//index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PageIndex from './pages';
import Test from './Test.tsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PageIndex />
  </React.StrictMode>
);
reportWebVitals();
