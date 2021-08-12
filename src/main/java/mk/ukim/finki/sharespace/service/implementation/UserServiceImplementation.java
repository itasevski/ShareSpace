package mk.ukim.finki.sharespace.service.implementation;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Driver;
import mk.ukim.finki.sharespace.model.Passenger;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.UserDto;
import mk.ukim.finki.sharespace.model.enumeration.Role;
import mk.ukim.finki.sharespace.model.enumeration.Type;
import mk.ukim.finki.sharespace.model.exception.UserNotFoundException;
import mk.ukim.finki.sharespace.repository.UserRepository;
import mk.ukim.finki.sharespace.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(s)
                .orElseThrow(() -> new UserNotFoundException("User with username " + s + " doesn't exist."));
    }

    @Override
    public Optional<User> create(UserDto userDto) {
        User user = null;
        if(userDto.getType() == Type.DRIVER) {
            user = new Driver(userDto.getVehicleModel(), Role.ROLE_USER, Type.DRIVER, "testusername", "testpass", userDto.getFirstName(), userDto.getLastName(),
                    userDto.getPhoneNumber(), "testemail", userDto.getFacebookLink(), userDto.getTwitterLink(), userDto.getInstagramLink(), userDto.getBio());
        }
        else {
            user = new Passenger(Role.ROLE_USER, Type.PASSENGER, "testusername", "testpass", userDto.getFirstName(), userDto.getLastName(),
                    userDto.getPhoneNumber(), "testemail", userDto.getFacebookLink(), userDto.getTwitterLink(), userDto.getInstagramLink(), userDto.getBio());
        }

        return Optional.of(this.userRepository.save(user));
    }

    @Override
    public User findById(String id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " doesn't exist."));
    }

    @Override
    public User findByUsername(String username) {
        return this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " doesn't exist."));
    }

    @Override
    public Optional<User> update(String id, UserDto userDto) {
        User user = findById(id);

        if (userDto.getType() == Type.DRIVER) {
            ((Driver) user).setVehicleModel(userDto.getVehicleModel());
        }
        user.setFirstName(userDto.getFirstName());
        user.setLastName(user.getLastName());
        user.setBio(userDto.getBio());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setFacebookLink(userDto.getFacebookLink());
        user.setTwitterLink(userDto.getTwitterLink());
        user.setInstagramLink(userDto.getInstagramLink());

        return Optional.of(this.userRepository.save(user));
    }

    @Override
    public void delete(String id) {
        if(this.userRepository.existsById(id)) this.userRepository.deleteById(id);
        else throw new UserNotFoundException("User with id " + id + " doesn't exist.");
    }

}
