package de.avrupapulse.backend;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService service;

    public VideoController(VideoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Video> getVideos() {
        return service.getPublishedVideos();
    }

    @GetMapping("/drafts")
    public List<Video> getDraftVideos() {
        return service.getDraftVideos();
    }

    @GetMapping("/{id}")
    public Video getVideo(@PathVariable String id) {
        return service.getPublishedVideo(id);
    }

    @PostMapping
    public Video createVideo(@Valid @RequestBody CreateVideoRequest request) {
        return service.createVideo(request);
    }

    @PutMapping("/{id}")
    public Video updateVideo(@PathVariable String id, @Valid @RequestBody CreateVideoRequest request) {
        return service.updateDraftVideo(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteVideo(@PathVariable String id) {
        service.deleteDraftVideo(id);
    }

    @PostMapping("/{id}/publish")
    public Video publishVideo(@PathVariable String id) {
        return service.publishVideo(id);
    }
}
