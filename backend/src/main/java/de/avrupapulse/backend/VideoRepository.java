package de.avrupapulse.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, String> {
    List<Video> findByStatus(ArticleStatus status);
}
