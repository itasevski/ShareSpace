package mk.ukim.finki.sharespace.service.implementation;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Destination;
import mk.ukim.finki.sharespace.model.dto.DestinationDto;
import mk.ukim.finki.sharespace.model.exception.DestinationNotFoundException;
import mk.ukim.finki.sharespace.repository.DestinationRepository;
import mk.ukim.finki.sharespace.service.DestinationService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class DestinationServiceImplementation implements DestinationService {

    private final DestinationRepository destinationRepository;

    @Override
    public Optional<Destination> create(DestinationDto destinationDto) {
        Destination destination = new Destination(destinationDto.getName(), destinationDto.getMunicipality(), destinationDto.getCity(), destinationDto.getLatitude(), destinationDto.getLongitude());

        return Optional.of(this.destinationRepository.save(destination));
    }

    @Override
    public Destination findById(String id) {
        return this.destinationRepository.findById(id)
                .orElseThrow(() -> new DestinationNotFoundException("Destination with id " + id + " doesn't exist."));
    }

    @Override
    public Optional<Destination> update(String id, DestinationDto destinationDto) {
        Destination destination = findById(id);

        destination.setName(destination.getName());
        destination.setMunicipality(destination.getMunicipality());
        destination.setCity(destination.getCity());
        destination.setLatitude(destination.getLatitude());
        destination.setLongitude(destination.getLongitude());

        return Optional.of(this.destinationRepository.save(destination));
    }

    @Override
    public void delete(String id) {
        if(this.destinationRepository.existsById(id)) this.destinationRepository.deleteById(id);
        else throw new DestinationNotFoundException("Destination with id " + id + " doesn't exist.");
    }

}
