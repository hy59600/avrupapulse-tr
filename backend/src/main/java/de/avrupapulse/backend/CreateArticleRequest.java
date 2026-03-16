package de.avrupapulse.backend;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateArticleRequest {

    @NotBlank
    @Size(max = 180)
    private String titleTr;

    @NotBlank
    private String summaryTr;

    @NotBlank
    private String sourceName;

    @NotBlank
    private String sourceUrl;

    @NotBlank
    private String status;

    public String getTitleTr() {
        return titleTr;
    }

    public void setTitleTr(String titleTr) {
        this.titleTr = titleTr;
    }

    public String getSummaryTr() {
        return summaryTr;
    }

    public void setSummaryTr(String summaryTr) {
        this.summaryTr = summaryTr;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}