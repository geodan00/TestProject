import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Load from './Components/Load';
import { AuthProvider } from 'react-auth-kit';
import Data from "./Datas/var.json";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider authType={"cookie"} authName={Data.LocalVariable.authName}
    cookieDomain={window.location.hostname} cookieSecure={Data.LocalVariable.cookieSecure} >
    <BrowserRouter>
      <Suspense fallback={<Load />}>
          <App />
      </Suspense>
    </BrowserRouter>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
