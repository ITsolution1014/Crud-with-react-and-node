import React, { Component } from "react";
import SlotDataService from "../../services/slot.service";

import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography} from "@material-ui/core";
import Container from '@material-ui/core/Container';
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
class AddDeviceComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLength = this.onChangeLength.bind(this);
        this.onChangeExpiration = this.onChangeExpiration.bind(this);
        this.saveSlot = this.saveSlot.bind(this);
        this.newSlot = this.newSlot.bind(this);

        this.state = {
            id: null,
            device_type: "",
            purchase_date: "",
            warranty_date: "",
            device_store: "",
            device_description: "",
            published: false,

            submitted: false
        };
    }

    componentDidMount() {
        this.getDevice(this.props.match.params.id);
        // this.getBusiness
        // this.getAllBusinessDevice(this.props.match.params.id);
    }

    getDevice(id) {
        alert(id);
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeLength(e) {
        this.setState({
            length: e.target.value
        });
    }

    onChangeExpiration(e) {
        this.setState({
            expiration: e.target.value
        });
    }


    saveSlot() {
        var data = {
            name: this.state.name,
            length: this.state.length,
            expiration: this.state.expiration,
            file_id: this.state.file_id,
            device_id: this.state.device_id,
            location_id: this.state.location_id
        };

        SlotDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    length: response.data.length,
                    expiration: this.state.expiration,
                    file_id: response.data.file_id,
                    device_id: response.data.device_id,
                    location_id: response.data.location_id
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newSlot() {
        this.setState({
            id: null,
            name: "",
            length: "",
            expiration: "",
            file_id: "",
            device_id: "",
            location_id: "",
        });
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <Container className={classes.home_text} >
                    <Typography variant="h4">
                        Slot
                    </Typography>
                    <Typography variant="h6">
                        Create a new slot
                    </Typography>

                    <div>
                        <div className={classes.textField}>
                            <TextField
                                label="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Length"
                                name="length"
                                value={this.state.length}
                                onChange={this.onChangeLength}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Expiration"
                                name="expiration"
                                value={this.state.expiration}
                                onChange={this.onChangeExpiration}
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
                            href={"/inventory"}
                            onClick={this.saveDevice}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            endIcon={<KeyboardReturnIcon />}
                            href={"/inventory"}
                            className={classes.business_edit_button}
                        >
                            Cancel
                        </Button>
                        <p>{this.state.message}</p>
                    </div>

                </Container>

            </div>

        );
    }
}

export default withStyles(styles)(AddDeviceComponent)
