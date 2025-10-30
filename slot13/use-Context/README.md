useContext
by traltb@fe.edu.vn
useContext là một Hook trong React cho phép các functional component truy cập trực tiếp vào giá trị của một Context. Context là một cách để chia sẻ dữ liệu giữa các component mà không cần phải truyền props qua nhiều tầng component con, gọi là Prop drilling.
Khi nào nên sử dụng Context?
Context thường được sử dụng để chia sẻ dữ liệu mà nhiều component trong ứng dụng cần truy cập, chẳng hạn như:
•	Theme (giao diện) của ứng dụng
•	Ngôn ngữ hiện tại
•	Thông tin người dùng đã đăng nhập
•	Giỏ hàng
Cách sử dụng useContext:
1.	Tạo Context 
Sử dụng React.createContext() để tạo một đối tượng Context. Có thể truyền giá trị mặc định
const ThemeContext = React.createContext('light'); // Giá trị mặc định
2.	Cung cấp giá trị cho Context:
o	Sử dụng component Provider để cung cấp giá trị cho Context.
o	Provider nhận một prop value chứa giá trị cần chia sẻ.
3.	Truy cập giá trị Context:
Sử dụng hook useContext để truy cập giá trị của Context, là Hook được sử dụng trong component cấp dưới để truy cập giá trị (value) được cung cấp bởi Context.Provider gần nhất.
Exercise 1: Sử dụng ThemeContext cho bài CouterComponent và LightSwitch ở bài tập trước.
Bước 1: Tạo thư mục components chứa 2 file CounterComponent.jsx và LightSwitch.jsx chứa 2 bài tập trên.
Bước 2: Tạo thư mục contexts, khai báo các contexts dùng chung giữa các components.
New File, đặt tên ThemContext, các bước tạo context
//1. Khởi tạo theme context
import { createContext } from "react";

//1. Khởi tạo context với giá trị mặc định
export const ThemeContext = createContext({
    theme: "light", //giá trị mặc định là light theme
    toggleTheme: () => {} //hàm chuyển đổi theme mặc định là hàm rỗng
});

//2. Tạo provider để bao bọc ứng dụng
export const ThemeProvider = ({ children }) => {
 // State quản lý theme hiện tại 
    const [theme, setTheme] = React.useState("light");

  // Hàm chuyển đổi theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
//Tạo object context chứa giá trị và hàm chuyển đổi
  const contextValue = {
    theme, //trạng thái theme hiện tại light/dark
    toggleTheme //hàm chuyển đổi theme
  };

//3.  Cung cấp giá trị context cho các component con, truyền contextValue vào prop value
  return (
    <ThemeContext.Provider value={contextValue}>
      {children} // Các component con sẽ có thể truy cập context này
    </ThemeContext.Provider>
  );
};

//4.Custom hook để sử dụng context dễ dàng hơn
export const useTheme = () => {
  const context = React.useContext(ThemeContext); //Lấy giá trị context hiện tại
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};  

Bước 3: Sử dụng ThemeContext ở các components
-	Với CounterComponent.jsx thêm các đoạn code:
import { useTheme } from '../contexts/ThemeContext'; // Import custom hook useTheme

// Sử dụng ThemeContext
  const { theme, toggleTheme } = useTheme();

cập nhật giao diện sử dụng theme này
    <Button 
        style={{
        ...buttonStyle,
        background: theme === 'light' ? '#6c757d' : '#f8f9fa',
        color: theme === 'light' ? '#ffffff' : '#000000'
      }}
                  onClick={toggleTheme}
                 
                >
          {theme === 'light' ? 'Dark' : 'Light'}
          </Button>
-	Với LightSwitch.jsx thêm các đoạn code sau:
import { useTheme } from '../contexts/ThemeContext'; // Import custom hook useTheme

 // Sử dụng ThemeContext
  const { theme, toggleTheme } = useTheme();

Cập nhật giao diện sử dụng theme
  <Button 
      onClick={toggleTheme}
      style={{
        ...buttonStyle,
        background: theme === 'light' ? '#6c757d' : '#f8f9fa',
        color: theme === 'light' ? '#ffffff' : '#000000'
      }}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </Button>
Bước 4: Cập nhật App.js
//áp dụng ThemeProvider để bao bọc toàn bộ ứng dụng
import { ThemeProvider } from "./contexts/ThemeContext";
import LightSwitch from "./components/LightSwitch";
import CounterComponent from "./components/CounterComponent";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}>
        <CounterComponent />
        <LightSwitch />
      </div>
    </ThemeProvider>
  );
}

