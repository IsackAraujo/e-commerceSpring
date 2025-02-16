package br.edu.utfpr.pb.pw44s.server.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PaginationUtils {

    public static Pageable createPageable(Integer page, Integer size, String sort) {
        if (sort == null || sort.isEmpty()) {
            sort = "id";
        }

        return (page != null && size != null)
                ? PageRequest.of(page, size, Sort.by(sort))
                : null;
    }

}
