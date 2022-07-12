import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import { BrowserRouter } from 'react-router-dom';
import './app.css';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>    
    </StrictMode>
);