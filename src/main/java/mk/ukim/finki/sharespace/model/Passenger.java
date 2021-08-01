package mk.ukim.finki.sharespace.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.enumeration.Role;

import javax.persistence.Entity;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Passenger extends User {

    public Passenger() {}

    public Passenger(Role role, String username, String password, String firstName, String lastName, String phoneNumber, String email,
                String facebookLink, String twitterLink, String instagramLink, String bio) {
        super(role, username, password, firstName, lastName, phoneNumber, email, facebookLink, twitterLink, instagramLink, bio);
    }

}
