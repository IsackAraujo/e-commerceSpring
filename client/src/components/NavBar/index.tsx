import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Recupera o usuário ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData.username); // Define o nome do usuário
    }
  }, []);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Alternar dropdown manualmente
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container-fluid">
        {/* Título no lugar da logo */}
        <Link className="navbar-brand brand-title" to="/">
          SNEAKER<span>STORE</span>
        </Link>

        {/* Botão do Menu Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Itens da Navbar */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Barra de Pesquisa */}
          <form className="d-flex search-form mx-auto">
            <input
              className="form-control me-2 search-input"
              type="search"
              placeholder="Pesquisar"
              aria-label="Search"
            />
            <button className="btn btn-outline-info text-white" type="submit">
              🔍
            </button>
          </form>

          {/* Links da Navbar */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Sobre Nós</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrinho">Carrinho</Link>
            </li>

            {/* Se o usuário estiver logado, exibe o nome e a opção de logout */}
            {user ? (
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle ${dropdownOpen ? "show" : ""}`}
                  onClick={toggleDropdown}
                >
                  {user}
                </button>
                <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? "show" : ""}`}>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Sair
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Entrar</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
