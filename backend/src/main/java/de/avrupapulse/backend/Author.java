package de.avrupapulse.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

import java.time.Instant;

@Entity
public class Author {

    @Id
    private String id;

    @Enumerated(EnumType.STRING)
    private ArticleStatus status;

    private String name;
    private String titleTr;
    private String titleDe;
    private String expertiseTr;
    private String expertiseDe;
    private String bioTr;
    private String bioDe;
    private Instant createdAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public ArticleStatus getStatus() { return status; }
    public void setStatus(ArticleStatus status) { this.status = status; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTitleTr() { return titleTr; }
    public void setTitleTr(String titleTr) { this.titleTr = titleTr; }

    public String getTitleDe() { return titleDe; }
    public void setTitleDe(String titleDe) { this.titleDe = titleDe; }

    public String getExpertiseTr() { return expertiseTr; }
    public void setExpertiseTr(String expertiseTr) { this.expertiseTr = expertiseTr; }

    public String getExpertiseDe() { return expertiseDe; }
    public void setExpertiseDe(String expertiseDe) { this.expertiseDe = expertiseDe; }

    public String getBioTr() { return bioTr; }
    public void setBioTr(String bioTr) { this.bioTr = bioTr; }

    public String getBioDe() { return bioDe; }
    public void setBioDe(String bioDe) { this.bioDe = bioDe; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
