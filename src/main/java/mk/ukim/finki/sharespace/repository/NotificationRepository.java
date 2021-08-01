package mk.ukim.finki.sharespace.repository;

import mk.ukim.finki.sharespace.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
}
