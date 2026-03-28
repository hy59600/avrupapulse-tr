package de.avrupapulse.backend;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateVideoRequest {

    @NotBlank
    @Size(max = 180)
    private String titleTr;

    @Size(max = 180)
    private String titleDe;

    @NotBlank
    private String summaryTr;

    private String summaryDe;

    @NotBlank
    private String sourceName;

    @NotBlank
    private String sourceUrl;

    @NotBlank
    private String videoUrl;

    @NotNull
    private VideoCategory category;

    public String getTitleTr() {
        return titleTr;
    }

    public void setTitleTr(String titleTr) {
        this.titleTr = titleTr;
    }

    public String getTitleDe() {
        return titleDe;
    }

    public void setTitleDe(String titleDe) {
        this.titleDe = titleDe;
    }

    public String getSummaryTr() {
        return summaryTr;
    }

    public void setSummaryTr(String summaryTr) {
        this.summaryTr = summaryTr;
    }

    public String getSummaryDe() {
        return summaryDe;
    }

    public void setSummaryDe(String summaryDe) {
        this.summaryDe = summaryDe;
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

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public VideoCategory getCategory() {
        return category;
    }

    public void setCategory(VideoCategory category) {
        this.category = category;
    }
}
