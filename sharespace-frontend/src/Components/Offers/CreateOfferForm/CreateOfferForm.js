import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {
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


class CreateOfferForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            offerType: "passenger",
            addDialogOpen: false,
            viewDialogOpen: false,
            rendezvousPointSelected: false,
            rendezvousPoints: [],
            destinations: []
        }
    }


    // handlers
    handleDateChange = (date) => {
        this.setState({
            selectedDate: date
        });
    };

    handleOfferTypeChange = (event) => {
        this.setState({
            offerType: event.target.value
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

    handleAddDialogSubmit = () => {
        this.processCheckedRendezvousPoints();
    };

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


    render() {
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <FormLabel htmlFor="rendezvousPoints">Rendezvous points</FormLabel>
                        <TextField
                            required
                            variant="outlined"
                            id="rendezvousPoints"
                            name="rendezvousPoints"
                            label={this.state.rendezvousPointSelected === true ? "" : "Add rendezvous points..."}
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
                                                      isViewDialog={true}
                                                      isRendezvousPointSelected={this.state.rendezvousPointSelected} />
                        <RendezvousPointsCustomDialog rendezvousPoints={this.state.rendezvousPoints}
                                                      dialogOpen={this.state.addDialogOpen}
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
                    <Grid item xs={12}>
                        <FormLabel component="legend">Offer type</FormLabel>
                        <RadioGroup aria-label="offerType"
                                    name="offerType"
                                    value={this.state.offerType}
                                    onChange={this.handleOfferTypeChange}
                                    style={{ marginTop: "10px" }}>
                            <FormControlLabel value="passenger" control={<Radio color="primary" />} label="Passenger" />
                            <FormControlLabel value="driver" control={<Radio color="primary" />} label="Driver" />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.loadInitialState();
    }


    // state data loader
    loadInitialState = () => {
        this.setState({
            rendezvousPoints: [
                {
                    rendezvousPoint: "Shampionche - Kisela Voda",
                    selected: false
                },
                {
                    rendezvousPoint: "Rampa - Kisela Voda",
                    selected: false
                },
                {
                    rendezvousPoint: "Soborna Crkva - Centar",
                    selected: false
                },
                {
                    rendezvousPoint: "Simpo - Karposh",
                    selected: false
                }
            ],
            destinations: [
                { destination: "Skopje City Mall" },
                { destination: "Vero Jumbo" },
                { destination: "Staro Lisiche" },
                { destination: "Capitol Mall" },
                { destination: "Ramstore Mall" }
            ]
        });
    }

    // functions
    fillRendezvousPointsTextField() {
        var rendezvousPointsTextField = document.getElementById("rendezvousPoints");
        rendezvousPointsTextField.value = "";
        var counter = 0;

        for(var i = 0; i<this.state.rendezvousPoints.length; i++) {
            if(this.state.rendezvousPoints[i].selected === true) {
                rendezvousPointsTextField.value += this.state.rendezvousPoints[i].rendezvousPoint + ", ";
                counter++;
            }
        }

        counter > 0 ?
            this.setState({
                rendezvousPointSelected: true
            }) :
            this.setState({
                rendezvousPointSelected: false
            });

        rendezvousPointsTextField.value = rendezvousPointsTextField.value.substr(0, rendezvousPointsTextField.value.length - 2);

        this.setState({
            addDialogOpen: false
        });
    }

    processCheckedRendezvousPoints() {
        var checkboxes = document.getElementById("rendezvousPointsForm").children;
        var rendezvousPoints = this.state.rendezvousPoints;

        for(var i = 0; i<checkboxes.length; i++) {
            rendezvousPoints[i].selected = checkboxes[i].control.checked;
        }

        this.setState({
            rendezvousPoints: rendezvousPoints
        });

        this.fillRendezvousPointsTextField();
    }

}

export default CreateOfferForm;