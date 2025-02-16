import React from "react";
import { Link } from "react-router-dom";
import './style.css';

const Footer: React.FC = () => {
  return (
    <>
      {/* Linha divisória */}
      <div className="footer-divider"></div>

      <footer className="custom-footer text-white py-4">
        <div className="container d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            {/* Métodos de pagamento */}
            <div className="payment-methods text-start">
              <img
                src="https://img.icons8.com/color/48/visa.png"
                alt="Visa"
                className="payment-icon mx-1"
              />
              <img
                src="https://img.icons8.com/color/48/mastercard.png"
                alt="Mastercard"
                className="payment-icon mx-1"
              />
              <img
                src="https://img.icons8.com/color/48/pix.png"
                alt="Pix"
                className="payment-icon mx-1"
              />
              <img
                src="https://img.icons8.com/color/48/boleto-bankario.png"
                alt="Boleto"
                className="payment-icon mx-1"
              />
            </div>

            <div className="footer-content text-center flex-grow-1">
              <p className="mb-1">CNPJ: 19.510.342/0001-80</p>
              <p className="mb-1">&copy; {new Date().getFullYear()} <strong>SneakerStore</strong>. Todos os direitos reservados.</p>
              <ul className="list-unstyled d-inline-flex mb-0">
                <li className="text-white text-decoration-none">
                  <Link className="text-white text-decoration-none" to="/about">Sobre Nós</Link>
                </li>
                <li className="mx-3">
                  <a href="/politica-privacidade" className="text-white text-decoration-none">
                    Política de Privacidade
                  </a>
                </li>
                <li className="mx-4">
                  <a href="/termos-servico" className="text-white text-decoration-none">
                    Termos de Serviço
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-contact text-end">
              <p className="mb-1">R. Caramuru, 271 - Centro, Pato Branco, Paraná</p>
              <p className="mb-1">Contato: sneakerstore@gmail.com</p>
              <p className="mb-3">+55 46 99104-2709</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
