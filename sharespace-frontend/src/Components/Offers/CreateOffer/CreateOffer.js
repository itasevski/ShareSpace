import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {LocalOfferTwoTone} from "@material-ui/icons";
import CreateOfferForm from "../CreateOfferForm/CreateOfferForm";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    typography: {
      marginBottom: "50px"
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginLeft: theme.spacing(2)
    }
}));

const CreateOffer = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" className={classes.typography}>
                        <LocalOfferTwoTone />&nbsp;
                        Create your offer
                    </Typography>
                    <React.Fragment>
                            <React.Fragment>
                                <CreateOfferForm />
                                <div className={classes.buttons}>
                                    <Link to="/offers" style={{ textDecoration: "none", color: "#3f51b5" }}>
                                        <Button
                                            type="button"
                                            color="primary"
                                            variant="outlined"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Create
                                    </Button>
                                </div>
                            </React.Fragment>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default CreateOffer;