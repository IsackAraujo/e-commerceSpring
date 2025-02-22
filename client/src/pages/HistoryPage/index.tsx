import { useEffect, useState } from "react";
import './style.css';
import { OrderService, Order } from '../../api/Order.ts';

const HistoryPage = () => {

  console.log("Entrouo11");
  const [purchaseHistory, setPurchaseHistory] = useState<Order[]>([]);
  const orderService = new OrderService('http://localhost:8080');
  const userId = 1;

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const historyData = await orderService.getAllOrders(userId);
        setPurchaseHistory(historyData);
      } catch (error) {
        console.error('Erro ao carregar o histórico de compras:', error);
      }
    };

    fetchPurchaseHistory();
  }, [userId]);

  return (
      <div className="history-container">
        <h2 className="title">Histórico de Compras</h2>
        {purchaseHistory.length > 0 ? (
            purchaseHistory.map((order, index) => (
                <div key={index} className="order-summary">
                  <h5>Pedido realizado em: {order.orderDate}</h5>
                  {order.products.map((product, i) => (
                      <div key={i}>
                        <p>Produto ID: {product.id} - Quantidade: {product.quantity}</p>
                        <p>Preço: R$ {product.totalValue.toFixed(2)}</p>
                      </div>
                  ))}
                  <hr />
                  <h5 className="total">
                    <span>Total</span>
                    <span>R$ {order.products.reduce((acc, product) => acc + product.totalValue, 0).toFixed(2)}</span>
                  </h5>
                  <p>Método de Pagamento: Cartão de Crédito (exemplo fictício)</p>
                </div>
            ))
        ) : (
            <p>Você ainda não fez nenhuma compra.</p>
        )}
      </div>
  );
};

export default HistoryPage;
