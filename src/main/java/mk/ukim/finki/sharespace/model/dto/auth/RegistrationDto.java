package mk.ukim.finki.sharespace.model.dto.auth;

import lombok.Data;

@Data
public class RegistrationDto {

    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
    private String confirmPassword;
    private String userType;

}
