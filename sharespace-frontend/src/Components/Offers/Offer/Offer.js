import React from "react";
import {Button, Grid, TableCell, TableRow} from "@material-ui/core";
import {VerifiedUserRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {formatDistance, isBefore} from "date-fns";
import ShareSpaceService from "../../../Services/ShareSpaceService";

const Offer = (props) => {

    const reformatDate = (date) => {
        return date.substr(3,3) + date.substr(0,2) + date.substr(5);
    }

    const deleteOffer = (offerId) => {
        ShareSpaceService.deleteOffer(offerId)
            .then(
                (data) => {
                    props.onOfferExpire();
                },
                (err) => {
                    if(err.response === undefined) {
                        console.error("Offer not deleted: The ShareSpace server is down.");
                    }
                    else {
                        console.error(err.response.status + ": " + err.response.data.errorMessage);
                    }
                });
    }

    var now = new Date();
    var expirationDate = new Date(reformatDate(props.offer.expirationDate));

    var result;

    if(isBefore(expirationDate, now)) {
        deleteOffer(props.offer.id);
        return (
            <span></span>
        );
    }
    else {
        result = formatDistance(expirationDate, now, {
            addSuffix: true
        });
    }

    return (
        <TableRow>
            <TableCell scope="row">
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <Grid container>
                            <VerifiedUserRounded style={{ fontSize: "100px" }} />
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container>
                            <Typography variant="h6">{props.offer.creator.firstName} {props.offer.creator.lastName}</Typography>
                        </Grid>
                        <Typography variant="subtitle2">Published at: {props.offer.publishedAt}</Typography>
                        <Typography variant="subtitle2">Offer environment: {props.offer.city}, {props.offer.municipality}</Typography>
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell>
                {props.offer.offerType === "DRIVER_OFFER" ?
                    (
                        <Typography variant="subtitle1">Driver offer</Typography>
                    ) :
                    (
                        <Typography variant="subtitle1">Passenger offer</Typography>
                    )}
            </TableCell>
            <TableCell>
                <Typography variant="subtitle1">{props.offer.startDate}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle1">{props.offer.personLimit}</Typography>
            </TableCell>
            <TableCell>
                {props.offer.rendezvousPoints.map((rendezvousPoint) => {
                    return (
                        <Typography variant="subtitle1">{rendezvousPoint}</Typography>
                    )
                })}
            </TableCell>
            <TableCell>
                <Typography variant="subtitle1">{props.offer.destination}</Typography>
            </TableCell>
            <TableCell>
                {props.offer.offerType === "DRIVER_OFFER" ?
                    (
                        <Typography variant="subtitle1">Personal vehicle</Typography>
                    ) :
                    (
                        <Typography variant="subtitle1">{props.offer.transportVehicle}</Typography>
                    )}
            </TableCell>
            <TableCell>
                {props.offer.participants.map((participant) => {
                    return (
                        <Typography variant="subtitle1">- {participant.firstName} {participant.lastName}</Typography>
                    );
                })}
            </TableCell>
            <TableCell align="right">
                {props.offer.creator.id !== props.userId ?
                    props.offer.participants.length === props.offer.personLimit ?
                    (
                        <Button variant="contained" disabled>FULL</Button>
                    ) :
                    (
                        <Button variant="contained" style={{ backgroundColor: "green", color: "white" }}>JOIN</Button>
                    ) :
                    (
                        <span></span>
                    )
                }
                <Typography variant="subtitle2">Expires: {result}</Typography>
            </TableCell>
        </TableRow>
    );
}

export default Offer;