package mk.ukim.finki.sharespace.service;

import mk.ukim.finki.sharespace.model.Offer;
import mk.ukim.finki.sharespace.model.dto.OfferDto;
import mk.ukim.finki.sharespace.model.dto.SortDto;

import java.util.List;
import java.util.Optional;

public interface OfferService {

    List<Offer> getAll();

    List<Offer> getBySortCriteria(SortDto sortDto);

    List<Offer> getByQueryString(String queryString);

    Optional<Offer> create(OfferDto offerDto);

    Offer findById(String id);

    Optional<Offer> update(String id, OfferDto offerDto);

    void delete(String id);

}
