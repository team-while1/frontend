import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // ✅ 반드시 필요!
import './index.css';


if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser');
  await worker.start();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ 여기로 App 감싸기 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);