package de.avrupapulse.backend;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

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
        applyArticleData(article, request);
        article.setStatus(ArticleStatus.DRAFT);
        article.setCreatedAt(Instant.now());

        return repository.save(article);
    }

    public Article updateDraftArticle(String id, CreateArticleRequest request) {
        Article article = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));

        if (article.getStatus() != ArticleStatus.DRAFT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only draft articles can be updated");
        }

        applyArticleData(article, request);
        return repository.save(article);
    }

    public void deleteDraftArticle(String id) {
        Article article = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));

        if (article.getStatus() != ArticleStatus.DRAFT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only draft articles can be deleted");
        }

        repository.delete(article);
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

    public List<Article> getDraftArticles() {
        return repository.findByStatus(ArticleStatus.DRAFT);
    }

    public Article getPublishedArticle(String id) {
        Article article = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));

        if (article.getStatus() != ArticleStatus.PUBLISHED) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found");
        }

        return article;
    }

    private void applyArticleData(Article article, CreateArticleRequest request) {
        article.setTitleTr(request.getTitleTr());
        article.setTitleDe(request.getTitleDe());
        article.setSummaryTr(request.getSummaryTr());
        article.setSummaryDe(request.getSummaryDe());
        article.setContentTr(request.getContentTr());
        article.setContentDe(request.getContentDe());
        article.setSourceName(request.getSourceName());
        article.setSourceUrl(request.getSourceUrl());
        article.setCategory(request.getCategory());
    }
}
