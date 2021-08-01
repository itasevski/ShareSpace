package mk.ukim.finki.sharespace.model.dto;

import lombok.Data;
import mk.ukim.finki.sharespace.model.enumeration.NotificationType;

@Data
public class NotificationDto {

    private NotificationType type;
    private String description;
    private String recipientId;

}
