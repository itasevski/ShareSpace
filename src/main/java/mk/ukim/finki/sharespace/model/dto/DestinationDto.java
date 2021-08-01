package mk.ukim.finki.sharespace.model.dto;

import lombok.Data;

@Data
public class DestinationDto {

    private String name;
    private String municipality;
    private String city;
    private double latitude;
    private double longitude;

}
