import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaInfoCircle, FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container-fluid">
          <Link className="navbar-brand brand-title" to="/">
            SNEAKER<span>STORE</span>
          </Link>

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

          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/"><FaHome/> Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about"><FaInfoCircle/> Sobre Nós</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/carrinho"><FaShoppingCart/> Carrinho</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history"> Histórico</Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              {user ? (
                  <li className="nav-item dropdown">
                  <button
                        className={`nav-link dropdown-toggle ${dropdownOpen ? "show" : ""}`}
                        onClick={toggleDropdown}
                    >
                      <FaUser /> {user}
                    </button>
                    <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? "show" : ""}`}>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          <FaSignOutAlt /> Sair
                        </button>
                      </li>
                    </ul>
                  </li>
              ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login"><FaUser /> Entrar</Link>
                  </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default NavBar;