import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {Facebook, Instagram, Star, StarBorderOutlined, Twitter, VerifiedUserRounded} from "@material-ui/icons";
import "./Profile.css";
import ProgressCircle from "../../Utilities/CircularProgress/ProgressCircle/ProgressCircle";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const Profile = (props) => {
    return (
        <div id="profileContainer">
            <Grid container>
                <Grid item xs={5}>
                    <Grid container justifyContent="center">
                        <VerifiedUserRounded style={{ fontSize: "300px" }} />
                    </Grid>
                    <Grid container justifyContent="center">
                        <Typography variant="h4">Ivo Tasevski</Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle1">Ivot2000</Typography>
                    </Grid>
                    <Grid container justifyContent="center" style={{ paddingBottom: "10px" }}>
                        <Typography variant="subtitle1">Driver</Typography>
                    </Grid>
                    <Grid container justifyContent="center" className="userInfo">
                        <Typography variant="subtitle2">Volkswagen Polo 2005</Typography>
                    </Grid>
                    <Grid container justifyContent="center" className="userInfo">
                        <Typography variant="subtitle2">Skopje</Typography>
                    </Grid>
                    <Grid container justifyContent="center" className="userInfo">
                        <Typography variant="subtitle2">+389 71 222 476</Typography>
                    </Grid>
                    <Grid container justifyContent="center" className="userInfo">
                        <Typography variant="subtitle2">ivo_t@live.com</Typography>
                    </Grid>
                    <Grid container justifyContent="center" className="userInfo">
                        <Typography variant="subtitle2">
                            <Link to="#" className="profileLinks"><Facebook /></Link>
                            <Link to="#" className="profileLinks"><Twitter /></Link>
                            <Link to="#" className="profileLinks"><Instagram /></Link>
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Star /><Star /><Star /><Star /><StarBorderOutlined />
                    </Grid>
                    <Grid container justifyContent="center" style={{ paddingTop: "20px" }}>
                        <Button color="primary" variant="outlined" href="/profile/edit">
                            Edit profile
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={6} style={{ marginTop: "100px" }}>
                    <Grid container justifyContent="flex-start">
                        <Typography variant="h6">My name is Ivo Tasevski.
                            I am a user of the ShareSpace system and I am very satisfied with the services it offers.
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="flex-start" style={{ marginTop: "100px" }}>
                        <ProgressCircle size={180} componentId={""} item={props.item} />
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile;