import React from "react";
import {AppBar, Badge, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import {AccountCircle, Notifications} from "@material-ui/icons";
import './Header.css';
import {Link, useHistory} from "react-router-dom";
import LogoTransparent from "../../Images/logo-transparent-small.png";

const Header = (props) => {
    const history = useHistory();
    const [state, setState] = React.useState({
        notificationsAnchorEl: null,
        accountAnchorEl: null
    });

    const handleAccountIconClick = (event) => {
        setState({
            ...state,
            accountAnchorEl: event.currentTarget
        });
    };

    const handleNotificationIconClick = (event) => {
        setState({
            ...state,
            notificationsAnchorEl: event.currentTarget
        });
    };

    const handleAccountIconClose = () => {
        setState({
            ...state,
            accountAnchorEl: null
        });
    };

    const handleNotificationIconClose = () => {
        setState({
            ...state,
            notificationsAnchorEl: null
        });
    };

    const handleImageClick = () => {
        return history.push("/home");
    }

    const handleLogout = () => {
        setState({
            ...state,
            accountAnchorEl: null
        });
        props.onLogout();
    }

    return (
        <div>
            <AppBar id="headerAppBar" position="static">
                <Toolbar id="headerToolbar">
                    <img src={LogoTransparent} alt="ShareSpace Logo" onClick={handleImageClick} />
                    <Typography style={{ paddingRight: "25px" }} variant="h6" noWrap>
                        <Link className="headerLink" to="/home">Home</Link>
                    </Typography>
                    <Typography style={{ paddingRight: "25px" }} variant="h6" noWrap>
                        <Link className="headerLink" to="/about">About</Link>
                    </Typography>
                    <Typography style={{ paddingRight: "25px" }} variant="h6" noWrap>
                        <Link className="headerLink" to="/contact">Contact</Link>
                    </Typography>
                    {localStorage.getItem("userJwtToken") !== null &&
                    <Typography style={{ paddingRight: "25px" }} variant="h6" noWrap>
                        <Link className="headerLink" to="/offers">Offers</Link>
                    </Typography>
                    }
                    {localStorage.getItem("userJwtToken") === null ? (
                        <Toolbar style={{ marginLeft: "auto" }}>
                            <Typography style={{ paddingRight: "25px" }} variant="h6" noWrap>
                                <Link className="headerLink" to="/login">Login</Link>
                            </Typography>
                            <Typography variant="h6" noWrap>
                                <Link className="headerLink" to="/register">Register</Link>
                            </Typography>
                        </Toolbar>
                    ) : (
                        <div id="headerIcons">
                            <IconButton
                                aria-label="show 1 new notification"
                                disabled
                            >
                                <Typography variant="h6" noWrap style={{ color: "gray" }}>
                                    Hi, {props.username}!
                                </Typography>
                            </IconButton>
                            <IconButton
                                aria-label="show 1 new notification"
                                style={{ marginLeft: "10px" }}
                                onClick={handleNotificationIconClick}
                            >
                                <Badge badgeContent={1} color="secondary"
                                >
                                    <Notifications />
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-label="account of current user"
                                aria-haspopup="true"
                                style={{ marginLeft: "20px" }}
                                onClick={handleAccountIconClick}
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={state.notificationsAnchorEl}
                                keepMounted
                                open={Boolean(state.notificationsAnchorEl)}
                                onClose={handleNotificationIconClose}
                            >
                                <Link className="headerLink" to="#">
                                    <MenuItem onClick={handleNotificationIconClose}>
                                        Notification 1
                                    </MenuItem>
                                </Link>
                            </Menu>
                            <Menu
                                id="simple-menu"
                                anchorEl={state.accountAnchorEl}
                                keepMounted
                                open={Boolean(state.accountAnchorEl)}
                                onClose={handleAccountIconClose}
                            >
                                <Link className="headerLink" to="/profile">
                                    <MenuItem onClick={handleAccountIconClose}>
                                        My profile
                                    </MenuItem>
                                </Link>
                                <Link className="headerLink">
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Link>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;