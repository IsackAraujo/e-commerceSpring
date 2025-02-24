import { useEffect, useState } from "react";
import './style.css';
import { OrderService, Order } from '../../api/Order.ts';

const HistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Mudando para array
  const orderService = new OrderService('http://localhost:8080');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await orderService.getAllOrders(1);
        console.log("Dados recebidos:", ordersData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Erro ao carregar os pedidos:', error);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateOrderTotal = (products: any[]) => {
    return products.reduce((acc, product) => acc + product.totalValue, 0);
  };

  if (orders.length === 0) {
    return (
        <div className="history-container">
          <h2 className="title">Detalhes dos Pedidos</h2>
          <div className="empty-state">
            <p>Nenhum pedido encontrado.</p>
          </div>
        </div>
    );
  }

  return (
      <div className="history-container">
        <h2 className="title">Histórico de Pedidos</h2>

        {orders.map((order, orderIndex) => (
            <div key={orderIndex} className="order-card">
              <div className="order-header">
                <h3>Pedido realizado em: {formatDate(order.orderDate)}</h3>
                <p className="order-description">{order.orderDescription}</p>
              </div>

              <div className="products-list">
                {order.products.map((product, productIndex) => (
                    <div key={productIndex} className="product-item">
                      <div className="product-info">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="product-image"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div>
                          <p className="product-title">{product.name}</p>
                          <p className="product-quantity">Quantidade: {product.quantity}</p>
                        </div>
                      </div>
                      <p className="total">
                        R$ {product.totalValue.toFixed(2)}
                      </p>
                    </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="total">
                  <span>Total do Pedido </span>
                  <span>R${calculateOrderTotal(order.products).toFixed(2)}</span>
                </div>
              </div>
            </div>
        ))}
      </div>
  );
};

export default HistoryPage;