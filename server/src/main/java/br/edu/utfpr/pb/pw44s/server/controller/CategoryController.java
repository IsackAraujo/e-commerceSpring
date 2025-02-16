package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.CategoryDTO;
import br.edu.utfpr.pb.pw44s.server.entity.CategoryEntity;
import br.edu.utfpr.pb.pw44s.server.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryEntity> create(@RequestBody CategoryDTO categoryDTO) {
        try {
            CategoryEntity categoryEntity = categoryService.create(categoryDTO);
            return new ResponseEntity<>(categoryEntity, HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<CategoryEntity> findById(@PathVariable Long id) {
        try {
            CategoryEntity categoryEntity = categoryService.findById(id);
            return new ResponseEntity<>(categoryEntity, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> findAll() {
        List<CategoryEntity> categoryEntityList = categoryService.findAll();
        return new ResponseEntity<>(categoryEntityList, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<CategoryEntity> update(@RequestBody CategoryDTO categoryDTO) {
        try {
            CategoryEntity categoryEntity = categoryService.update(categoryDTO);
            return new ResponseEntity<>(categoryEntity, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            categoryService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
