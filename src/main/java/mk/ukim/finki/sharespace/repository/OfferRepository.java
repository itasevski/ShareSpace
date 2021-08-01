package mk.ukim.finki.sharespace.repository;

import mk.ukim.finki.sharespace.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends JpaRepository<Offer, String> {
}
