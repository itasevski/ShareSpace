package mk.ukim.finki.sharespace.service;

import mk.ukim.finki.sharespace.model.RendezvousPoint;
import mk.ukim.finki.sharespace.model.dto.RendezvousPointDto;

import java.util.Optional;

public interface RendezvousPointService {

    Optional<RendezvousPoint> create(RendezvousPointDto rendezvousPointDto);

    RendezvousPoint findById(String id);

    Optional<RendezvousPoint> update(String id, RendezvousPointDto rendezvousPointDto);

    void delete(String id);

}
