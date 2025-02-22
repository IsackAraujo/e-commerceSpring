import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import {LoginService, UserAuthData} from "../../api/Login.ts";

const loginService = new LoginService("http://localhost:8080");

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      const userData: UserAuthData = {
        displayName: 'teste',
        password: 'tste'
      };

      loginService.loginUser(userData);

      if (username === user.username && password === user.password) {
        if (rememberMe) {
          localStorage.setItem("rememberUser", username);
        } else {
          localStorage.removeItem("rememberUser");
        }

        alert("Login bem-sucedido!");
        navigate("/");
      } else {
        alert("Usuário ou senha inválidos!");
      }
    } else {
      alert("Nenhum usuário cadastrado!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Lembrar-me</label>
          </div>
          <button type="submit" className="login-button">Entrar</button>
          <button type="button" className="register-button" onClick={() => navigate("/register")}>
            Registre-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
