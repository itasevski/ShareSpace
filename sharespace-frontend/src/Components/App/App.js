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
import ShareSpaceRepository from "../../Repository/ShareSpaceRepository";


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
            isUserLoggedIn: false,
            userMunicipality: "",
            userCity: ""
        }
    }

    render() {
        return (
            <main>
                <Router>
                    <Header isUserLoggedIn={this.state.isUserLoggedIn} />

                    <Route path={"/home"} exact render={() => <Home items={this.state.homeItems}/>} />
                    <Route path={"/about"} exact render={() => <About />} />
                    <Route path={"/contact"} exact render={() => <Contact />} />
                    <Route path={"/login"} exact render={() => <Login />} />
                    <Route path={"/register"} exact render={() => <Register />} />
                    <Route path={"/offers"} exact render={() => <Offers userCity={this.state.userCity} userMunicipality={this.state.userMunicipality} />} />
                    <Route path={"/createOffer"} exact render={() => <CreateOffer />} />
                    <Route path={"/profile"} exact render={() => <Profile item={this.state.profileItems[0]} />} />
                    <Route path={"/profile/edit"} exact render={() => <ProfileEdit />} />
                    <Route path={"/profile/edit/changePassword"} exact render={() => <PasswordChange />} />

                    <Route path={"/"} exact render={() => <Redirect to={"/home"} />} />
                    <Footer />
                </Router>
            </main>
        );
    }

    componentDidMount() {
      // this.loadGeolocationData();
    }

    // REPOSITORY FETCH FUNCTIONS

    // loadGeolocationData = () => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         ShareSpaceRepository.fetchGeolocationData(position.coords.latitude, position.coords.longitude)
    //             .then((data) => {
    //                 this.setState({
    //                     geolocationData: data.data,
    //                     userMunicipality: data.data.results[0].address_components[2].long_name,
    //                     userCity: data.data.results[0].address_components[3].long_name
    //                 });
    //             });
    //     });
    // }

}

export default App;