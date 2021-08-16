package mk.ukim.finki.sharespace.service.implementation;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Offer;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.OfferDto;
import mk.ukim.finki.sharespace.model.dto.SortDto;
import mk.ukim.finki.sharespace.model.enumeration.OfferType;
import mk.ukim.finki.sharespace.model.enumeration.TransportVehicle;
import mk.ukim.finki.sharespace.model.exception.OfferNotFoundException;
import mk.ukim.finki.sharespace.repository.OfferRepository;
import mk.ukim.finki.sharespace.service.OfferService;
import mk.ukim.finki.sharespace.service.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OfferServiceImplementation implements OfferService {

    private final OfferRepository offerRepository;
    private final UserService userService;

    @Override
    public List<Offer> getAll() {
        return this.offerRepository.findAll();
    }

    @Override
    public List<Offer> getBySortCriteria(SortDto sortDto) {
        if(sortDto.getCriteria().equals("publisher") && sortDto.isAscending()) {
            return getAll().stream().sorted(Offer.byCreatorOrIdComparatorAscending).collect(Collectors.toList());
        }
        else if(sortDto.getCriteria().equals("publisher") && !sortDto.isAscending()) {
            return getAll().stream().sorted(Offer.byCreatorOrIdComparatorDescending).collect(Collectors.toList());
        }
        else if(sortDto.getCriteria().equals("dateAndTime") && sortDto.isAscending()) {
            return getAll().stream().sorted(Offer.byDateAndTimeOrIdComparatorAscending).collect(Collectors.toList());
        }
        else if(sortDto.getCriteria().equals("dateAndTime") && !sortDto.isAscending()) {
            return getAll().stream().sorted(Offer.byDateAndTimeOrIdComparatorDescending).collect(Collectors.toList());
        }
        else if(sortDto.getCriteria().equals("personLimit") && sortDto.isAscending()) {
            return getAll().stream().sorted(Offer.byPersonLimitOrIdComparatorAscending).collect(Collectors.toList());
        }
        else if(sortDto.getCriteria().equals("personLimit") && !sortDto.isAscending()) {
            return getAll().stream().sorted(Offer.byPersonLimitOrIdComparatorDescending).collect(Collectors.toList());
        }
        else if(sortDto.getCriteria().equals("destination") && sortDto.isAscending()) {
            return getAll().stream().sorted(Offer.byDestinationOrIdComparatorAscending).collect(Collectors.toList());
        }
        else {
            return getAll().stream().sorted(Offer.byDestinationOrIdComparatorDescending).collect(Collectors.toList());
        }
    }

    @Override
    public List<Offer> getByQueryString(String queryString) {
        try {
            int queryInteger = Integer.parseInt(queryString);
            return this.offerRepository.findByPersonLimitOrStartDateContaining(queryInteger, queryString);
        }
        catch (NumberFormatException ignored) {

        }

        if(queryString.equalsIgnoreCase("taxi") || queryString.equalsIgnoreCase("bus") ||
                queryString.equalsIgnoreCase("ferry") || queryString.equalsIgnoreCase("subway")) {
            ArrayList<Offer> list = (ArrayList<Offer>) this.offerRepository.findByCreatorFullNameContainingIgnoreCaseOrCityContainingIgnoreCaseOrMunicipalityContainingIgnoreCaseOrStartDateContainingOrRendezvousPointsIgnoreCaseOrDestinationContainingIgnoreCaseOrTransportVehicle
                    (queryString, queryString, queryString, queryString, queryString, queryString, TransportVehicle.valueOf(queryString.toUpperCase()));
            System.out.println(list.size());
            return list;
        }

        return this.offerRepository.findByCreatorFullNameContainingIgnoreCaseOrCityContainingIgnoreCaseOrMunicipalityContainingIgnoreCaseOrStartDateContainingOrRendezvousPointsIgnoreCaseOrDestinationContainingIgnoreCase
                (queryString, queryString, queryString, queryString, queryString, queryString);
    }

    @Override
    public Optional<Offer> create(OfferDto offerDto) {
        User user = this.userService.findById(offerDto.getUserId());

        Offer offer =
                new Offer(offerDto.getType(), offerDto.getTransportationVehicle(), offerDto.getStartDate(),
                        offerDto.getCity(), offerDto.getMunicipality(), offerDto.getPersonLimit(),
                        user, offerDto.getDestination(), offerDto.getRendezvousPoints());

        offer.getParticipants().add(user);

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
        User user = this.userService.findById(offerDto.getUserId());

        offer.setOfferType(offerDto.getType());
        offer.setTransportVehicle(offerDto.getTransportationVehicle());
        offer.setStartDate(offerDto.getStartDate());
        offer.setCity(offerDto.getCity());
        offer.setMunicipality(offerDto.getMunicipality());
        offer.setPersonLimit(offerDto.getPersonLimit());
        offer.setCreator(user);
        offer.setDestination(offerDto.getDestination());
        offer.setRendezvousPoints(offerDto.getRendezvousPoints());

        return Optional.of(this.offerRepository.save(offer));
    }

    @Override
    public void delete(String id) {
        if(this.offerRepository.existsById(id)) this.offerRepository.deleteById(id);
        else throw new OfferNotFoundException("Offer with id " + id + " doesn't exist.");
    }

}
