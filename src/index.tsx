import React from 'react';
import ReactDOM from 'react-dom/client';
// library
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
// style
import './index.css';
// components
import App from './App';
import Login from './Components/Auth/Login';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);



