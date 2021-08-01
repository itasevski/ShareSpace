package mk.ukim.finki.sharespace.repository;

import mk.ukim.finki.sharespace.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, String> {
}
