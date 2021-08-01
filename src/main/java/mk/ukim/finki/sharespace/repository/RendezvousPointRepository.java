package mk.ukim.finki.sharespace.repository;

import mk.ukim.finki.sharespace.model.RendezvousPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RendezvousPointRepository extends JpaRepository<RendezvousPoint, String> {
}
