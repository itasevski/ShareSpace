import React, {useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {FormLabel, Radio, RadioGroup, Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Container from "@material-ui/core/Container";
import StyleTwo from "../../../Utilities/Styles/SecurityFormStyles/StyleTwo";
import {Error} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import ShareSpaceService from "../../../Services/ShareSpaceService";
import MuiPhoneNumber from "material-ui-phone-number";

const RegisterForm = () => {
    const classes = StyleTwo();

    const history = useHistory();
    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
        confirmPassword: "",
        type: "PASSENGER",

        countryCode: "",

        arePasswordsEqual: true,
        isPasswordLengthValid: true,
        isPasswordAlphanumeric: true,
        isPhoneNumberValid: true,

        error: false,
        errorMessage: {}
    });

    useEffect(() => {
        setState({
            ...state,
            countryCode: document.getElementById("phoneNumber").value
        });
    }, []);

    const handleFieldChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handlePhoneFieldChange = (value) => {
        setState({
            ...state,
            phoneNumber: value
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const phoneNumber =
            (state.phoneNumber === "+" || state.phoneNumber === state.countryCode || state.phoneNumber === null || state.phoneNumber === "") === true ?
                null : state.phoneNumber;

        if(!validatePhoneNumber(phoneNumber)) {
            console.error("Invalid phone number");
            return;
        }

        const firstName = state.firstName;
        const lastName = state.lastName;
        const email = state.email;
        const username = state.username;
        const password = state.password;
        const confirmPassword = state.confirmPassword;
        const type = state.type;

        if(validatePassword(password, confirmPassword)) {
            register(firstName, lastName, email, phoneNumber, username, password, confirmPassword, type);
        }
        else {
            console.error("Registration failed.");
        }
    }

    const register = (firstName, lastName, email, phoneNumber, username, password, confirmPassword, type) => {
        ShareSpaceService.register(firstName, lastName, email, phoneNumber, username, password, confirmPassword, type)
            .then(
                (data) => {
                    localStorage.setItem("successfulRegistration", "true");
                    console.log(username + ": Successfully registered.");
                    history.push("/login");
                },
                (err) => {
                    setState({
                        ...state,
                        error: true,
                        errorMessage: err.response.status + ": " + err.response.data.errorMessage
                    });
                });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {state.arePasswordsEqual === false &&
                <Typography variant="subtitle1" color="secondary">
                    <Error color="secondary" />&nbsp;
                    Passwords do not match
                </Typography>
                }
                {state.isPasswordLengthValid === false &&
                <Typography variant="subtitle1" color="secondary">
                    <Error color="secondary" />&nbsp;
                    Password must be at least 6 characters long
                </Typography>
                }
                {state.isPasswordAlphanumeric === false &&
                <Typography variant="subtitle1" color="secondary">
                    <Error color="secondary" />&nbsp;
                    Password must be alphanumeric
                </Typography>
                }
                {state.isPhoneNumberValid === false &&
                <Typography variant="subtitle1" color="secondary">
                    <Error color="secondary" />&nbsp;
                    Invalid phone number
                </Typography>
                }
                {state.error === true &&
                <Typography variant="subtitle1" color="secondary">
                    <Error color="secondary" />&nbsp;
                    {state.errorMessage}
                </Typography>
                }
                <form className={classes.form} onSubmit={handleFormSubmit} style={{ marginTop: "25px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoComplete="fname"
                                autoFocus
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPhoneNumber
                                variant="outlined"
                                fullWidth
                                id="phoneNumber"
                                label="Phone number"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                defaultCountry={"mk"}
                                value={state.phoneNumber}
                                onChange={handlePhoneFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel component="legend">Register as: </FormLabel>
                            <RadioGroup aria-label="type"
                                        name="type"
                                        value={state.type}
                                        onChange={handleFieldChange}
                                        style={{ marginTop: "10px" }}>
                                <FormControlLabel value="PASSENGER" control={<Radio color="primary" />} label="Passenger" />
                                <FormControlLabel value="DRIVER" control={<Radio color="primary" />} label="Driver" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2" style={{ color: "#3f51b5" }}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );

    function validatePassword(password, confirmPassword) {
        var regex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))/;

        var arePasswordsEqual = password === confirmPassword;
        var isPasswordLengthValid = password.length >= 6;
        var isPasswordAlphanumeric;
        password.match(regex) ? isPasswordAlphanumeric = true : isPasswordAlphanumeric = false;

        setState({
            ...state,
            arePasswordsEqual: arePasswordsEqual,
            isPasswordLengthValid: isPasswordLengthValid,
            isPasswordAlphanumeric: isPasswordAlphanumeric,
            isPhoneNumberValid: true
        });

        return (arePasswordsEqual === true && isPasswordLengthValid === true && isPasswordAlphanumeric === true);
    }

    function validatePhoneNumber(phoneNumber) {
        var isPhoneNumberValid = true;

        if(phoneNumber !== null) {
            isPhoneNumberValid = (phoneNumber.length >= 8 && phoneNumber.length <= 16);
        }

        setState({
            ...state,
            isPhoneNumberValid: isPhoneNumberValid
        });

        return isPhoneNumberValid;
    }

}

export default RegisterForm;