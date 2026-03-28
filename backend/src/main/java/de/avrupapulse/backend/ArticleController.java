package de.avrupapulse.backend;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService service;

    public ArticleController(ArticleService service) {
        this.service = service;
    }

    @GetMapping
    public List<Article> getArticles() {
        return service.getPublishedArticles();
    }

    @GetMapping("/drafts")
    public List<Article> getDraftArticles() {
        return service.getDraftArticles();
    }

    @GetMapping("/{id}")
    public Article getArticle(@PathVariable String id) {
        return service.getPublishedArticle(id);
    }

    @PostMapping
    public Article createArticle(@Valid @RequestBody CreateArticleRequest request) {
        return service.createArticle(request);
    }

    @PutMapping("/{id}")
    public Article updateArticle(@PathVariable String id, @Valid @RequestBody CreateArticleRequest request) {
        return service.updateDraftArticle(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteArticle(@PathVariable String id) {
        service.deleteDraftArticle(id);
    }

    @PostMapping("/{id}/publish")
    public Article publishArticle(@PathVariable String id) {
        return service.publishArticle(id);
    }
}
