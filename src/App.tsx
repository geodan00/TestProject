import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./Styles/AppStyle.css";
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { RequireAuth } from 'react-auth-kit';
import Page404 from './Pages/Page404';

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route
          path='/'
          element={
            <RequireAuth loginPath={'/Login'} >
              <Home />
            </RequireAuth>
          }
        />
        <Route path='*' element={
          <RequireAuth loginPath={'/Login'} >
            <Page404 />
          </RequireAuth>
        } />
      </Routes>
    </div>
  );
}

export default App;
