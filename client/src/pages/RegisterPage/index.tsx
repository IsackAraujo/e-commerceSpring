import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { UserService, UserRegisterData } from "../../api/User.ts";
const userService = new UserService("http://localhost:8080");

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [displayUsername, setDisplayUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const userData: UserRegisterData = {
      username: username,
      displayName: displayUsername,
      email: email,
      password: password
    };

    userService.registerUser(userData)
        .then(response => {
          console.log("Usuário registrado com sucesso:", response);
          alert(`Usuario (${username}) criado com sucesso!`);
          navigate("/login");
        })
        .catch(error => {
          console.error("Erro ao registrar usuário:", error);
          alert(`Erro ao criar usuario ${username}!`);
        });


  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Criar Conta</h1>
        <form onSubmit={handleRegister} className="register-form">
          <input
              type="text"
              placeholder="Nome Completo"
              value={displayUsername}
              onChange={(e) => setDisplayUsername(e.target.value)}
              className="register-input"
              required
          />
          <input
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-input"
              required
          />
          <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              required
          />
          <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              required
          />
          <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="register-input"
              required
          />
          <div className="terms-container">
            <label className="terms-label">
              <input type="checkbox" required/> Aceito os{" "}
              <a href="/termos" className="terms-link">Termos de Serviço</a> e a{" "}
              <a href="/politica-de-privacidade" className="terms-link">Política de Privacidade</a>
            </label>
          </div>
          <div className="button-container">
            <button type="submit" className="register-button">Registrar</button>
            <button type="button" className="back-button" onClick={() => navigate("/login")}>Voltar para Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
