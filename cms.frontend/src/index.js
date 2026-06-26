// Đảm bảo file này có dòng import CSS ở trên cùng
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // Dòng này cực kỳ quan trọng, đảm bảo file CSS load vào mọi trang

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);