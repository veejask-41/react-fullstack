import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const { setAuthState } = useContext(AuthContext);

  const login = () => {
    axios.post("http://localhost:1234/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.accessToken);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="loginPage">
      <div className="formContainer">
        <label htmlFor="username">username:</label>
        <input
          type="text"
          name="username"
          id="inputCreatePost"
          value={data.username}
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
        />
        <label htmlFor="password">password:</label>
        <input
          type="password"
          name="password"
          id="inputCreatePost"
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;
