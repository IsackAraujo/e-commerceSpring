import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { ProductService } from "../../api/Products";
import {addToCart} from "../../services/CarrinhoServices.ts";

// Define interface for the product structure coming from API
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryEntity: {
    id: number;
    name: string;
  };
}

const productService = new ProductService("http://localhost:8080");

const categories = ["Tênis", "Camiseta", "Meia"];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    console.log(product)
    addToCart(product);
    alert(`${product.name} adicionado ao carrinho com sucesso!`);
  };


  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Erro ao carregar produtos. Por favor, tente novamente mais tarde.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
      <div className="home-container">
        <div className="categories-container">
          {categories.map((category, index) => (
              <span
                  key={index}
                  className="category-text"
                  onClick={() => {
                    const categoryId = index + 1;
                    console.log("Navigating to category:", categoryId);
                    navigate(`/category/${categoryId}`);
                  }}
                  style={{ cursor: "pointer" }}
              >
                {category}
            </span>
          ))}
        </div>

        <hr className="divider" />

        <div className="products-container">
          {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{cursor: "pointer"}}
                />
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <div className="product-buttons">
                  <button className="btn-primary" onClick={() => navigate(`/product/${product.id}`)}>Comprar Agora
                  </button>
                  <button className="btn-secondary" onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default HomePage;