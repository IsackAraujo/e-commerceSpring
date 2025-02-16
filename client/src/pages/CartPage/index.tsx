import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const CartPage = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/payment");
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Total</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody id="cart-items"></tbody>
          </table>
        </div>
        <div className="col-md-4 mt-3">
          <div className="card text-dark">
            <div className="card-body d-flex flex-column">
              <div>
                <h5 className="card-title"><strong>Resumo do Pedido</strong></h5>

                <div className="dropdown parcelas-dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Formas de Pagamento
                  </button>
                  <ul className="dropdown-menu" id="parcelas-dropdown-menu" aria-labelledby="dropdownMenuButton1"></ul>
                </div>
                <div className="mt-4 total-container d-flex justify-content-between">
                  <h6>Total</h6>
                  <h6>0</h6>
                </div>
              </div>
              <div className="mt-auto">
                <button onClick={handleCheckout} className="btn btn-success btn-lg w-100 mt-3">Finalizar Compra</button>
                <a href="/" className="btn btn-secondary btn-sm w-100 mt-2">Continuar comprando</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
