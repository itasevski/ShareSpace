import React from "react";
import {Button, Grid, TableCell, TableRow} from "@material-ui/core";
import {VerifiedUserRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

const Offer = () => {
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
                            <Typography variant="h6">Aleksandar Antov</Typography>
                        </Grid>
                        <Typography variant="subtitle2">Published at: 17.07.2021, 18:34</Typography>
                        <Typography variant="subtitle2">Offer environment: Skopje, Centar</Typography>
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle1">Passenger offer</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle1">18.07.2021, 16:00</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle1">3</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle1">Shampionche - Kisela Voda</Typography>
                <Typography variant="subtitle1">Rampa - Kisela Voda</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle1">Staro Lisiche</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle1">Taxi</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle1">- Aleksandar Antov</Typography>
            </TableCell>
            <TableCell align="right">
                <Button variant="contained" style={{ backgroundColor: "green", color: "white" }}>JOIN</Button>
                <Typography variant="subtitle2">Expires in: 20h</Typography>
            </TableCell>
        </TableRow>
    );
}

export default Offer;