import {useEffect, useState} from "react";
import {  useNavigate } from "react-router-dom";
import './style.css';
import { getCart, clearCart } from "../../services/CarrinhoServices.ts";
import {OrderService} from "../../api/Order.ts";



const orderService = new OrderService("http://localhost:8080");

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cep: "",
    address: "",
    city: "",
    state: ""
  });
  const [cart, setCart] = useState(getCart());

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const fetchAddressByCep = async () => {
    if (formData.cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData({
            ...formData,
            address: data.logradouro,
            city: data.localidade,
            state: data.uf
          });
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    }
  };

  const handlePayment = () => {
    console.log("Clicou em Finalizart");
    console.log('Carinho?' + cart);

    //pegar user pra pegar o id do usuario e passar como parametro no makeOrder()//

    orderService.makeOrder(cart, 1)

    /*
    const existingHistory = JSON.parse(localStorage.getItem("purchaseHistory") || "[]");
    const newPayment = { cart, paymentMethod, date: new Date().toLocaleString() };
    const updatedHistory = [...existingHistory, newPayment];
    localStorage.setItem("purchaseHistory", JSON.stringify(updatedHistory));
    */

    alert("Pagamento confirmado!");

    clearCart();
    navigate("/history");
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
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div>
                  <label>Número do Cartão</label>
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
                </div>
                <div className="row">
                  <div>
                    <label>Validade</label>
                    <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label>CVV</label>
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
          )}

          {paymentMethod === "pix" && (
              <div className="pix-payment fade-in">
                <h4>Pagamento via Pix</h4>
                <img src="https://www.drupal.org/files/styles/grid-3-2x/public/project-images/qrcode-module_0.png?itok=ZVIdRXkv" alt="QR Code do Pix" className="qr-code" />
              </div>
          )}

          <div className="address-form fade-in">
            <h4>Endereço de Cobrança</h4>
            <div>
              <label>CEP</label>
              <input type="text" name="cep" value={formData.cep} onBlur={fetchAddressByCep} onChange={handleInputChange} />
            </div>
            <div>
              <label>Endereço</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
            <div className="row">
              <div>
                <label>Cidade</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
              </div>
              <div>
                <label>Estado</label>
                <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <button onClick={handlePayment} className="confirm-button">Confirmar Pagamento</button>
        </div>
      </div>
  );
};

export default PaymentPage;
