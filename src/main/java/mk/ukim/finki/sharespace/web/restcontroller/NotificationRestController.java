package mk.ukim.finki.sharespace.web.restcontroller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Notification;
import mk.ukim.finki.sharespace.model.dto.NotificationDto;
import mk.ukim.finki.sharespace.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/find-id/{id}")
    public ResponseEntity<Notification> findById(@PathVariable String id) {
        Notification notification = this.notificationService.findById(id);
        return ResponseEntity.ok(notification);
    }

    @GetMapping("/find-recipientid/{id}")
    public List<Notification> findByRecipientId(@PathVariable String id) {
        return this.notificationService.findByRecipientId(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Notification> update(@PathVariable String id, @RequestBody NotificationDto notificationDto) {
        return this.notificationService.update(id, notificationDto)
                .map(notification -> ResponseEntity.ok().body(notification))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<String> deleteByRecipientId(@PathVariable String id) {
        this.notificationService.deleteByRecipientId(id);
        return ResponseEntity.ok("Successfully deleted notification.");
    }

}
