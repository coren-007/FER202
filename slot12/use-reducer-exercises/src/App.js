import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import CounterComponent from './component/CounterComponent';
import ToggleComponent from './component/ToggleComponent';
import LoginForm from './component/LoginForm';
import SignUpForm from './component/SignUpForm';
import QuestionBank from './component/QuestionBank';
import QuestionBankAdvanced from './component/QuestionBankAdvanced';

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
        <h2>Sign Up Form</h2>
        <SignUpForm />
        
        <hr />
        <h2>Question Bank</h2>
        <QuestionBank />

        <hr />
        <h2>Question Bank Advanced</h2>
        <QuestionBankAdvanced />
        
      </div>
    </div>
  );
}

export default App;
