package mk.ukim.finki.sharespace.service;

import mk.ukim.finki.sharespace.model.Destination;
import mk.ukim.finki.sharespace.model.dto.DestinationDto;

import java.util.Optional;

public interface DestinationService {

    Optional<Destination> create(DestinationDto destinationDto);

    Destination findById(String id);

    Optional<Destination> update(String id, DestinationDto destinationDto);

    void delete(String id);

}
