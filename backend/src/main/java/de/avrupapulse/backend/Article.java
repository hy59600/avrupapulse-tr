package de.avrupapulse.backend;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import java.time.Instant;
import java.util.UUID;

@Entity
public class Article {

    @Id
    private UUID id;
    @Enumerated(EnumType.STRING)
    private ArticleStatus status;
    private String titleTr;
    private String summaryTr;
    private String sourceName;
    private String sourceUrl;
   // private String status;
    private Instant createdAt;


    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTitleTr() { return titleTr; }
    public void setTitleTr(String titleTr) { this.titleTr = titleTr; }

    public String getSummaryTr() { return summaryTr; }
    public void setSummaryTr(String summaryTr) { this.summaryTr = summaryTr; }

    public String getSourceName() { return sourceName; }
    public void setSourceName(String sourceName) { this.sourceName = sourceName; }

    public String getSourceUrl() { return sourceUrl; }
    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }

    public ArticleStatus getStatus() { return status; }
    public void setStatus(String status) { this.status = ArticleStatus.valueOf(status); }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}