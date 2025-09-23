// src/page/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as memdb from "../../memory/memdb";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const allUsers = await memdb.getAll();
    const user = allUsers.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "1rem" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "1rem" }}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
