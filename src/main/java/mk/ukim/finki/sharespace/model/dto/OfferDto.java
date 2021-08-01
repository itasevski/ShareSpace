package mk.ukim.finki.sharespace.model.dto;

import lombok.Data;
import mk.ukim.finki.sharespace.model.enumeration.OfferType;
import mk.ukim.finki.sharespace.model.enumeration.TransportVehicle;

@Data
public class OfferDto {

    private OfferType offerType;
    private TransportVehicle transportVehicle;
    private String startDate;
    private int personLimit;
    private String creatorId;
    private String destinationId;

}
