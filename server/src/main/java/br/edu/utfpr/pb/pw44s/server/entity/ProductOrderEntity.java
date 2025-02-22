package br.edu.utfpr.pb.pw44s.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tb_productOrder")
public class ProductOrderEntity {

    @ManyToOne
    @JoinColumn(name = "product_id")
    ProductEntity product;



    totalValue



}
