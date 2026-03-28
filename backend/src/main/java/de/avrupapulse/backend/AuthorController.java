package de.avrupapulse.backend;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorService service;

    public AuthorController(AuthorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Author> getAuthors() {
        return service.getPublishedAuthors();
    }

    @GetMapping("/drafts")
    public List<Author> getDraftAuthors() {
        return service.getDraftAuthors();
    }

    @GetMapping("/{id}")
    public Author getAuthor(@PathVariable String id) {
        return service.getPublishedAuthor(id);
    }

    @PostMapping
    public Author createAuthor(@Valid @RequestBody CreateAuthorRequest request) {
        return service.createAuthor(request);
    }

    @PutMapping("/{id}")
    public Author updateAuthor(@PathVariable String id, @Valid @RequestBody CreateAuthorRequest request) {
        return service.updateDraftAuthor(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable String id) {
        service.deleteDraftAuthor(id);
    }

    @PostMapping("/{id}/publish")
    public Author publishAuthor(@PathVariable String id) {
        return service.publishAuthor(id);
    }
}
