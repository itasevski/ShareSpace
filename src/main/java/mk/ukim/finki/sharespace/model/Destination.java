package mk.ukim.finki.sharespace.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mk.ukim.finki.sharespace.model.abstraction.Geopoint;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "sharespace_destination")
public class Destination extends Geopoint {

    public Destination() {}

    public Destination(String name, String municipality, String city, double latitude, double longitude) {
        super(name, municipality, city, latitude, longitude);
    }

}
