import  { useEffect } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom"
import { useAuth} from "./contexts/AuthContext"
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { MainPage } from './pages/Main';
// Main App Component with Navigation
export default function App() {
  const { user } = useAuth();
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (user) {
  //     navigate('/')
  //   }
  // }, [user]);

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