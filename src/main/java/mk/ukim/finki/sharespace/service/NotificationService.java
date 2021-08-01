package mk.ukim.finki.sharespace.service;

import mk.ukim.finki.sharespace.model.Notification;
import mk.ukim.finki.sharespace.model.dto.NotificationDto;

import java.util.Optional;

public interface NotificationService {

    Optional<Notification> create(NotificationDto notificationDto);

    Notification findById(String id);

    Optional<Notification> update(String id, NotificationDto notificationDto);

    void delete(String id);

}
