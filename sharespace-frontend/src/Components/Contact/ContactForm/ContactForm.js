import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";

const ContactForm = () => {
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Typography variant="h4" style={{ display: "block" }}>Contact info:</Typography>
                    </Grid>
                    <hr width={150} />
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle1">Telephone number: +389 71 222 476</Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle1">Address: Share Space st. 20</Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle1">E-mail: ivo_t@live.com</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <hr style={{ width: "85%", marginTop: "75px", marginBottom: "100px" }} />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Typography variant="h4" style={{ display: "block" }}>Leave us a message:</Typography>
                    </Grid>
                    <hr width={150} /><br />
                    <Grid container justifyContent="center">
                        <TextField id="outlined" label="Your e-mail" type="search" variant="outlined" style={{ width: "300px" }} required />
                    </Grid>
                    <Grid container justifyContent="center" style={{ marginTop: "25px" }}>
                        <TextField id="outlined" label="Your message" type="search" variant="outlined" style={{ width: "500px" }} required />
                    </Grid>
                    <Grid container justifyContent="center" style={{ marginTop: "25px" }}>
                        <Button variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ContactForm;