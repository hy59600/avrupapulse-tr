package de.avrupapulse.backend;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class AuthorService {

    private final AuthorRepository repository;

    public AuthorService(AuthorRepository repository) {
        this.repository = repository;
    }

    public List<Author> getPublishedAuthors() {
        return repository.findByStatus(ArticleStatus.PUBLISHED);
    }

    public List<Author> getDraftAuthors() {
        return repository.findByStatus(ArticleStatus.DRAFT);
    }

    public Author getPublishedAuthor(String id) {
        Author author = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Author not found"));

        if (author.getStatus() != ArticleStatus.PUBLISHED) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Author not found");
        }

        return author;
    }

    public Author createAuthor(CreateAuthorRequest request) {
        Author author = new Author();
        author.setId(UUID.randomUUID().toString());
        author.setStatus(ArticleStatus.DRAFT);
        author.setCreatedAt(Instant.now());
        applyAuthorData(author, request);
        return repository.save(author);
    }

    public Author updateDraftAuthor(String id, CreateAuthorRequest request) {
        Author author = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Author not found"));

        if (author.getStatus() != ArticleStatus.DRAFT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only draft authors can be updated");
        }

        applyAuthorData(author, request);
        return repository.save(author);
    }

    public void deleteDraftAuthor(String id) {
        Author author = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Author not found"));

        if (author.getStatus() != ArticleStatus.DRAFT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only draft authors can be deleted");
        }

        repository.delete(author);
    }

    public Author publishAuthor(String id) {
        Author author = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Author not found"));

        author.setStatus(ArticleStatus.PUBLISHED);
        return repository.save(author);
    }

    private void applyAuthorData(Author author, CreateAuthorRequest request) {
        author.setName(request.getName());
        author.setTitleTr(request.getTitleTr());
        author.setTitleDe(request.getTitleDe());
        author.setExpertiseTr(request.getExpertiseTr());
        author.setExpertiseDe(request.getExpertiseDe());
        author.setBioTr(request.getBioTr());
        author.setBioDe(request.getBioDe());
    }
}
