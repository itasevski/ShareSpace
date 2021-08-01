package mk.ukim.finki.sharespace.web.restcontroller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Notification;
import mk.ukim.finki.sharespace.model.dto.NotificationDto;
import mk.ukim.finki.sharespace.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationRestController {

    private final NotificationService notificationService;

    @PostMapping("/create")
    public ResponseEntity<Notification> create(@RequestBody NotificationDto notificationDto) {
        return this.notificationService.create(notificationDto)
                .map(notification -> ResponseEntity.ok().body(notification))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Notification> findById(@PathVariable String id) {
        Notification notification = this.notificationService.findById(id);
        return ResponseEntity.ok(notification);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Notification> update(@PathVariable String id, @RequestBody NotificationDto notificationDto) {
        return this.notificationService.update(id, notificationDto)
                .map(notification -> ResponseEntity.ok().body(notification))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        this.notificationService.delete(id);
        return ResponseEntity.ok("Successfully deleted notification with id " + id);
    }

}
