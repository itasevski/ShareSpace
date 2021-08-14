import React, {Component} from "react";
import Header from "../../Utilities/Header/Header";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Footer from "../../Utilities/Footer/Footer";
import "./App.css";
import Home from "../Home/Home";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Offers from "../Offers/Offers";
import CreateOffer from "../Offers/CreateOffer/CreateOffer";
import Profile from "../Profile/Profile";
import ProfileEdit from "../Profile/ProfileEdit/ProfileEdit";
import PasswordChange from "../Profile/ProfileEdit/PasswordChange/PasswordChange";
import GeocodeService from "../../Services/GeocodeService";
import ShareSpaceService from "../../Services/ShareSpaceService";
import jwt_decode from "jwt-decode";
import {CircularProgress} from "@material-ui/core";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // GEOLOCATION DATA
            geolocationData: [],

            // TEST ITEMS
            homeItems: [
                {
                    "firstItem": {
                        value: 50,
                        label: "500 shared rides.",
                        goal: "Goal: 1000",
                        color: "#59bfff"
                    },
                    "secondItem": {
                        value: 90,
                        label: "18620MKD approximate savings.",
                        goal: "Goal: 20000",
                        color: "#00e600"
                    }
                },
                {
                    "firstItem": {
                        value: 40,
                        label: "0.2% CO2 emission reduction.",
                        goal: "Goal: 0.5%",
                        color: "#ed687c"
                    },
                    "secondItem": {
                        value: 90,
                        label: "186 new friendships.",
                        goal: "Goal: 200",
                        color: "#193465"
                    }
                }
            ],
            profileItems: [
                {
                    "firstItem": {
                        value: 95,
                        label: "19 offers created",
                        goal: "Goal: 20",
                        color: "#193465"
                    },
                    "secondItem": {
                        value: 90,
                        label: "18 successful deals",
                        goal: "Goal: 20",
                        color: "#59bfff"
                    },
                    "thirdItem": {
                        value: 70,
                        label: "1200MKD saved",
                        goal: "Goal: 1500MKD",
                        color: "#00e600"
                    }
                }
            ],

            // CURRENT USER VARIABLES
            userInfo: {},
            userCity: "",
            userMunicipality: "",

            // MISCELLANEOUS VARIABLES
            loadingScreen: true
        }
    }

    render() {
        return (
            <main>
                {this.state.loadingScreen === true ?
                    (
                        <CircularProgress id="loadingCircle"/>
                    ) :
                    (
                        <Router>
                            <Header username={this.state.userInfo.username} onLogout={this.logout} />

                            <Route path={"/home"} exact render={() => (
                                localStorage.getItem("successfulRegistration") || localStorage.getItem("successfulPasswordChange") !== null ?
                                    (
                                        localStorage.removeItem("successfulRegistration"), localStorage.removeItem("successfulPasswordChange"),
                                            <Home items={this.state.homeItems}/>
                                    ) :
                                    (
                                        <Home items={this.state.homeItems}/>
                                    )
                            )} />

                            <Route path={"/about"} exact render={() => (
                                localStorage.getItem("successfulRegistration") !== null || localStorage.getItem("successfulPasswordChange") !== null ?
                                    (
                                        localStorage.removeItem("successfulRegistration"), localStorage.removeItem("successfulPasswordChange"),
                                            <About />
                                    ) :
                                    (
                                        <About />
                                    )
                            )} />

                            <Route path={"/contact"} exact render={() => (
                                localStorage.getItem("successfulRegistration") || localStorage.getItem("successfulPasswordChange") !== null ?
                                    (
                                        localStorage.removeItem("successfulRegistration"), localStorage.removeItem("successfulPasswordChange"),
                                            <Contact userId={this.state.userInfo.id} />
                                    ) :
                                    (
                                        <Contact userId={this.state.userInfo.id} />
                                    )
                            )} />

                            <Route path={"/login"} exact render={() => <Login onLogin={this.login} />} />

                            <Route path={"/register"} exact render={() => (
                                localStorage.getItem("successfulRegistration") || localStorage.getItem("successfulPasswordChange") !== null ?
                                    (
                                        localStorage.removeItem("successfulRegistration"), localStorage.removeItem("successfulPasswordChange"),
                                            <Register userCity={this.state.userCity} userMunicipality={this.state.userMunicipality} />
                                    ) :
                                    (
                                        <Register userCity={this.state.userCity} userMunicipality={this.state.userMunicipality} />
                                    )
                            )} />

                            <Route path={"/offers"} exact render={() => (
                                localStorage.getItem("userJwtToken") !== null ?
                                    (
                                        <Offers userCity={this.state.userCity} userMunicipality={this.state.userMunicipality} />
                                    ) :
                                    (
                                        <Redirect to={"/login"} />
                                    )
                            )}/>

                            <Route path={"/createOffer"} exact render={() => (
                                localStorage.getItem("userJwtToken") !== null ?
                                    (
                                        <CreateOffer userCity={this.state.userCity} userMunicipality={this.state.userMunicipality} userType={this.state.userInfo.type} />
                                    ) :
                                    (
                                        <Redirect to={"/login"} />
                                    )
                            )} />

                            <Route path={"/profile"} exact render={() => (
                                localStorage.getItem("userJwtToken") !== null ?
                                    (
                                        <Profile item={this.state.profileItems[0]}
                                                 userInfo={this.state.userInfo}
                                                 userCity={this.state.userCity}
                                                 userMunicipality={this.state.userMunicipality} />
                                    ) :
                                    (
                                        <Redirect to={"/login"} />
                                    )
                            )} />

                            <Route path={"/profile/edit"} exact render={() => (
                                localStorage.getItem("userJwtToken") !== null ?
                                    (
                                        <ProfileEdit userInfo={this.state.userInfo}
                                                     onProfileEdit={this.profileEdit}
                                                     onServerError={this.logout} />
                                    ) :
                                    (
                                        <Redirect to={"/login"} />
                                    )
                            )} />

                            <Route path={"/profile/edit/changePassword"} exact render={() => (
                                localStorage.getItem("userJwtToken") !== null ?
                                    (
                                        <PasswordChange userId={this.state.userInfo.id} onChangePassword={this.changePassword} onServerError={this.logout} />
                                    ) :
                                    (
                                        <Redirect to={"/login"} />
                                    )
                            )} />

                            <Route path={"/"} exact render={() => <Redirect to={"/home"} /> }/>

                            <Footer />
                        </Router>
                    )
                }
            </main>
        );
    }

    componentDidMount() {
        if(localStorage.getItem("userJwtToken")) {
            const decodedJwtToken = jwt_decode(localStorage.getItem("userJwtToken"));
            const userInfo = JSON.parse(JSON.stringify(decodedJwtToken.sub));
            ShareSpaceService.fetchCurrentUser(localStorage.getItem("userJwtToken"), JSON.parse(userInfo).username)
                .then(
                    (data) => {
                        this.setState({
                            userInfo: data.data,
                            loadingScreen: false
                        });
                    },
                    (err) => {
                        localStorage.removeItem("userJwtToken");
                        this.setState({
                            userInfo: {},
                            loadingScreen: false
                        });
                    });
        }
        else {
            this.setState({
                loadingScreen: false
            });

        }

        this.loadGeolocationData();
    }

    // REPOSITORY FETCH FUNCTIONS

    loadGeolocationData = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            GeocodeService.fetchGeolocationData(position.coords.latitude, position.coords.longitude)
                .then((data) => {
                    this.setState({
                        geolocationData: data.data,
                        userMunicipality: data.data.results[0].address_components[2].long_name,
                        userCity: data.data.results[0].address_components[3].long_name
                    });
                });
        });
    }

    login = () => {
        const decodedJwtToken = jwt_decode(localStorage.getItem("userJwtToken"));
        const userInfo = JSON.parse(JSON.stringify(decodedJwtToken.sub));
        ShareSpaceService.fetchCurrentUser(localStorage.getItem("userJwtToken"), JSON.parse(userInfo).username)
            .then((data) => {
                this.setState({
                    userInfo: data.data
                });
            });
    }

    logout = () => {
        localStorage.removeItem("userJwtToken");
        this.setState({
            userInfo: {}
        });
    }

    changePassword = () => {
        this.logout();
    }

    profileEdit = (data) => {
        this.setState({
            userInfo: data
        });
    }

}

export default App;