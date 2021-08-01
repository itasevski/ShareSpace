package mk.ukim.finki.sharespace.service.implementation;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Destination;
import mk.ukim.finki.sharespace.model.Offer;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.OfferDto;
import mk.ukim.finki.sharespace.model.exception.OfferNotFoundException;
import mk.ukim.finki.sharespace.repository.OfferRepository;
import mk.ukim.finki.sharespace.service.DestinationService;
import mk.ukim.finki.sharespace.service.OfferService;
import mk.ukim.finki.sharespace.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class OfferServiceImplementation implements OfferService {

    private final OfferRepository offerRepository;
    private final UserService userService;
    private final DestinationService destinationService;

    @Override
    public Optional<Offer> create(OfferDto offerDto) {
        User user = this.userService.findById(offerDto.getCreatorId());
        Destination destination = this.destinationService.findById(offerDto.getDestinationId());
        Offer offer = new Offer(offerDto.getOfferType(), offerDto.getTransportVehicle(), offerDto.getStartDate(), offerDto.getPersonLimit(), user, destination);

        return Optional.of(this.offerRepository.save(offer));
    }

    @Override
    public Offer findById(String id) {
        return this.offerRepository.findById(id)
                .orElseThrow(() -> new OfferNotFoundException("Offer with id " + id + " doesn't exist."));
    }

    @Override
    public Optional<Offer> update(String id, OfferDto offerDto) {
        Offer offer = findById(id);
        User user = this.userService.findById(offerDto.getCreatorId());
        Destination destination = this.destinationService.findById(offerDto.getDestinationId());

        offer.setOfferType(offerDto.getOfferType());
        offer.setTransportVehicle(offerDto.getTransportVehicle());
        offer.setStartDate(offerDto.getStartDate());
        offer.setPersonLimit(offerDto.getPersonLimit());
        offer.setCreator(user);
        offer.setDestination(destination);

        return Optional.of(this.offerRepository.save(offer));
    }

    @Override
    public void delete(String id) {
        if(this.offerRepository.existsById(id)) this.offerRepository.deleteById(id);
        else throw new OfferNotFoundException("Offer with id " + id + " doesn't exist.");
    }

}
