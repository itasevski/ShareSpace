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
            userMunicipality: "",
            userCity: ""
        }
    }

    render() {
        return (
            <main>
                <Router>
                    <Header userInfo={this.state.userInfo} onLogout={this.logout} />

                    <Route path={"/home"} exact render={() => (
                        localStorage.getItem("successfulRegistration") !== null ?
                            (
                                localStorage.removeItem("successfulRegistration"),
                                <Home items={this.state.homeItems}/>
                            ) :
                            (
                                <Home items={this.state.homeItems}/>
                            )
                    )} />

                    <Route path={"/about"} exact render={() => <About />} />
                    <Route path={"/contact"} exact render={() => <Contact />} />
                    <Route path={"/login"} exact render={() => <Login onLogin={this.login} />} />
                    <Route path={"/register"} exact render={() => <Register onRegister={this.registerNewUser} />} />

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
                                <CreateOffer />
                            ) :
                            (
                                <Redirect to={"/login"} />
                            )
                    )} />

                    <Route path={"/profile"} exact render={() => (
                        localStorage.getItem("userJwtToken") !== null ?
                            (
                                <Profile item={this.state.profileItems[0]} />
                            ) :
                            (
                                <Redirect to={"/login"} />
                            )
                    )} />

                    <Route path={"/profile/edit"} exact render={() => (
                        localStorage.getItem("userJwtToken") !== null ?
                            (
                                <ProfileEdit />
                            ) :
                            (
                                <Redirect to={"/login"} />
                            )
                    )} />

                    <Route path={"/profile/edit/changePassword"} exact render={() => (
                        localStorage.getItem("userJwtToken") !== null ?
                            (
                                <PasswordChange />
                            ) :
                            (
                                <Redirect to={"/login"} />
                            )
                    )} />

                    <Route path={"/"} exact render={() => <Redirect to={"/home"} /> }/>

                    <Footer />
                </Router>
            </main>
        );
    }

    componentDidMount() {
        if(localStorage.getItem("successfulRegistration")) {
            localStorage.removeItem("successfulRegistration");
        }

        if(localStorage.getItem("userJwtToken")) {
            const decodedJwtToken = jwt_decode(localStorage.getItem("userJwtToken"));
            const userInfo = JSON.parse(JSON.stringify(decodedJwtToken.sub));
            this.setState({
                userInfo: JSON.parse(userInfo)
            });
        }
    }

    // REPOSITORY FETCH FUNCTIONS
    //
    // loadGeolocationData = () => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         GeocodeService.fetchGeolocationData(position.coords.latitude, position.coords.longitude)
    //             .then((data) => {
    //                 this.setState({
    //                     geolocationData: data.data,
    //                     userMunicipality: data.data.results[0].address_components[2].long_name,
    //                     userCity: data.data.results[0].address_components[3].long_name
    //                 });
    //             });
    //     });
    // }

    login = (username, password) => {
        ShareSpaceService.login(username, password)
            .then((data) => {
                localStorage.setItem("userJwtToken", data.data);
                const decodedJwtToken = jwt_decode(localStorage.getItem("userJwtToken"));
                const userInfo = JSON.parse(JSON.stringify(decodedJwtToken.sub));
                this.setState({
                    userInfo: JSON.parse(userInfo)
                });
            });
    }

    logout = () => {
        localStorage.removeItem("userJwtToken");
        this.setState({
            userInfo: {}
        });
    }

    registerNewUser = (firstName, lastName, email, username, password, confirmPassword, userType) => {
        ShareSpaceService.register(firstName, lastName, email, username, password, confirmPassword, userType)
            .then((data) => {
                console.log(username + ": Successfully registered.");
            });
    }

}

export default App;