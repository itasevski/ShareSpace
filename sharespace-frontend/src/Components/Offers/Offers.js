import React, {Component} from "react";
import {
    Button,
    Grid, IconButton, MenuItem, Select,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, TextField, Tooltip
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./Offers.css";
import {ArrowDownward, ArrowUpward, Clear, VerifiedUserRounded} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import FiltersCustomDialog from "../../Utilities/FiltersCustomDialog/FiltersCustomDialog";
import {Link} from "react-router-dom";

class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            filters: {},
            sortOptions: [],
            sortCriteria: "publisher"
        }
    }

    // handlers
    handleDialogOpen = () => {
        this.setState({
            dialogOpen: true
        });
    }

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        });
    }

    handleAppliedFilters = (appliedFilters) => {
        this.setState({
            filters: appliedFilters
        });
    }

    handleSortCriteriaChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div id="offersContainer">
                <Grid container>
                    <Grid item xs={6}>
                        <Grid container justifyContent="center" style={{ marginBottom: "10px" }}>
                            <Typography variant="subtitle1">Your location: {this.props.userCity}, {this.props.userMunicipality}</Typography>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Link to="/createOffer" style={{ textDecoration: "none", color: "white" }}>
                                <Button color="primary" variant="contained">
                                    Create offer
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justifyContent="center">
                            <Box mr={4}>
                                <Button variant="contained" style={{ backgroundColor: "green", color: "white" }} onClick={this.handleDialogOpen}>
                                    Apply filters
                                </Button>
                                <FiltersCustomDialog dialogOpen={this.state.dialogOpen}
                                                     handleDialogOpen={this.handleDialogOpen}
                                                     handleDialogClose={this.handleDialogClose}
                                                     appliedFiltersHandler={this.handleAppliedFilters} />
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Active filters:</Typography>
                                {this.state.filters.myLocation === true &&
                                <Typography variant="subtitle2">
                                    <IconButton onClick={() => this.handleFilterClear("myLocation")}>
                                        <Clear style={{ fontSize: "15px" }}/>
                                    </IconButton>
                                    My Location
                                </Typography>
                                }
                                {this.state.filters.passengerOffers === true &&
                                <Typography variant="subtitle2">
                                    <IconButton onClick={() => this.handleFilterClear("passengerOffers")}>
                                        <Clear style={{ fontSize: "15px" }} />
                                    </IconButton>
                                    Passenger offers
                                </Typography>
                                }
                                {this.state.filters.driverOffers === true &&
                                <Typography variant="subtitle2">
                                    <IconButton onClick={() => this.handleFilterClear("driverOffers")}>
                                        <Clear style={{ fontSize: "15px" }} />
                                    </IconButton>
                                    Driver offers
                                </Typography>
                                }
                                {this.state.filters.createdToday === true &&
                                <Typography variant="subtitle2">
                                    <IconButton onClick={() => this.handleFilterClear("createdToday")}>
                                        <Clear style={{ fontSize: "15px" }} />
                                    </IconButton>
                                    Created today
                                </Typography>
                                }
                                {this.state.filters.createdYesterday === true &&
                                <Typography variant="subtitle2">
                                    <IconButton onClick={() => this.handleFilterClear("createdYesterday")}>
                                        <Clear style={{ fontSize: "15px" }} />
                                    </IconButton>
                                    Created yesterday
                                </Typography>
                                }
                                {this.state.filters.personLimitOneFive === true &&
                                <Typography variant="subtitle2">
                                    <IconButton onClick={() => this.handleFilterClear("personLimitOneFive")}>
                                        <Clear style={{ fontSize: "15px" }} />
                                    </IconButton>
                                    Person limit (1-5)
                                </Typography>
                                }
                                {this.state.filters.personLimitSixTen === true &&
                                <Typography variant="subtitle2">
                                    <IconButton onClick={() => this.handleFilterClear("personLimitSixTen")}>
                                        <Clear style={{ fontSize: "15px" }} />
                                    </IconButton>
                                    Person limit (6-10)
                                </Typography>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                    <hr style={{ width: "80%", color: "gray", marginTop: "20px", marginBottom: "30px" }}/>
                    <Grid item xs={3}>
                        <Grid container justifyContent="center">
                            <Box>
                                <Typography variant="subtitle1">Sort by:</Typography>
                                <Grid container>
                                    <Select
                                        id="sortCriteria"
                                        name="sortCriteria"
                                        value={this.state.sortCriteria}
                                        onChange={this.handleSortCriteriaChange}
                                        style={{ width: "150px" }}
                                    >
                                        {this.state.sortOptions.map((sortOption) => {
                                            return (
                                                <MenuItem value={sortOption.value}>{sortOption.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <Box ml={1}>
                                        <Tooltip title="Ascending">
                                            <IconButton>
                                                <ArrowUpward style={{ fontSize: "18px" }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Descending">
                                            <IconButton>
                                                <ArrowDownward style={{ fontSize: "18px" }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container justifyContent="flex-end">
                            <TextField placeholder="Enter keywords..." style={{ marginRight: "15px" }} />
                            <Button variant="outlined" color="primary">Search</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "30px" }}>
                        <Grid container justifyContent="center">
                            <TableContainer style={{ width: "95%" }}>
                                <Table aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Publisher</TableCell>
                                            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Offer type</TableCell>
                                            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Date and time</TableCell>
                                            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Person limit</TableCell>
                                            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Rendezvous points</TableCell>
                                            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Destination</TableCell>
                                            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Vehicle</TableCell>
                                            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>People</TableCell>
                                            <TableCell> </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell scope="row">
                                                <Grid container alignItems="center">
                                                    <Grid item xs={4}>
                                                        <Grid container>
                                                            <VerifiedUserRounded style={{ fontSize: "100px" }} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Grid container>
                                                            <Typography variant="h6">Aleksandar Antov</Typography>
                                                        </Grid>
                                                        <Typography variant="subtitle2">Published at: 17.07.2021, 18:34</Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">Passenger offer</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">18.07.2021, 16:00</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">3</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">Shampionche - Kisela Voda</Typography>
                                                <Typography variant="subtitle1">Rampa - Kisela Voda</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">Staro Lisiche</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">Taxi</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">- Aleksandar Antov</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" style={{ backgroundColor: "green", color: "white" }}>JOIN</Button>
                                                <Typography variant="subtitle2">Expires in: 20h</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell scope="row">
                                                <Grid container alignItems="center">
                                                    <Grid item xs={4}>
                                                        <Grid container>
                                                            <VerifiedUserRounded style={{ fontSize: "100px" }} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Grid container>
                                                            <Typography variant="h6">Martin Martinov</Typography>
                                                        </Grid>
                                                        <Typography variant="subtitle2">Published at: 17.07.2021, 19:58</Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">Driver offer</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">18.07.2021, 19:00</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">3</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">Shampionche - Kisela Voda</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">Skopje City Mall</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">Volswagen Polo 2005</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">- Martin Martinov</Typography>
                                                <Typography variant="subtitle1">- Panche Pankov</Typography>
                                                <Typography variant="subtitle1">- Jovan Jovanov</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" disabled>FULL</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            filters: {
                myLocation: true,
                passengerOffers: false,
                driverOffers: false,
                createdToday: false,
                createdYesterday: false,
                personLimitOneFive: false,
                personLimitSixTen: false
            },
            sortOptions: [
                {
                    name: "Publisher",
                    value: "publisher"
                },
                {
                    name: "Date and time",
                    value: "dateAndTime"
                },
                {
                    name: "Person limit",
                    value: "personLimit"
                },
                {
                    name: "Destination",
                    value: "destination"
                }
            ]
        });
    }

    handleFilterClear(data) {
        var filters = {...this.state.filters};
        switch (data) {
            case "myLocation":
                filters.myLocation = false;
                this.setState({
                    filters: filters
                });
                return;
            case "passengerOffers":
                filters.passengerOffers = false;
                this.setState({
                    filters: filters
                });
                return;
            case "driverOffers":
                filters.driverOffers = false;
                this.setState({
                    filters: filters
                });
                return;
            case "createdToday":
                filters.createdToday = false;
                this.setState({
                    filters: filters
                });
                return;
            case "createdYesterday":
                filters.createdYesterday = false;
                this.setState({
                    filters: filters
                });
                return;
            case "personLimitOneFive":
                filters.personLimitOneFive = false;
                this.setState({
                    filters: filters
                });
                return;
            case "personLimitSixTen":
                filters.personLimitSixTen = false;
                this.setState({
                    filters: filters
                });
                return;
            default:
                return;
        }
    }

}

export default Offers;