import React, { Component } from "react";
import InventoryDataService from "../../services/inventory.service";

import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

class EditBusinessComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeDeviceType = this.onChangeDeviceType.bind(this);
        this.onChangePurchaseDate = this.onChangePurchaseDate.bind(this);
        this.onChangeWarrantyDate = this.onChangeWarrantyDate.bind(this);
        this.onChangeDeviceStore = this.onChangeDeviceStore.bind(this);
        this.onChangeDeviceDescription = this.onChangeDeviceDescription.bind(this);

        this.getDevice = this.getDevice.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateDevice = this.updateDevice.bind(this);
        this.deleteDevice = this.deleteDevice.bind(this);

        this.state = {
            currentDevice: {
                id: null,
                device_type: "",
                purchase_date: "",
                warranty_date: "",
                device_store: "",
                device_description: "",
                published: false,

                submitted: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getDevice(this.props.match.params.id);
    }

    onChangeDeviceType(e) {
        const device_type = e.target.value;

        this.setState(function (prevState) {
            return {
                currentDevice: {
                    ...prevState.currentDevice,
                    device_type: device_type
                }
            };
        });
    }

    onChangePurchaseDate(e) {
        const purchase_date = e.target.value;

        this.setState(prevState => ({
            currentDevice: {
                ...prevState.currentDevice,
                purchase_date: purchase_date
            }
        }));
    }

    onChangeWarrantyDate(e) {
        const warranty_date = e.target.value;

        this.setState(prevState => ({
            currentDevice: {
                ...prevState.currentDevice,
                warranty_date: warranty_date
            }
        }));
    }

    onChangeDeviceStore(e) {
        const device_store = e.target.value;

        this.setState(prevState => ({
            currentDevice: {
                ...prevState.currentDevice,
                device_store: device_store
            }
        }));
    }

    onChangeDeviceDescription(e) {
        const device_description = e.target.value;

        this.setState(prevState => ({
            currentDevice: {
                ...prevState.currentDevice,
                device_description: device_description
            }
        }));
    }


    getDevice(id) {
        InventoryDataService.get(id)
            .then(response => {
                this.setState({
                    currentDevice: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentDevice.id,
            device_type: this.currentDevice.device_type,
            purchase_date: this.currentDevice.purchase_date,
            warranty_date: this.currentDevice.warranty_date,
            device_store: this.currentDevice.device_store,
            device_description: this.currentDevice.device_description,
            published: status
        };

        InventoryDataService.update(this.state.currentDevice.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentDevice: {
                        ...prevState.currentDevice,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateDevice() {
        InventoryDataService.update(
            this.state.currentDevice.id,
            this.state.currentDevice
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

    deleteDevice() {
        InventoryDataService.delete(this.state.currentDevice.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/inventory')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentDevice } = this.state;
        const { classes } = this.props

        return (
            <div>
                <Container className={classes.home_text} >
                    <Typography variant="h4">
                        Device
                    </Typography>
                    <Typography variant="h6">
                        Create a new Device
                    </Typography>
                    <React.Fragment>
                        {this.state.submitted ? (
                            <div>
                                <h4>You submitted successfully!</h4>
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    onClick={this.newDevice}>
                                    Add
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <div className={classes.textField}>
                                    <TextField
                                        label="DeviceType"
                                        name="device_type"
                                        value={currentDevice.device_type}
                                        onChange={this.onChangeDeviceType}
                                        required
                                className={classes.inputWidth}
                                    />
                                </div>

                                <div className={classes.textField}>
                                    <TextField
                                        label="PurchaseDate"
                                        name="purchase_date"
                                        value={currentDevice.purchase_date}
                                        onChange={this.onChangePurchaseDate}
                                        required
                                className={classes.inputWidth}
                                    />
                                </div>

                                <div className={classes.textField}>
                                    <TextField
                                        label="WarrantyDate"
                                        name="warranty_date"
                                        value={currentDevice.warranty_date}
                                        onChange={this.onChangeWarrantyDate}
                                        required
                                className={classes.inputWidth}
                                    />
                                </div>

                                <div className={classes.textField}>
                                    <TextField
                                        label="DeviceStore"
                                        name="device_store"
                                        value={currentDevice.device_store}
                                        onChange={this.onChangeDeviceStore}
                                        required
                                className={classes.inputWidth}
                                    />
                                </div>

                                <div className={classes.textField}>
                                    <TextField
                                        label="DeviceDescription"
                                        name="device_description"
                                        value={currentDevice.device_description}
                                        onChange={this.onChangeDeviceDescription}
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
                                    onClick={this.updateDevice}
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
                                    List businesses
                                </Button>

                                <p>{this.state.message}</p>
                            </div>
                        )}
                    </React.Fragment>
                </Container>

            </div>
        );
    }
}

export default withStyles(styles)(EditBusinessComponent)
