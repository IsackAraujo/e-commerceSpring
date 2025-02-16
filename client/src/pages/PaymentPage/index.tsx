import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = () => {
    alert("Pagamento confirmado!");
    navigate("/");
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="title">Pagamento</h2>

        <div className="payment-options">
          <button
            className={`payment-button ${paymentMethod === "card" ? "active" : ""}`}
            onClick={() => setPaymentMethod("card")}
          >
            💳 Cartão de Crédito
          </button>
          <button
            className={`payment-button ${paymentMethod === "pix" ? "active" : ""}`}
            onClick={() => setPaymentMethod("pix")}
          >
            🔵 Pix
          </button>
        </div>

        {paymentMethod === "card" && (
          <div className="payment-form fade-in">
            <div>
              <label>Nome no Cartão</label>
              <input type="text" placeholder="Nome Completo" />
            </div>
            <div>
              <label>Número do Cartão</label>
              <input type="text" placeholder="**** **** **** ****" />
            </div>
            <div className="row">
              <div>
                <label>Validade</label>
                <input type="text" placeholder="MM/AA" />
              </div>
              <div>
                <label>CVV</label>
                <input type="text" placeholder="***" />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "pix" && (
          <div className="pix-section fade-in">
            <p>Escaneie o QR Code abaixo para pagar com Pix:</p>
            <img
              src="https://images.seeklogo.com/logo-png/21/2/qr-code-logo-png_seeklogo-217342.png"
              alt="QR Code"
            />
          </div>
        )}

        <div className="order-summary">
          <h5>Resumo do Pedido</h5>
          <p>Produto: Nome do Produto</p>
          <p>Valor: R$ 99,99</p>
          <hr />
          <h5 className="total">
            <span>Total</span> <span>R$ 99,99</span>
          </h5>
        </div>

        <button onClick={handlePayment} className="confirm-button">
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
