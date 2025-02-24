package br.edu.utfpr.pb.pw44s.server.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductOrderResponseDTO {

    private Long id;

    private String name;

    private String description;

    private String imageUrl;

    @NotNull
    private Long quantity;

    private BigDecimal totalValue;

}