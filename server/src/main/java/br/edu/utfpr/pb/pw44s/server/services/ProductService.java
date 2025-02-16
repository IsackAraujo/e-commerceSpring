package br.edu.utfpr.pb.pw44s.server.services;

import br.edu.utfpr.pb.pw44s.server.dto.PaginationFilterDTO;
import br.edu.utfpr.pb.pw44s.server.dto.ProductDTO;
import br.edu.utfpr.pb.pw44s.server.entity.CategoryEntity;
import br.edu.utfpr.pb.pw44s.server.entity.ProductEntity;
import br.edu.utfpr.pb.pw44s.server.repository.ProductRepository;
import br.edu.utfpr.pb.pw44s.server.util.PaginationUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    public ProductEntity create(ProductDTO productDTO) {
        Long categoryId = productDTO.getCategory().getId();
        CategoryEntity categoryEntity = categoryService.findById(categoryId);

        return productRepository.save(ProductEntity.builder()
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .price(productDTO.getPrice())
                .imageUrl(productDTO.getImageUrl())
                .categoryEntity(categoryEntity)
                .build());

    }

    private ProductEntity getProductEntityById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto com ID " + id + " não encontrado."));
    }

    public ProductEntity findById(Long id) {
        return getProductEntityById(id);
    }

    public List<ProductEntity> findAll(PaginationFilterDTO paginationFilter) {
        Pageable pageable = PaginationUtils.createPageable(
                paginationFilter.getPage(),
                paginationFilter.getSize(),
                paginationFilter.getSort());
        return pageable != null
                ? productRepository.findAll(pageable).getContent()
                : productRepository.findAll();
    }

    public List<ProductEntity> findAllByCategoryId(Long categoryId, PaginationFilterDTO paginationFilter) {
        Pageable pageable = PaginationUtils.createPageable(
                paginationFilter.getPage(),
                paginationFilter.getSize(),
                paginationFilter.getSort());
        return pageable != null ? productRepository.findAllByCategoryEntityId(categoryId, pageable).getContent() : productRepository.findAllByCategoryEntityId(categoryId);
    }

    public ProductEntity update(ProductDTO productDTO) {
        Long categoryId = productDTO.getCategory().getId();
        CategoryEntity categoryEntity = categoryService.findById(categoryId);

        ProductEntity productEntity = getProductEntityById(productDTO.getId());

        if (productDTO.getName() != null)
            productEntity.setName(productDTO.getName());
        if (categoryEntity != null)
            productEntity.setCategoryEntity(categoryEntity);
        if (productDTO.getPrice() != null)
            productEntity.setPrice(productDTO.getPrice());
        if (productDTO.getDescription() != null)
            productEntity.setDescription(productDTO.getDescription());
        if (productDTO.getImageUrl() != null)
            productEntity.setImageUrl(productDTO.getImageUrl());

        return productRepository.save(productEntity);
    }

    public void delete(Long id) {
        ProductEntity productEntity = getProductEntityById(id);
        productRepository.delete(productEntity);
    }

}
