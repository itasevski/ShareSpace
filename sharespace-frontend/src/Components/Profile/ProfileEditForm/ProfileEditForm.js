import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Logo from "../../../Images/logo.png";
import "./ProfileEditForm.css";
import {Facebook, Instagram, Twitter} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ProfileEditForm = () => {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={6} style={{ backgroundColor: "#fbfbfb" }}>
                    <Grid container>
                        <img src={Logo} alt="ShareSpace Logo" id="profileEditLogo" />
                        <Typography variant="h4" style={{ color: "gray" }}>MEMBER</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container justifyContent="center" className="profileEditInfo">
                                <Button variant="outlined" color="primary" component="label">
                                    Change profile picture
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container justifyContent="center" className="profileEditInfo">
                                <Button variant="outlined" color="primary" href="/profile/edit/changePassword">
                                    Change password
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={6}>
                            <Grid container justifyContent="center" className="profileEditInfo">
                                <TextField
                                    variant="outlined"
                                    id="firstName"
                                    name="firstName"
                                    label="Change first name"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container justifyContent="center" className="profileEditInfo">
                                <TextField
                                    variant="outlined"
                                    id="lastName"
                                    name="lastName"
                                    label="Change last name"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" className="profileEditInfo">
                        <TextField
                            variant="outlined"
                            id="vehicleModel"
                            name="vehicleModel"
                            label="Change vehicle model"
                            fullWidth
                        />
                    </Grid>
                    <Grid container justifyContent="center" className="profileEditInfo">
                        <TextField
                            variant="outlined"
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Change phone number"
                            fullWidth
                        />
                    </Grid>
                    <Grid container justifyContent="center" className="profileEditInfo">
                        <TextField
                            variant="outlined"
                            id="email"
                            name="email"
                            label="Change e-mail"
                            fullWidth
                        />
                    </Grid>
                    <Grid container justifyContent="center">
                        <Facebook style={{ fontSize: "55px" }} /><TextField id="facebookLink" name="facebookLink" label="Change facebook link" style={{ width: "55%" }} />
                    </Grid>
                    <Grid container justifyContent="center">
                        <Twitter style={{ fontSize: "55px" }} /><TextField id="twitterLink" name="twitterLink" label="Change twitter link" style={{ width: "55%" }} />
                    </Grid>
                    <Grid container justifyContent="center">
                        <Instagram style={{ fontSize: "55px" }} /><TextField id="instagramLink" name="instagramLink" label="Change instagram link" style={{ width: "55%" }} />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ProfileEditForm;