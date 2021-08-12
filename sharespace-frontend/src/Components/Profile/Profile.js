import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {Facebook, Instagram, Star, StarBorderOutlined, Twitter, VerifiedUserRounded} from "@material-ui/icons";
import "./Profile.css";
import ProgressCircle from "../../Utilities/CircularProgress/ProgressCircle/ProgressCircle";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

function stars(number) {
    const items = [];

    for (var j = 0; j < number; j++) {
        items.push(<Star />)
    }
    for(var k = 0; k < 5-number; k++) {
        items.push(<StarBorderOutlined />)
    }

    return items;
}

const Profile = (props) => {

    const items = stars(props.userInfo.rating);

    return (
        <div id="profileContainer">
            <Grid container>
                <Grid item xs={5}>
                    <Grid container justifyContent="center">
                        <VerifiedUserRounded style={{ fontSize: "300px" }} />
                    </Grid>
                    <Grid container justifyContent="center">
                        <Typography variant="h4">
                            {props.userInfo.firstName} {props.userInfo.lastName}
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle1">
                            {props.userInfo.username}
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="center" style={{ paddingBottom: "10px" }}>
                        <Typography variant="subtitle1">
                            {props.userInfo.type}
                        </Typography>
                    </Grid>
                    {props.userInfo.vehicleModel !== null &&
                    <Grid container justifyContent="center" className="userInfo">
                        <Typography variant="subtitle2">
                            {props.userInfo.vehicleModel}
                        </Typography>
                    </Grid>
                    }
                    <Grid container justifyContent="center" className="userInfo">
                        <Typography variant="subtitle2">
                            {props.userCity}, {props.userMunicipality}
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="center" className="userInfo">
                        <Typography variant="subtitle2">
                            {props.userInfo.email}
                        </Typography>
                    </Grid>
                    {props.userInfo.phoneNumber !== null &&
                    <Grid container justifyContent="center" className="userInfo">
                        <Typography variant="subtitle2">
                            {props.userInfo.phoneNumber}
                        </Typography>
                    </Grid>
                    }
                    <Grid container justifyContent="center" className="userInfo">
                        <Typography variant="subtitle2">
                            <Link to="#" className="profileLinks"><Facebook /></Link>
                            <Link to="#" className="profileLinks"><Twitter /></Link>
                            <Link to="#" className="profileLinks"><Instagram /></Link>
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        {items}
                    </Grid>
                    <Grid container justifyContent="center" style={{ paddingTop: "20px" }}>
                            <Link to="/profile/edit" style={{ textDecoration: "none", color: "#3f51b5" }}>
                                <Button type="button" color="primary" variant="outlined">
                                    Edit profile
                                </Button>
                            </Link>
                    </Grid>
                </Grid>
                <Grid item xs={6} style={{ marginTop: "100px" }}>
                    {props.userInfo.bio !== null &&
                    <Grid container justifyContent="flex-start">
                        <Typography variant="h6">
                            {props.userInfo.bio}
                        </Typography>
                    </Grid>
                    }
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