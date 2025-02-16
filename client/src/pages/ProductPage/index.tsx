import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from "../../api/Products";

const productService = new ProductService("http://localhost:8080");

console.log("teste");


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
    console.log('id: ' + id );
    const [product, setProduct] = useState<Product | null>(null);
    const [mainImage, setMainImage] = useState<string>(''); // Estado para a imagem principal

    useEffect(() => {
        if (id) {
            productService.getProductById(id)
                .then(data => {
                    setProduct(data);
                    setMainImage(data.imageUrl); // Setando a imagem principal do produto
                })
                .catch(error => console.error("Erro ao carregar produto:", error));
        }
    }, [id]);

    if (!product) {
        return <div>Carregando...</div>; // Mostrar algo enquanto o produto não estiver carregado
    }

    return (
        <div className="container product-page mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={mainImage} className="main-image img-fluid" alt={product.name} style={{ maxWidth: "500px" }} />
                    <div className="thumbnail-container mt-3">
                        {/* Ajustando o loop de imagens (caso tenha mais imagens, adicione a propriedade correta) */}
                        <img
                            src={product.imageUrl} // Supondo que seja uma única imagem para o produto
                            className="thumbnail img-thumbnail mx-1"
                            alt={`${product.name} Thumbnail`}
                            onClick={() => setMainImage(product.imageUrl)} // Atualiza a imagem principal
                            style={{ cursor: "pointer", width: "80px" }}
                        />
                    </div>
                </div>
                <div className="col-md-6 product-info text-white">
                    <h2>{product.name}</h2>
                    <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p> {/* Exibe o preço com 2 casas decimais */}
                    <p>{product.description}</p>
                    <p><strong>Categoria:</strong> {product.categoryEntity.name}</p> {/* Exibe o nome da categoria */}
                    <p><strong>Formas de Pagamento:</strong></p>
                    <ul>
                        <li>Visa</li>
                        <li>Mastercard</li>
                        <li>Pix</li>
                        <li>Boleto</li>
                    </ul>
                    <button className="btn btn-success btn-buy mt-3">Adicionar ao Carrinho</button>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-12 text-white">
                    <h3>Detalhes do Produto</h3>
                    <p>{product.description}</p> {/* Usando a descrição do produto da interface */}
                    <h4>Benefícios</h4>
                    {/* Caso o produto tenha benefícios, você pode mapear de uma lista, caso contrário, pode ajustar */}
                    <ul>
                        {/* Exemplo de como você pode mapear benefícios, dependendo de como os dados forem retornados */}
                        {/* Ajuste conforme a estrutura real de benefícios, que não está na interface fornecida */}
                    </ul>
                    <h4>Origem</h4>
                    {/* Adicione detalhes sobre a origem aqui, se disponíveis */}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
