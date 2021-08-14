import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {
    CircularProgress,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import RendezvousPointsCustomDialog from "../../../Utilities/RendezvousPointsCustomDialog/RendezvousPointsCustomDialog";
import {Link} from "react-router-dom";

class CreateOfferForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            viewDialogOpen: false,
            addDialogOpen: false,
            rendezvousPoints: [],
            destinations: [],
            offerTransportVehicle: "taxi",

            offerCreationInProgress: false
        }
    }

    // handlers
    handleDateChange = (date) => {
        this.setState({
            selectedDate: date
        });
    };

    handleAddDialogOpen = () => {
        this.setState({
            addDialogOpen: true
        });
    };

    handleViewDialogOpen = () => {
        this.setState({
            viewDialogOpen: true
        });
    };

    handleAddDialogSubmit = (rendezvousPoint) => {
        this.processAddedRendezvousPoint(rendezvousPoint);
    };

    handleViewDialogRendezvousPointRemove = (index) => {
        this.removeAddedRendezvousPoint(index);
    }

    handleAddDialogClose = () => {
        this.setState({
            addDialogOpen: false
        });
    }

    handleViewDialogClose = () => {
        this.setState({
            viewDialogOpen: false
        });
    }

    handleFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <React.Fragment>
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={10}>
                            <FormLabel htmlFor="rendezvousPoints">Rendezvous points</FormLabel>
                            <TextField
                                required
                                variant="outlined"
                                id="rendezvousPoints"
                                name="rendezvousPoints"
                                label={this.state.rendezvousPoints.length > 0 ? "" : "Add rendezvous points..."}
                                disabled
                                fullWidth
                                style={{ marginTop: "15px" }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt={0}>
                                <Button variant="contained" color="primary" style={{ marginTop: "10px", marginBottom: "10px" }} onClick={this.handleViewDialogOpen}>
                                    View
                                </Button>
                                <Button variant="contained" style={{ backgroundColor: "green", color: "white" }} onClick={this.handleAddDialogOpen}>
                                    Add
                                </Button>
                            </Box>
                            <RendezvousPointsCustomDialog rendezvousPoints={this.state.rendezvousPoints}
                                                          dialogOpen={this.state.viewDialogOpen}
                                                          handleDialogOpen={this.handleViewDialogOpen}
                                                          handleDialogClose={this.handleViewDialogClose}
                                                          handleRendezvousPointRemove={this.handleViewDialogRendezvousPointRemove}
                                                          isViewDialog={true}
                            />
                            <RendezvousPointsCustomDialog dialogOpen={this.state.addDialogOpen}
                                                          handleDialogOpen={this.handleAddDialogOpen}
                                                          handleDialogClose={this.handleAddDialogClose}
                                                          handleDialogSubmit={this.handleAddDialogSubmit}
                                                          isViewDialog={false} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel htmlFor="destination">Destination</FormLabel>
                            <Autocomplete
                                options={this.state.destinations}
                                getOptionLabel={(option) => option.destination}
                                renderInput={(params) => <TextField {...params}
                                                                    label="Add destination..."
                                                                    id="destination"
                                                                    name="destination"
                                                                    required />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel htmlFor="personLimit">Person limit</FormLabel>
                            <TextField
                                required
                                id="personLimit"
                                name="personLimit"
                                label="Input person limit..."
                                type="number"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel htmlFor="personLimit">City</FormLabel>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label={this.props.userCity !== "" ? "" : "Input offer city..."}
                                value={this.props.userCity}
                                type="text"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel htmlFor="personLimit">Municipality</FormLabel>
                            <TextField
                                required
                                id="municipality"
                                name="municipality"
                                label={this.props.userMunicipality !== "" ? "" : "Input offer municipality..."}
                                value={this.props.userMunicipality}
                                type="text"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <FormLabel htmlFor="date">Date</FormLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    required
                                    fullWidth
                                    margin="normal"
                                    id="date"
                                    name="date"
                                    label="Pick a date"
                                    format="dd/MM/yyyy"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <span style={{ fontSize: "13px", color: "red" }} >* NOTE: Date and time must be 1h (at least) - 24h (at most) from now</span>
                        </Grid>
                        <Grid item xs={5}>
                            <FormLabel htmlFor="time">Time</FormLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    required
                                    fullWidth
                                    margin="normal"
                                    id="time"
                                    name="time"
                                    label="Pick a time"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {this.props.userType === "PASSENGER" &&
                        <Grid item xs={12}>
                            <FormLabel component="legend">Offer transport vehicle</FormLabel>
                            <RadioGroup aria-label="offerTransportVehicle"
                                        name="offerTransportVehicle"
                                        value={this.state.offerTransportVehicle}
                                        onChange={this.handleFieldChange}
                                        style={{ marginTop: "10px" }}>
                                <FormControlLabel value="taxi" control={<Radio color="primary" />} label="Taxi" />
                                <FormControlLabel value="bus" control={<Radio color="primary" />} label="Bus" />
                                <FormControlLabel value="ferry" control={<Radio color="primary" />} label="Ferry" />
                                <FormControlLabel value="subway" control={<Radio color="primary" />} label="Subway" />
                            </RadioGroup>
                        </Grid>
                        }
                        <Grid item xs={12}>
                            <Box mt={2}>
                                <Grid container justifyContent="flex-end">
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
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{ marginLeft: "15px" }}
                                    >
                                        Create
                                        {this.state.offerCreationInProgress === true &&
                                        <CircularProgress style={{ marginLeft: "10px", color: "white" }} size={15} />
                                        }
                                    </Button>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.loadInitialState();
    }


    // state data loader
    loadInitialState = () => {
        this.setState({
            destinations: [
                { destination: "Taftalidze" },
                { destination: "Vlae" },
                { destination: "Gorno Nerezi" },
                { destination: "Dolno Nerezi" },
                { destination: "Karposh 1" },
                { destination: "Karposh 2" },
                { destination: "Karposh 3" },
                { destination: "Karposh 4" },
                { destination: "Kisela Voda" },
                { destination: "Sopishte" },
                { destination: "Pripor" },
                { destination: "Vodno" },
                { destination: "Centar" },
                { destination: "Novo Lisiche" },
                { destination: "Staro Lisiche" },
                { destination: "Chair" },
                { destination: "Butel" }
            ]
        });
    }

    // functions
    fillRendezvousPointsTextField(rendezvousPoint) {
        var rendezvousPointsTextField = document.getElementById("rendezvousPoints");

        rendezvousPointsTextField.value === "" ?
            rendezvousPointsTextField.value += rendezvousPoint :
            rendezvousPointsTextField.value += ", " + rendezvousPoint
    }

    updateRendezvousPointsTextField() {
        var rendezvousPointsTextField = document.getElementById("rendezvousPoints");
        rendezvousPointsTextField.value = "";

        for(var i = 0; i<this.state.rendezvousPoints.length; i++) {
            i === this.state.rendezvousPoints.length - 1 ?
                rendezvousPointsTextField.value += this.state.rendezvousPoints[i] :
                rendezvousPointsTextField.value += this.state.rendezvousPoints[i] + ", "
        }
    }

    processAddedRendezvousPoint(rendezvousPoint) {
        var rendezvousPoints = this.state.rendezvousPoints;

        rendezvousPoints.push(rendezvousPoint);

        this.setState({
            rendezvousPoints: rendezvousPoints
        });

        this.fillRendezvousPointsTextField(rendezvousPoint);
    }

    removeAddedRendezvousPoint(index) {
        var rendezvousPoints = this.state.rendezvousPoints;

        rendezvousPoints.splice(index, 1);

        this.setState({
            rendezvousPoints: rendezvousPoints
        });

        this.updateRendezvousPointsTextField();
    }

}

export default CreateOfferForm;