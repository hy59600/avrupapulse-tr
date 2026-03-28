package de.avrupapulse.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author, String> {
    List<Author> findByStatus(ArticleStatus status);
}
