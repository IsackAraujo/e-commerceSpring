import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { IUserLogin } from "../../commons/interfaces.ts";
import "./style.css";
import authService from "../../services/AuthService.ts";


const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Handle login submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData: IUserLogin = {
      username: formData.username,
      password: formData.password
    };

    try {

      const response = await authService.login(userData);
      if (response.status === 200) {

        localStorage.setItem('user', JSON.stringify(userData));
        setTimeout(() => {
          navigate('/');
        }, 2000);


      } else {
        console.log('Falha ao efetuar login!');
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Erro ao processar login. Tente novamente.");
    }
  };

  return (
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">Login</h1>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <input
                  type="text"
                  name="username"
                  placeholder="Usuário"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="login-input"
                  required
              />
            </div>

            <div className="input-group">
              <div className="password-input-wrapper">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="login-input"
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle-button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="remember-me">
              <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
              />
              <label htmlFor="rememberMe">Lembrar-me</label>
            </div>

            <button type="submit" className="login-button">
              Entrar
            </button>
            <button
                type="button"
                className="register-button"
                onClick={() => navigate("/register")}
            >
              Registre-se
            </button>
          </form>
        </div>
      </div>
  );
};

export default LoginPage;
