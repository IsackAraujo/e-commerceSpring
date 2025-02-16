import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div class="container my-5">
        <h2 class="texttitle text-white text-center mb-4"><strong>Sobre Nós</strong></h2>
        <div class="row">
          <div class="col-md-6">
            <h3 class="text-white">Quem Somos</h3>
            <p class="text-white">Na <strong>SNEAKERSTORE</strong>, somos apaixonados por esporte e desempenho. Nossa missão é oferecer a melhor experiência de compra online para quem busca estilo, conforto e alta performance.</p>
            <p class="text-white">Desde nossa fundação, trabalhamos para criar uma plataforma intuitiva e confiável, onde atletas e entusiastas do esporte encontrem tudo o que precisam para treinar, competir e se superar.</p>
          </div>
          <div class="col-md-6">
            <h3 class="text-white">Nossa Missão</h3>
            <p class="text-white">Queremos transformar a forma como você se veste para o esporte! Acreditamos que qualidade, inovação e conforto são essenciais para o seu desempenho.</p>
            <p class="text-white">Por isso, estamos sempre atentos às suas necessidades, trazendo as melhores marcas, tecidos tecnológicos e um atendimento de excelência para garantir que cada compra seja uma vitória.</p>
          </div>
        </div>
      </div>
  );
};

export default AboutPage;
