import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import {VpnKey} from "@material-ui/icons";
import StyleTwo from "../../../../../Utilities/Styles/SecurityFormStyles/StyleTwo";

const PasswordChangeForm = () => {
    const classes = StyleTwo();

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <VpnKey />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change password
                    </Typography>
                    <form>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="oldPassword"
                            label="Old password"
                            type="password"
                            name="oldPassword"
                            autoComplete="oldPassword"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New password"
                            type="password"
                            id="newPassword"
                            autoComplete="newPassword"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="newPasswordReentered"
                            label="Reenter new password"
                            type="password"
                            id="newPasswordReentered"
                            autoComplete="newPasswordReentered"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Confirm
                        </Button>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default PasswordChangeForm;