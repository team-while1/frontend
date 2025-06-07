import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// MSW를 비활성화하는 방법 (worker.start() 호출을 주석 처리)
// async function prepare() {
//   if (process.env.NODE_ENV === 'development') {
//     const { worker } = await import('./mocks/browser');
//     await worker.start(); // 👈 이 줄을 주석 처리합니다.
//   }

//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </React.StrictMode>
//   );
// }

// prepare(); // 앱 시작을 함수 안에서 수행

// MSW를 사용하지 않는 경우 (아래 코드를 사용)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);