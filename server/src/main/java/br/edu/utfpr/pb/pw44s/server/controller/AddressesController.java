package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.AddressesDTO;
import br.edu.utfpr.pb.pw44s.server.dto.ProductDTO;
import br.edu.utfpr.pb.pw44s.server.entity.ProductEntity;
import br.edu.utfpr.pb.pw44s.server.services.AddressesService;
import br.edu.utfpr.pb.pw44s.server.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("addresses")
@RequiredArgsConstructor
public class AddressesController {

    private final AddressesService addressesService;
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody AddressesDTO addressesDTO) {
        try {
            return new ResponseEntity<>(addressesService.create(addressesDTO), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<Object> findAllByUserId(@PathVariable Long userId) {
        try {
            return new ResponseEntity<>(addressesService.findAllByUserId(userId), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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