package de.avrupapulse.backend;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class ArticleService {

    private final ArticleRepository repository;

    public ArticleService(ArticleRepository repository) {
        this.repository = repository;
    }

    public List<Article> getAllArticles() {
        return repository.findAll();
    }

    public Article createArticle(CreateArticleRequest request) {
        Article article = new Article();

        article.setId(UUID.randomUUID().toString());
        article.setTitleTr(request.getTitleTr());
        article.setSummaryTr(request.getSummaryTr());
        article.setSourceName(request.getSourceName());
        article.setSourceUrl(request.getSourceUrl());
        article.setStatus(ArticleStatus.DRAFT);
        article.setCreatedAt(Instant.now());

        return repository.save(article);
    }

    public Article publishArticle(String id) {
        Article article = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        article.setStatus(ArticleStatus.PUBLISHED);
        return repository.save(article);
    }

    public List<Article> getPublishedArticles() {
        return repository.findByStatus(ArticleStatus.PUBLISHED);
    }
}
