package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.PaginationFilterDTO;
import br.edu.utfpr.pb.pw44s.server.dto.ProductDTO;
import br.edu.utfpr.pb.pw44s.server.entity.ProductEntity;
import br.edu.utfpr.pb.pw44s.server.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductEntity> create(@RequestBody ProductDTO productDTO) {
        try {
            ProductEntity productEntity = productService.create(productDTO);
            return new ResponseEntity<>(productEntity, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductEntity> findById(@PathVariable Long id) {
        try {
            ProductEntity productEntity = productService.findById(id);
            return new ResponseEntity<>(productEntity, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductEntity>> findAll(@ModelAttribute PaginationFilterDTO paginationFilter) {
        List<ProductEntity> productEntityList = productService.findAll(paginationFilter);
        return new ResponseEntity<>(productEntityList, HttpStatus.OK);
    }

    @GetMapping("category/{categoryId}")
    public ResponseEntity<List<ProductEntity>> findAllByCategoryId(
            @PathVariable Long categoryId,
            @ModelAttribute PaginationFilterDTO paginationFilter) {
        List<ProductEntity> productEntityList = productService.findAllByCategoryId(categoryId, paginationFilter);
        return new ResponseEntity<>(productEntityList, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ProductEntity> update(@RequestBody ProductDTO productDTO) {
        try {
            ProductEntity productEntity = productService.update(productDTO);
            return new ResponseEntity<>(productEntity, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            productService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

