package mk.ukim.finki.sharespace.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mk.ukim.finki.sharespace.model.abstraction.BaseEntity;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.enumeration.OfferType;
import mk.ukim.finki.sharespace.model.enumeration.TransportVehicle;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Data
@Entity
@Table(name = "sharespace_offer")
@EqualsAndHashCode(callSuper = true)
public class Offer extends BaseEntity {

    @Transient
    private DateTimeFormatter dateTimeFormatter;

    @Enumerated(EnumType.STRING)
    private OfferType offerType;

    @Enumerated(EnumType.STRING)
    private TransportVehicle transportVehicle;

    private String publishedAt;
    private String startDate;
    private String expirationDate;

    private int personLimit;

    @ManyToOne
    private User creator;

    @ManyToMany
    @JoinTable(
            name = "sharespace_offer_participants",
            joinColumns = @JoinColumn(name = "offer_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> participants;

    @ManyToOne
    private Destination destination;

    @ManyToMany
    @JoinTable(
            name = "sharespace_offer_rendezvouspoints",
            joinColumns = @JoinColumn(name = "offer_id"),
            inverseJoinColumns = @JoinColumn(name = "rendezvouspoint_id"))
    private List<RendezvousPoint> rendezvousPoints;

    public Offer() {}

    public Offer(OfferType offerType, TransportVehicle transportVehicle, String startDate, int personLimit, User creator, Destination destination) {
        this.offerType = offerType;
        this.transportVehicle = transportVehicle;
        this.personLimit = personLimit;
        this.creator = creator;
        this.destination = destination;

        LocalDateTime now = LocalDateTime.now();
        this.publishedAt = now.format(this.dateTimeFormatter);

        LocalDateTime startDateTime = LocalDateTime.parse(startDate, this.dateTimeFormatter);
        this.startDate = startDateTime.format(this.dateTimeFormatter);

        LocalDateTime expirationDateTime = LocalDateTime.parse(startDate, this.dateTimeFormatter).minusMinutes(30);
        this.expirationDate = expirationDateTime.format(this.dateTimeFormatter);
    }

}
