import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import CounterComponent from './component/CounterComponent';
import ToggleComponent from './component/ToggleComponent';
import LoginForm from './component/LoginForm';
import LoginForm2 from './component/LoginForm2';
import QuestionBank from './component/QuestionBank';
import SearchAccount from './component/SearchAccount';
import RegistrationForm from './component/RegistrationForm';

function App() {
  return (
    <div className="App">
      <div className="container mt-4">
        <h2>Counter Component</h2>
        <CounterComponent />
        
        <hr />
        <h2>Toggle Component</h2>
        <ToggleComponent />
        
        <hr />
        <h2>Login Form</h2>
        <LoginForm />
        
        <hr />
        <h2>Login Form 2</h2>
        <LoginForm2 />
        
        <hr />
        <h2>Question Bank</h2>
        <QuestionBank />

        <hr />
        <h2>Search Account</h2>
        <SearchAccount />

        <hr />
        <h2>Registration Form</h2>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;
