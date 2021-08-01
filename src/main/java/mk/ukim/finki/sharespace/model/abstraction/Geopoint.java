package mk.ukim.finki.sharespace.model.abstraction;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.MappedSuperclass;

@Data
@MappedSuperclass
@EqualsAndHashCode(callSuper = true)
public abstract class Geopoint extends BaseEntity {

    private String name;
    private String municipality;
    private String city;
    private double latitude;
    private double longitude;

    public Geopoint() {}

    public Geopoint(String name, String municipality, String city, double latitude, double longitude) {
        this.name = name;
        this.municipality = municipality;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
    }

}
