package br.edu.utfpr.pb.pw44s.server.services;

import br.edu.utfpr.pb.pw44s.server.dto.OrderDTO;
import br.edu.utfpr.pb.pw44s.server.dto.ProductOrderDTO;
import br.edu.utfpr.pb.pw44s.server.entity.OrderEntity;
import br.edu.utfpr.pb.pw44s.server.entity.ProductEntity;
import br.edu.utfpr.pb.pw44s.server.entity.UserEntity;
import br.edu.utfpr.pb.pw44s.server.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserService userService;
    private final ProductService productService;
    private final OrderRepository orderRepository;

    public List<OrderEntity> findAll() {
        return orderRepository.findAll();
    }

    public OrderDTO create(OrderDTO orderDTO) {
        validateOrder(orderDTO);

        UserEntity userEntity = userService.getUserById(orderDTO.getUserId());

        List<OrderEntity> orderEntities = processOrder(orderDTO, userEntity);

        orderRepository.saveAll(orderEntities);

        return buildOrderDTO(orderDTO);
    }

    private void validateOrder(OrderDTO orderDTO) {
        if (orderDTO.getProducts() == null || orderDTO.getProducts().isEmpty()) {
            throw new IllegalArgumentException("Dados do pedido incompletos: produtos estão ausentes.");
        }
    }

    private List<OrderEntity> processOrder(OrderDTO orderDTO, UserEntity userEntity) {
        BigDecimal totalOrderValue = BigDecimal.ZERO;
        long totalOrderQuantity = 0;

        List<OrderEntity> orderEntities = new ArrayList<>();

        for (ProductOrderDTO productOrder : orderDTO.getProducts()) {
            ProductEntity productEntity = productService.findById(productOrder.getId());
            validateProductQuantity(productOrder, productEntity);

            BigDecimal productTotalValue = calculateProductTotalValue(productOrder, productEntity);
            productOrder.setTotalValue(productTotalValue);

            totalOrderValue = totalOrderValue.add(productTotalValue);
            totalOrderQuantity += productOrder.getQuantity();

            OrderEntity orderEntity = createOrderEntity(orderDTO, userEntity, productOrder, productEntity, productTotalValue);
            orderEntities.add(orderEntity);
        }

        return orderEntities;
    }

    private void validateProductQuantity(ProductOrderDTO productOrder,
                                         ProductEntity productEntity) {
        if (productOrder.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantidade informada inválida para o produto: " + productEntity.getName());
        }
    }

    private BigDecimal calculateProductTotalValue(ProductOrderDTO productOrder,
                                                  ProductEntity productEntity) {
        return productEntity.getPrice().multiply(BigDecimal.valueOf(productOrder.getQuantity()));
    }

    private OrderEntity createOrderEntity(OrderDTO orderDTO,
                                          UserEntity userEntity,
                                          ProductOrderDTO productOrder,
                                          ProductEntity productEntity,
                                          BigDecimal productTotalValue) {
        return OrderEntity.builder()
                .orderDate(LocalDateTime.now())
                .quantity(productOrder.getQuantity())
                .totalValue(productTotalValue)
                .orderDescription(orderDTO.getOrderDescription())
                .userEntity(userEntity)
                .productEntity(productEntity)
                .build();
    }

    private OrderDTO buildOrderDTO(OrderDTO orderDTO) {
        return OrderDTO.builder()
                .userId(orderDTO.getUserId())
                .orderDate(LocalDate.now())
                .orderDescription(orderDTO.getOrderDescription())
                .products(orderDTO.getProducts())
                .build();
    }

    public List<OrderDTO> findByUserId(Long userId) {
        List<OrderEntity> orders = orderRepository.findByUserEntityId(userId);

        List<OrderDTO> orderDTOs = new ArrayList<>();
        for (OrderEntity order : orders) {
            orderDTOs.add(buildOrderDTOFromEntity(order));
        }

        return orderDTOs;
    }

    private OrderDTO buildOrderDTOFromEntity(OrderEntity orderEntity) {
        List<ProductOrderDTO> productOrderDTOs = new ArrayList<>();

        ProductOrderDTO productOrderDTO = new ProductOrderDTO(
                orderEntity.getProductEntity().getId(),
                orderEntity.getQuantity(),
                orderEntity.getTotalValue()
        );

        productOrderDTOs.add(productOrderDTO);

        return OrderDTO.builder()
                .userId(orderEntity.getUserEntity().getId())
                .orderDate(orderEntity.getOrderDate().toLocalDate())
                .orderDescription(orderEntity.getOrderDescription())
                .products(productOrderDTOs)
                .build();
    }


}
