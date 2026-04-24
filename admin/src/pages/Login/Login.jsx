import { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // validation
    if (!data.email || !data.password) {
      alert("All fields are mandatory");
      return;
    }
  
    if (!data.email.includes("@")) {
      alert("Please enter valid email");
      return;
    }
  
    try {
      const res = await axios.post(
        "http://localhost:4000/api/admin/login",
        data
      );
  
      localStorage.setItem("adminToken", res.data.token);
  
      alert("Login Successfully...");
  
      window.location.reload();
  
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin} className="login-container">
        <h2 className="login-title">Admin Login</h2>
        <div className="login-inputs">
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            
          />

          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
