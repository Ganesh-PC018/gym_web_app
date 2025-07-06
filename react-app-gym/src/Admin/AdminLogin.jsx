// src/pages/AdminLogin.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './AdminLogin.css';
import { div } from "framer-motion/client";
import {loginAdmin} from '../service/LoginService.js'
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin({ email, password });
      console.log(res);
      if(res.status === 202){
        login(res.data);
        toast.success("Login Success");
        navigate("/admin");
      }else{
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error("Incorrect Credentials");
      // alert("Login failed");
    }
  };

  return (
    <section className="bg-dark ">
    <form onSubmit={handleLogin} className="bg-dark admin-login-form" style={{ textAlign:'center', alignItems:'center',margin :'auto',marginTop:'100px'}}>
      <h2>Admin Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        required
        />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
        </section>
  );
};

export default AdminLogin;
