import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import CounterComponent from './component/CounterComponent';
import LightSwitch from './component/LightSwitch';
import LoginForm from './component/LoginForm';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <AuthProvider>
          <div className="container mt-4">
            <h2>Counter Component</h2>
            <CounterComponent />
            
            <hr />
            <h2>Light Switch</h2>
            <LightSwitch />
            
            <hr />
            <h2>Login Form</h2>
            <LoginForm />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
