package mk.ukim.finki.sharespace.service;

import mk.ukim.finki.sharespace.model.Offer;
import mk.ukim.finki.sharespace.model.dto.OfferDto;

import java.util.Optional;

public interface OfferService {

    Optional<Offer> create(OfferDto offerDto);

    Offer findById(String id);

    Optional<Offer> update(String id, OfferDto offerDto);

    void delete(String id);

}
