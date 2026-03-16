package de.avrupapulse.backend;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class ArticleController {

    private final ArticleService service;

    public ArticleController(ArticleService service) {
        this.service = service;
    }

    @GetMapping("/api/articles")
    public List<Article> getArticles() {
        return service.getAllArticles();
    }

    @PostMapping("/api/articles")
    public Article createArticle(@Valid @RequestBody CreateArticleRequest request) {
        return service.createArticle(request);
    }
}