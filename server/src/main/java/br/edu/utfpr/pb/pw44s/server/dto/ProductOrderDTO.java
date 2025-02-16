package br.edu.utfpr.pb.pw44s.server.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductOrderDTO {

    private Long id;

    @NotNull
    private Long quantity;

    private BigDecimal totalValue;

}
