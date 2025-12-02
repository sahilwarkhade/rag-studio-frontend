import  { useEffect } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom"
import { useAuth} from "./contexts/AuthContext"
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { MainPage } from './pages/Main';
// Main App Component with Navigation
export default function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    
    </div>
  );
}