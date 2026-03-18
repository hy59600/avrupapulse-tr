package de.avrupapulse.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, String> {
    List<Article> findByStatus(ArticleStatus status);
}
