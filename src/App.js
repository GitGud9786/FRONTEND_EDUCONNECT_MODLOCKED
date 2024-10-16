import logo from "./logo.svg";
import "./App.css";


import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Course from "./Components/CoursePage";


import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/dash" element={<Dashboard/>} />
            <Route path="/course" element={<Course/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
