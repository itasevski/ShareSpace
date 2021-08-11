package mk.ukim.finki.sharespace.model.dto;

import lombok.Data;
import mk.ukim.finki.sharespace.model.enumeration.Type;

@Data
public class UserDto {

    private Type type;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String facebookLink;
    private String twitterLink;
    private String instagramLink;
    private String bio;

    private String vehicleModel;

    public UserDto() {}

}
