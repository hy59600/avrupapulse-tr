package de.avrupapulse.backend;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateAuthorRequest {

    @NotBlank
    @Size(max = 140)
    private String name;

    @NotBlank
    @Size(max = 180)
    private String titleTr;

    @Size(max = 180)
    private String titleDe;

    @NotBlank
    private String expertiseTr;

    private String expertiseDe;

    @NotBlank
    private String bioTr;

    private String bioDe;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

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

    public String getExpertiseTr() {
        return expertiseTr;
    }

    public void setExpertiseTr(String expertiseTr) {
        this.expertiseTr = expertiseTr;
    }

    public String getExpertiseDe() {
        return expertiseDe;
    }

    public void setExpertiseDe(String expertiseDe) {
        this.expertiseDe = expertiseDe;
    }

    public String getBioTr() {
        return bioTr;
    }

    public void setBioTr(String bioTr) {
        this.bioTr = bioTr;
    }

    public String getBioDe() {
        return bioDe;
    }

    public void setBioDe(String bioDe) {
        this.bioDe = bioDe;
    }
}
