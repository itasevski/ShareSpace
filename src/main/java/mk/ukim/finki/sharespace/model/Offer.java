package mk.ukim.finki.sharespace.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mk.ukim.finki.sharespace.ShareSpaceApplication;
import mk.ukim.finki.sharespace.model.abstraction.BaseEntity;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.enumeration.OfferType;
import mk.ukim.finki.sharespace.model.enumeration.TransportVehicle;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "sharespace_offer")
@EqualsAndHashCode(callSuper = true)
public class Offer extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private OfferType offerType;

    @Enumerated(EnumType.STRING)
    private TransportVehicle transportVehicle;

    private String publishedAt;
    private String startDate;
    private String expirationDate;

    private String city;
    private String municipality;

    private int personLimit;

    @ManyToOne
    private User creator;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "sharespace_offer_participants",
            joinColumns = @JoinColumn(name = "offer_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> participants = new ArrayList<>();

    private String destination;

    @ElementCollection
    @CollectionTable(name="sharespace_offer_rendezvouspoints", joinColumns=@JoinColumn(name="offer_id"))
    @Column(name="rendezvous_point")
    private List<String> rendezvousPoints;

    public Offer() {}

    public Offer(OfferType offerType, TransportVehicle transportVehicle, String startDate, String city, String municipality, int personLimit, User creator, String destination, List<String> rendezvousPoints) {
        this.offerType = offerType;
        this.transportVehicle = transportVehicle;
        this.city = city;
        this.municipality = municipality;
        this.personLimit = personLimit;
        this.creator = creator;
        this.destination = destination;
        this.rendezvousPoints = rendezvousPoints;

        LocalDateTime now = LocalDateTime.now();
        this.publishedAt = now.format(ShareSpaceApplication.formatter);

        LocalDateTime startDateTime = LocalDateTime.parse(startDate, ShareSpaceApplication.formatter);
        this.startDate = startDateTime.format(ShareSpaceApplication.formatter);

        LocalDateTime expirationDateTime = LocalDateTime.parse(startDate, ShareSpaceApplication.formatter).minusMinutes(30);
        this.expirationDate = expirationDateTime.format(ShareSpaceApplication.formatter);
    }

}
