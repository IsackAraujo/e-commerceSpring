import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
import { ProductService, Product } from "../../api/Products";

const productService = new ProductService("http://localhost:8080");

const CategoryPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log("id: " + id?.toString());
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (id) {
                    const categoryId = parseInt(id, 10);
                    console.log("Fetching products for category ID:", categoryId);
                    const productsData = await productService.getProductsByCategory(categoryId);
                    setProducts(productsData);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Erro ao carregar produtos desta categoria.");
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id]);

    if (loading) {
        return <div className="loading">Carregando produtos...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const formatPrice = (price: number) => {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    return (
        <div className="category-container">
            <div className="products-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-image"
                                onClick={() => navigate(`/product/${product.id}`)}
                                style={{ cursor: "pointer" }}
                            />
                            <h3 className="product-title">{product.name}</h3>
                            <p className="product-price">{formatPrice(product.price)}</p>
                            <p className="product-category">{product.categoryEntity.name}</p>
                            <div className="product-buttons">
                                <button
                                    className="btn-primary"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    Comprar Agora
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => alert(`${product.name} adicionado ao carrinho!`)}
                                >
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-products">Nenhum produto encontrado nesta categoria</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;