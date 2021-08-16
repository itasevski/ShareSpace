package mk.ukim.finki.sharespace.repository;

import mk.ukim.finki.sharespace.model.Offer;
import mk.ukim.finki.sharespace.model.enumeration.OfferType;
import mk.ukim.finki.sharespace.model.enumeration.TransportVehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, String> {

    List<Offer> findByPersonLimitOrStartDateContaining(int personLimit, String startDate);

    List<Offer> findByCreatorFullNameContainingIgnoreCaseOrCityContainingIgnoreCaseOrMunicipalityContainingIgnoreCaseOrStartDateContainingOrRendezvousPointsIgnoreCaseOrDestinationContainingIgnoreCaseOrTransportVehicle(String creatorName, String city, String municipality, String startDate, String rendezvousPoint, String destination, TransportVehicle transportVehicle);

    List<Offer> findByCreatorFullNameContainingIgnoreCaseOrCityContainingIgnoreCaseOrMunicipalityContainingIgnoreCaseOrStartDateContainingOrRendezvousPointsIgnoreCaseOrDestinationContainingIgnoreCase(String creatorName, String city, String municipality, String startDate, String rendezvousPoint, String destination);

}
