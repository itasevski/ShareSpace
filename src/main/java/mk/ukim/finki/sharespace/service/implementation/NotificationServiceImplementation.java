package mk.ukim.finki.sharespace.service.implementation;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Notification;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.NotificationDto;
import mk.ukim.finki.sharespace.model.exception.NotificationNotFoundException;
import mk.ukim.finki.sharespace.repository.NotificationRepository;
import mk.ukim.finki.sharespace.service.NotificationService;
import mk.ukim.finki.sharespace.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class NotificationServiceImplementation implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserService userService;

    @Override
    public Optional<Notification> create(NotificationDto notificationDto) {
        User user = this.userService.findById(notificationDto.getRecipientId());

        Notification notification = new Notification(notificationDto.getType(), notificationDto.getDescription(), user);

        return Optional.of(this.notificationRepository.save(notification));
    }

    @Override
    public Notification findById(String id) {
        return this.notificationRepository.findById(id)
                .orElseThrow(() -> new NotificationNotFoundException("Notification with id " + id + " doesn't exist"));
    }

    @Override
    public Optional<Notification> update(String id, NotificationDto notificationDto) {
        Notification notification = findById(id);
        User user = this.userService.findById(notificationDto.getRecipientId());

        notification.setType(notificationDto.getType());
        notification.setDescription(notificationDto.getDescription());
        notification.setRecipient(user);

        return Optional.of(this.notificationRepository.save(notification));
    }

    @Override
    public void delete(String id) {
        if(this.notificationRepository.existsById(id)) this.notificationRepository.deleteById(id);
        else throw new NotificationNotFoundException("Notification with id " + id + " doesn't exist");
    }

}
