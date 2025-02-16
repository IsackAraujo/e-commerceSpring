package br.edu.utfpr.pb.pw44s.server.services;

import br.edu.utfpr.pb.pw44s.server.dto.CategoryDTO;
import br.edu.utfpr.pb.pw44s.server.entity.CategoryEntity;
import br.edu.utfpr.pb.pw44s.server.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryEntity findById(Long id) {
        return getCategoryEntityById(id);
    }

    public List<CategoryEntity> findAll() {
        return categoryRepository.findAll();
    }

    public CategoryEntity create(CategoryDTO categoryDTO) {
        return categoryRepository.save(CategoryEntity.builder()
                .name(categoryDTO.getName())
                .build());
    }

    public CategoryEntity update(CategoryDTO categoryDTO) {
        CategoryEntity category = getCategoryEntityById(categoryDTO.getId());
        category.setName(categoryDTO.getName());
        return categoryRepository.save(category);
    }

    public void delete(Long id) {
        CategoryEntity category = getCategoryEntityById(id);
        categoryRepository.delete(category);
    }

    private CategoryEntity getCategoryEntityById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }

}
