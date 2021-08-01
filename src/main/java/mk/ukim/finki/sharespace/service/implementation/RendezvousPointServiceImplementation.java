package mk.ukim.finki.sharespace.service.implementation;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.RendezvousPoint;
import mk.ukim.finki.sharespace.model.dto.RendezvousPointDto;
import mk.ukim.finki.sharespace.model.exception.RendezvousPointNotFoundException;
import mk.ukim.finki.sharespace.repository.RendezvousPointRepository;
import mk.ukim.finki.sharespace.service.RendezvousPointService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RendezvousPointServiceImplementation implements RendezvousPointService {

    private final RendezvousPointRepository rendezvousPointRepository;

    @Override
    public Optional<RendezvousPoint> create(RendezvousPointDto rendezvousPointDto) {
        RendezvousPoint rendezvousPoint = new RendezvousPoint(rendezvousPointDto.getName(), rendezvousPointDto.getMunicipality(), rendezvousPointDto.getCity(), rendezvousPointDto.getLatitude(), rendezvousPointDto.getLongitude());

        return Optional.of(this.rendezvousPointRepository.save(rendezvousPoint));
    }

    @Override
    public RendezvousPoint findById(String id) {
        return this.rendezvousPointRepository.findById(id)
                .orElseThrow(() -> new RendezvousPointNotFoundException("Rendezvous point with id " + id + " doesn't exist."));
    }

    @Override
    public Optional<RendezvousPoint> update(String id, RendezvousPointDto rendezvousPointDto) {
        RendezvousPoint rendezvousPoint = findById(id);

        rendezvousPoint.setName(rendezvousPoint.getName());
        rendezvousPoint.setMunicipality(rendezvousPoint.getMunicipality());
        rendezvousPoint.setCity(rendezvousPoint.getCity());
        rendezvousPoint.setLatitude(rendezvousPointDto.getLatitude());
        rendezvousPoint.setLongitude(rendezvousPoint.getLongitude());

        return Optional.of(this.rendezvousPointRepository.save(rendezvousPoint));
    }

    @Override
    public void delete(String id) {
        if(this.rendezvousPointRepository.existsById(id)) this.rendezvousPointRepository.deleteById(id);
        else throw new RendezvousPointNotFoundException("Rendezvous point with id " + id + " not found.");
    }

}
