import React from "react";
import {Grid, Typography} from "@material-ui/core";
import Logo from "../../Images/logo.png";
import "./About.css";

const About = () => {
    return (
        <div id="aboutContainer">
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <img src={Logo} alt="ShareSpace Logo" />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Typography variant="body1" gutterBottom style={{ marginTop: "25px", fontSize: "25px", textAlign: "center", width: "50%" }}>
                            ShareSpace is a system where people can share expenses when using public transport. Its purpose is to help people save money,
                            time and make new friendships. Your journeys begin with us!
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Typography variant="h3" style={{ marginTop: "25px" }}>
                            Guides
                        </Typography>
                    </Grid>
                    <hr width={100} />
                </Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent="center">
                        <Typography variant="h4" style={{ marginTop: "15px" }}>
                            Video guides
                        </Typography>
                    </Grid>
                    <hr width={150} />
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle2">
                            Video guides go here.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent="center">
                        <Typography variant="h4" style={{ marginTop: "15px" }}>
                            Descriptive guides
                        </Typography>
                    </Grid>
                    <hr width={150} />
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle2">
                            Text (descriptive) guides go here.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default About;