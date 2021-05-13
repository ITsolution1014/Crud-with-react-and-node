import React, { Component } from "react";
import SlotDataService from "../../services/slot.service";

import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

class EditSlotComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLength = this.onChangeLength.bind(this);
        this.onChangeExpiration = this.onChangeExpiration.bind(this);
        this.onChangeFileId = this.onChangeFileId.bind(this);

        this.getSlot = this.getSlot.bind(this);
        this.updateSlot = this.updateSlot.bind(this);

        this.state = {
            currentSlot: {
                id: null,
                name: "",
                length: "",
                expiration: "",
                file_id: "",

            }
        };
    }

    componentDidMount() {
        this.getSlot(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentSlot: {
                    ...prevState.currentSlot,
                    name: name
                }
            };
        });
    }

    onChangeLength(e) {
        const length = e.target.value;

        this.setState(prevState => ({
            currentSlot: {
                ...prevState.currentSlot,
                length: length
            }
        }));
    }

    onChangeExpiration(e) {
        const expiration = e.target.value;

        this.setState(prevState => ({
            currentSlot: {
                ...prevState.currentSlot,
                expiration: expiration
            }
        }));
    }

    onChangeFileId(e) {
        const file_id = e.target.value;

        this.setState(prevState => ({
            currentSlot: {
                ...prevState.currentSlot,
                file_id: file_id
            }
        }));
    }

    getSlot(id) {
        SlotDataService.get(id)
            .then(response => {
                this.setState({
                    currentSlot: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateSlot() {
        SlotDataService.update(
            this.state.currentSlot.id,
            this.state.currentSlot
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Device was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        const { currentSlot } = this.state;
        const { classes } = this.props

        return (
            <div>
                <Container className={classes.home_text} >
                    <Typography variant="h4">
                        Slot
                    </Typography>
                    <Typography variant="h6">
                        Edit this slot
                    </Typography>

                    <div>
                        <div className={classes.textField}>
                            <TextField
                                label="Name"
                                name="name"
                                value={currentSlot.name}
                                onChange={this.onChangeName}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Length"
                                name="length"
                                value={currentSlot.length}
                                onChange={this.onChangeLength}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Expiration"
                                name="expiration"
                                value={currentSlot.expiration}
                                onChange={this.onChangeExpiration}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="FileId"
                                name="file_id"
                                value={currentSlot.file_id}
                                onChange={this.onChangeFileId}
                                required
                                className={classes.inputWidth}
                            />
                        </div>


                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            type="submit"
                            startIcon={<SaveIcon />}
                            onClick={this.updateSlot}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            endIcon={<KeyboardReturnIcon />}
                            href={"/slot"}
                            className={classes.business_edit_button}
                        >
                            List businesses
                        </Button>

                        <p>{this.state.message}</p>
                    </div>
                </Container>

            </div>
        );
    }
}

export default withStyles(styles)(EditSlotComponent)
