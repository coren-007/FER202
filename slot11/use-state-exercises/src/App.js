import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import CounterComponent from './component/CounterComponent';
import LightSwitch from './component/LightSwitch';
import LoginForm from './component/LoginForm';
import LoginForm2 from './component/LoginForm2';
import SearchItem from './component/SearchItem';

function App() {
  return (
    <div className="App">
      <div className="container mt-4">
        <h2>Counter Component</h2>
        <CounterComponent />
        
        <hr />
        <h2>Light Switch</h2>
        <LightSwitch />
        
        <hr />
        <h2>Login Form</h2>
        <LoginForm />
        
        <hr />
        <h2>Login Form 2</h2>
        <LoginForm2 />
        
        <hr />
        <h2>Search Item</h2>
        <SearchItem />
      </div>
    </div>
  );
}

export default App;
