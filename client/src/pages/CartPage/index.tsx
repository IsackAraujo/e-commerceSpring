import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, removeFromCart, getCartTotal } from '../../services/CarrinhoServices.ts';
import './style.css';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const CartPage: React.FC = () => {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemoveFromCart = (productId: number, productTitle: string) => {
    removeFromCart(productId);
    setCart(getCart());
    alert(`${productTitle} removido do carrinho!`);
  };

  const handleFinalizePurchase = () => {
    const totalPrice = getCartTotal();
    navigate('/payment', { state: { cart, totalPrice } });
  };

  const handleGoBackHome = () => {
    navigate('/');
  };

  return (
      <div className="cart-container">
        <h2>Carrinho de Compras <FaShoppingCart /></h2>
        {cart.length === 0 ? (
            <p className="empty-cart-message">Seu carrinho está vazio.</p>
        ) : (
            <>
              <div className="cart-items">
                {cart.map((product, index) => (
                    <div key={index} className="cart-item">
                      <img src={product.imageUrl} alt={product.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        <p>Quantidade: {product.quantity}</p>
                        <button className="btn-remove" onClick={() => handleRemoveFromCart(product.id, product.name)}>
                          <FaTrash /> Remover
                        </button>
                      </div>
                    </div>
                ))}
              </div>
              <div className="cart-summary">
                <h3>Resumo do Pedido</h3>
                <p>Total: R$ {getCartTotal()}</p>
                <div className="cart-buttons">
                  <button className="btn-finalize" onClick={handleFinalizePurchase}>Finalizar Compra</button>
                  <button className="btn-back" onClick={handleGoBackHome}>Voltar para HomePage</button>
                </div>
              </div>
            </>
        )}
      </div>
  );
};

export default CartPage;
