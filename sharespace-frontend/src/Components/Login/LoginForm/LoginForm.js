import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import StyleTwo from "../../../Utilities/Styles/SecurityFormStyles/StyleTwo";
import {CheckCircle, Error} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import ShareSpaceService from "../../../Services/ShareSpaceService";

const LoginForm = (props) => {
    const classes = StyleTwo();

    const history = useHistory();
    const [state, setState] = React.useState({
        username: "",
        password: "",
        error: false,
        errorMessage: {}
    });

    const handleFieldChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value.trim()
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if(localStorage.getItem("successfulRegistration") !== null) localStorage.removeItem("successfulRegistration");

        const username = state.username;
        const password = state.password;

        login(username, password);
    }

    const login = (username, password) => {
        ShareSpaceService.login(username, password)
            .then(
                (data) => {
                    localStorage.setItem("userJwtToken", data.data);
                    props.onLogin();
                    history.push("/");
            },
                (err) => {
                    setState({
                        ...state,
                        error: true,
                        errorMessage: "Invalid authentication attempt for user " + username
                    });
                });
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {localStorage.getItem("successfulRegistration") === "true" &&
                    <Typography variant="subtitle1" style={{ color: "#4BB543" }}>
                        <CheckCircle style={{ color: "#4BB543" }} />&nbsp;
                        You have been successfully registered.
                    </Typography>
                    }
                    {state.error === true &&
                    <Typography variant="subtitle1" color="secondary">
                        <Error color="secondary" />&nbsp;
                        {state.errorMessage}
                    </Typography>
                    }
                    <form className={classes.form} onSubmit={handleFormSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={handleFieldChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleFieldChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default LoginForm;