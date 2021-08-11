package mk.ukim.finki.sharespace.web.restcontroller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.UserDto;
import mk.ukim.finki.sharespace.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserRestController {

    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<User> create(@RequestBody UserDto userDto) {
        return this.userService.create(userDto)
                .map(user -> ResponseEntity.ok().body(user))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<User> findById(@PathVariable String id) {
        User user = this.userService.findById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/find-username/{username}")
    public ResponseEntity<User> findByUsername(@PathVariable String username) {
        User user = this.userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> update(@PathVariable String id, @RequestBody UserDto userDto) {
        return this.userService.update(id, userDto)
                .map(user -> ResponseEntity.ok().body(user))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        this.userService.delete(id);
        return ResponseEntity.ok("Successfully deleted user with id " + id);
    }

}
