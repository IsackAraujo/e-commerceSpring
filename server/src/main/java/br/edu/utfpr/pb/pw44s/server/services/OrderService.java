package br.edu.utfpr.pb.pw44s.server.services;

import br.edu.utfpr.pb.pw44s.server.dto.OrderDTO;
import br.edu.utfpr.pb.pw44s.server.dto.OrderResponseDTO;
import br.edu.utfpr.pb.pw44s.server.dto.ProductOrderDTO;
import br.edu.utfpr.pb.pw44s.server.dto.ProductOrderResponseDTO;
import br.edu.utfpr.pb.pw44s.server.entity.OrderEntity;
import br.edu.utfpr.pb.pw44s.server.entity.OrderGrupEntity;
import br.edu.utfpr.pb.pw44s.server.entity.ProductEntity;
import br.edu.utfpr.pb.pw44s.server.entity.UserEntity;
import br.edu.utfpr.pb.pw44s.server.repository.OrderGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserService userService;
    private final ProductService productService;
    private final OrderGroupRepository orderGroupRepository;

    public OrderResponseDTO create(OrderDTO orderDTO) {
        validateOrder(orderDTO);

        UserEntity userEntity = userService.getUserById(orderDTO.getUserId());

        OrderGrupEntity orderGroup = createOrderGroup(orderDTO, userEntity);

        List<OrderEntity> orderEntities = processOrder(orderDTO, orderGroup);

        orderGroup.setOrderEntities(orderEntities);
        orderGroupRepository.save(orderGroup);

        return buildOrderGroupDTO(orderGroup);
    }

    private void validateOrder(OrderDTO orderDTO) {
        if (orderDTO.getProducts() == null || orderDTO.getProducts().isEmpty()) {
            throw new IllegalArgumentException("Dados do pedido incompletos: produtos estão ausentes.");
        }
    }

    private OrderGrupEntity createOrderGroup(OrderDTO orderDTO, UserEntity userEntity) {
        return OrderGrupEntity.builder()
                .orderDate(LocalDateTime.now())
                .orderDescription(orderDTO.getOrderDescription())
                .userEntity(userEntity)
                .build();
    }

    private List<OrderEntity> processOrder(OrderDTO orderDTO, OrderGrupEntity orderGroup) {
        List<OrderEntity> orderEntities = new ArrayList<>();

        for (ProductOrderDTO productOrder : orderDTO.getProducts()) {
            ProductEntity productEntity = productService.findById(productOrder.getId());

            validateProductQuantity(productOrder, productEntity);

            BigDecimal productTotalValue = calculateProductTotalValue(productOrder, productEntity);

            productOrder.setTotalValue(productTotalValue);

            OrderEntity orderEntity = createOrderEntity(productOrder, productEntity, productTotalValue, orderGroup);
            orderEntities.add(orderEntity);
        }

        return orderEntities;
    }

    private void validateProductQuantity(ProductOrderDTO productOrder, ProductEntity productEntity) {
        if (productOrder.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantidade informada inválida para o produto: " + productEntity.getName());
        }
    }

    private BigDecimal calculateProductTotalValue(ProductOrderDTO productOrder, ProductEntity productEntity) {
        return productEntity.getPrice().multiply(BigDecimal.valueOf(productOrder.getQuantity()));
    }

    private OrderEntity createOrderEntity(ProductOrderDTO productOrder, ProductEntity productEntity,
                                          BigDecimal productTotalValue, OrderGrupEntity orderGroup) {
        return OrderEntity.builder()
                .quantity(productOrder.getQuantity())
                .totalValue(productTotalValue)
                .productEntity(productEntity)
                .orderGroup(orderGroup)
                .build();
    }

    private OrderResponseDTO buildOrderGroupDTO(OrderGrupEntity orderGroup) {
        List<ProductOrderResponseDTO> productOrders = orderGroup.getOrderEntities().stream()
                .map(order -> ProductOrderResponseDTO.builder()
                        .id(order.getProductEntity().getId())
                        .name(order.getProductEntity().getName())
                        .description(order.getProductEntity().getDescription())
                        .imageUrl(order.getProductEntity().getImageUrl())
                        .quantity(order.getQuantity())
                        .totalValue(order.getTotalValue())
                        .build())
                .collect(Collectors.toList());

        return OrderResponseDTO.builder()
                .orderDate(orderGroup.getOrderDate().toLocalDate())
                .orderDescription(orderGroup.getOrderDescription())
                .products(productOrders)
                .build();
    }

    public List<OrderResponseDTO> findOrdersByUserId(Long userId) {
        userService.getUserById(userId);
        List<OrderGrupEntity> orderGroups = orderGroupRepository.findByUserEntityId(userId);

        return orderGroups.stream()
                .map(this::buildOrderGroupDTO)
                .collect(Collectors.toList());
    }
}