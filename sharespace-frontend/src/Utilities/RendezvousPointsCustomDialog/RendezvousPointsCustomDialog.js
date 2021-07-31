import React from "react";
import Transition from "../Transition/Transition";
import {
    Checkbox, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    FormLabel, Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const RendezvousPointsCustomDialog = (props) => {
    return (
        <Dialog
            open={props.dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleDialogClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            {props.isViewDialog === false &&
                <DialogTitle id="alert-dialog-slide-title">Select rendezvous points</DialogTitle>
            }
            {props.isViewDialog === true &&
                <DialogTitle id="alert-dialog-slide-title">Selected rendezvous points</DialogTitle>
            }
            <DialogContent>
                {props.isViewDialog === false &&
                    <FormLabel component="legend">Available rendezvous points:</FormLabel>
                }
                <FormGroup id={props.isViewDialog === true ? "" : "rendezvousPointsForm"}>
                    {props.isViewDialog === true ?
                        props.isRendezvousPointSelected === true ?
                        props.rendezvousPoints
                            .filter(rendezvousPoint => rendezvousPoint.selected === true)
                            .map(rendezvousPoint => {
                                return (
                                    <Typography variant="subtitle1">
                                        {rendezvousPoint.rendezvousPoint}
                                    </Typography>
                                )
                            })
                            :
                            <Typography variant="h6" color="textSecondary">No rendezvous points selected.</Typography>
                        :
                        props.rendezvousPoints.map((rendezvousPoint) => {
                                return (
                                    <FormControlLabel
                                        control={<Checkbox color="primary" name={rendezvousPoint.rendezvousPoint}/>}
                                        label={rendezvousPoint.rendezvousPoint}
                                    />
                                );
                            })
                    }
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleDialogClose} color="primary">
                    Close
                </Button>
                {props.isViewDialog === false &&
                    <Button onClick={props.handleDialogSubmit} color="primary">
                        Submit
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default RendezvousPointsCustomDialog;