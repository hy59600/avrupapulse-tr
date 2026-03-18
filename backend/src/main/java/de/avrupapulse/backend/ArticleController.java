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

    @PostMapping
    public Article createArticle(@Valid @RequestBody CreateArticleRequest request) {
        return service.createArticle(request);
    }

    @PostMapping("/{id}/publish")
    public Article publishArticle(@PathVariable String id) {
        return service.publishArticle(id);
    }
}