export default App;

Code đầy đủ: 
CounterComponent.jsx
//CounterComponent.jsx is a functional component that uses the useReducer hook to manage a counter state.
import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext'; // Import custom hook useTheme

// 1. Khởi tạo trạng thái ban đầu
const initialState = { count: 0 };
// 2. Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function CounterComponent() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);

  //action handlers
  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement' });
  const reset = () => dispatch({ type: 'reset' });
   //Sử dụng ThemeContext
   const { theme, toggleTheme } = useTheme(); //Lấy giá trị theme từ context

    // Style chung cho các button
    const buttonStyle = {
        margin: '5px',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    };
     return (
          <div style={{ padding: '20px', border: '1px solid #ccc' }}>
          <h2>Bộ Đếm Đa Năng</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Giá trị hiện tại: {state.count}</p>
          {/*Sử dụng ThemeContext*/}
       <Button 
        style={{
        ...buttonStyle,
        background: theme === 'light' ? '#6c757d' : '#f8f9fa',
        color: theme === 'light' ? '#ffffff' : '#000000'

      }}
                  onClick={toggleTheme}
                 
                >
          {theme === 'light' ? 'Dark' : 'Light'}
          </Button>
          <Button
            onClick={increment}
       
            style={{ ...buttonStyle, background: '#007bff', color: 'white' }}
          >
            Tăng (+1)
          </Button>
          <Button
            onClick={decrement}
            style={{ ...buttonStyle, background: '#ffc107', color: '#333' }}
          >
            Giảm (-1)
          </Button>
          <Button
            onClick={reset}
            style={{ ...buttonStyle, background: 'red', color: 'white' }}
          >
            Reset
          </Button>
        </div>
        );
}
export default CounterComponent;


LightSwitch.jsx
//LightSwitch.jsx is a functional component that uses the useReducer hook to manage a light switch state.
import React, { useReducer } from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext'; // Import custom hook useTheme

// 1. Khởi tạo trạng thái ban đầu
const initialState = { isOn: false };
// 2. Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { isOn: !state.isOn };
    case 'turnOn':
      return { isOn: true };
    case 'turnOff':
      return { isOn: false };
    default:
      return state;
  }
}

function LightSwitch() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);  

    //Sử dụng ThemeContext
    const { theme, toggleTheme } = useTheme(); //Lấy giá trị theme từ context

    //action handlers
    const toggle = () => dispatch({ type: 'toggle' });
    const turnOn = () => dispatch({ type: 'turnOn' });
    const turnOff = () => dispatch({ type: 'turnOff' });
    // Style chung cho các button
    const buttonStyle = {
        margin: '5px',
        padding: '10px 20px',   
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    };
  return (  
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Công Tắc Đèn</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Đèn hiện đang: {state.isOn ? 'Bật' : 'Tắt'}</p>   
      <Button 
      onClick={toggleTheme}
      style={{
        ...buttonStyle,
        background: theme === 'light' ? '#6c757d' : '#f8f9fa',
        color: theme === 'light' ? '#ffffff' : '#000000'
      }}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </Button>
       
        <Button
        onClick={toggle}
        style={{ ...buttonStyle, background: '#007bff', color: 'white' }}
      >
        Chuyển Đổi
      </Button>
      <Button
        onClick={turnOn}
        style={{ ...buttonStyle, background: '#28a745', color: 'white' }}
      > 
        Bật Đèn
      </Button>
      <Button
        onClick={turnOff}
        style={{ ...buttonStyle, background: '#dc3545', color: 'white' }}
      >
        Tắt Đèn
        </Button>
    </div>
  );
}   
export default LightSwitch;

Exercise 2: Khai báo AuthContext
Tạo LoginForm sử dụng AuthContext, chỉ lấy dữ liệu từ mock data. 
Dữ liệu mẫu thay thế cho API call
  const mockAccounts = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: '123456',
      role: 'admin',
      status: 'active'
    },
    {
      id: 2,
      username: 'user1',
      email: 'user1@example.com',
      password: '123456',
      role: 'user',
      status: 'active'
    },
    {
      id: 3,
      username: 'user2',
      email: 'user2@example.com',
      password: '123456',
      role: 'user',
      status: 'locked'
    }
  ];
Yêu cầu:
-	Khai báo từng bước làm trong AuthContext
-	Sử dụng ở LoginForm, sử dụng useReducer hook
-	Validation dữ liệu như bài cũ, với phân quyền admin mới được phép đăng nhập.
-	Không lấy dữ liệu từ server.


