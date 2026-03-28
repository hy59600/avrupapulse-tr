package de.avrupapulse.backend;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class VideoService {

    private final VideoRepository repository;

    public VideoService(VideoRepository repository) {
        this.repository = repository;
    }

    public List<Video> getPublishedVideos() {
        return repository.findByStatus(ArticleStatus.PUBLISHED);
    }

    public List<Video> getDraftVideos() {
        return repository.findByStatus(ArticleStatus.DRAFT);
    }

    public Video getPublishedVideo(String id) {
        Video video = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found"));

        if (video.getStatus() != ArticleStatus.PUBLISHED) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found");
        }

        return video;
    }

    public Video createVideo(CreateVideoRequest request) {
        Video video = new Video();
        video.setId(UUID.randomUUID().toString());
        video.setStatus(ArticleStatus.DRAFT);
        video.setCreatedAt(Instant.now());
        applyVideoData(video, request);
        return repository.save(video);
    }

    public Video updateDraftVideo(String id, CreateVideoRequest request) {
        Video video = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found"));

        if (video.getStatus() != ArticleStatus.DRAFT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only draft videos can be updated");
        }

        applyVideoData(video, request);
        return repository.save(video);
    }

    public void deleteDraftVideo(String id) {
        Video video = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found"));

        if (video.getStatus() != ArticleStatus.DRAFT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only draft videos can be deleted");
        }

        repository.delete(video);
    }

    public Video publishVideo(String id) {
        Video video = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found"));

        video.setStatus(ArticleStatus.PUBLISHED);
        return repository.save(video);
    }

    private void applyVideoData(Video video, CreateVideoRequest request) {
        video.setTitleTr(request.getTitleTr());
        video.setTitleDe(request.getTitleDe());
        video.setSummaryTr(request.getSummaryTr());
        video.setSummaryDe(request.getSummaryDe());
        video.setSourceName(request.getSourceName());
        video.setSourceUrl(request.getSourceUrl());
        video.setVideoUrl(request.getVideoUrl());
        video.setCategory(request.getCategory());
    }
}
