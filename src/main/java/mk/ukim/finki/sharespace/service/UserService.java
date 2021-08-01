package mk.ukim.finki.sharespace.service;

import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {

    Optional<User> create(UserDto userDto);

    User findById(String id);

    Optional<User> update(String id, UserDto userDto);

    void delete(String id);

}
