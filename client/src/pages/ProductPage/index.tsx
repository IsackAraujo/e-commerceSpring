import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from "../../api/Products";
import { addToCart } from "../../services/CarrinhoServices.ts"; // Importe a função addToCart

const productService = new ProductService("http://localhost:8080");

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

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [mainImage, setMainImage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) {
                setError('ID do produto não fornecido');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await productService.getProductById(id);
                setProduct(data);
                setMainImage(data.imageUrl);
                setError('');
            } catch (err) {
                setError('Erro ao carregar o produto. Por favor, tente novamente.');
                console.error('Erro detalhado:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            alert(`${product.name} adicionado ao carrinho com sucesso!`);
        }
    };

    if (!product) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container product-page mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={mainImage} className="main-image img-fluid" alt={product.name} style={{ maxWidth: "500px" }} />
                    <div className="thumbnail-container mt-3">
                        <img
                            src={product.imageUrl}
                            className="thumbnail img-thumbnail mx-1"
                            alt={`${product.name} Thumbnail`}
                            onClick={() => setMainImage(product.imageUrl)}
                            style={{ cursor: "pointer", width: "80px" }}
                        />
                    </div>
                </div>
                <div className="col-md-6 product-info text-white">
                    <h2>{product.name}</h2>
                    <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
                    <p>{product.description}</p>
                    <p><strong>Categoria:</strong> {product.categoryEntity.name}</p>
                    <p><strong>Formas de Pagamento:</strong></p>
                    <ul>
                        <li>Visa</li>
                        <li>Mastercard</li>
                        <li>Pix</li>
                        <li>Boleto</li>
                    </ul>
                    <button className="btn btn-success btn-buy mt-3" onClick={handleAddToCart}>Adicionar ao Carrinho</button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
