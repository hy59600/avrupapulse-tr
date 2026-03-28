package de.avrupapulse.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

import java.time.Instant;

@Entity
public class Video {

    @Id
    private String id;

    @Enumerated(EnumType.STRING)
    private ArticleStatus status;

    @Enumerated(EnumType.STRING)
    private VideoCategory category;

    private String titleTr;
    private String titleDe;
    private String summaryTr;
    private String summaryDe;
    private String sourceName;
    private String sourceUrl;
    private String videoUrl;
    private Instant createdAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public ArticleStatus getStatus() { return status; }
    public void setStatus(ArticleStatus status) { this.status = status; }

    public VideoCategory getCategory() { return category; }
    public void setCategory(VideoCategory category) { this.category = category; }

    public String getTitleTr() { return titleTr; }
    public void setTitleTr(String titleTr) { this.titleTr = titleTr; }

    public String getTitleDe() { return titleDe; }
    public void setTitleDe(String titleDe) { this.titleDe = titleDe; }

    public String getSummaryTr() { return summaryTr; }
    public void setSummaryTr(String summaryTr) { this.summaryTr = summaryTr; }

    public String getSummaryDe() { return summaryDe; }
    public void setSummaryDe(String summaryDe) { this.summaryDe = summaryDe; }

    public String getSourceName() { return sourceName; }
    public void setSourceName(String sourceName) { this.sourceName = sourceName; }

    public String getSourceUrl() { return sourceUrl; }
    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
