import React, { Component } from "react";
import InventoryDataService from "../../services/inventory.service";

import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography} from "@material-ui/core";
import Container from '@material-ui/core/Container';
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
class AddDeviceComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeDeviceType = this.onChangeDeviceType.bind(this);
        this.onChangePurchaseDate = this.onChangePurchaseDate.bind(this);
        this.onChangeWarrantyDate = this.onChangeWarrantyDate.bind(this);
        this.onChangeDeviceStore = this.onChangeDeviceStore.bind(this);
        this.onChangeDeviceDescription = this.onChangeDeviceDescription.bind(this);
        this.saveDevice = this.saveDevice.bind(this);
        this.newDevice = this.newDevice.bind(this);

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
    onChangeDeviceType(e) {
        this.setState({
            device_type: e.target.value
        });
    }

    onChangePurchaseDate(e) {
        this.setState({
            purchase_date: e.target.value
        });
    }

    onChangeWarrantyDate(e) {
        this.setState({
            warranty_date: e.target.value
        });
    }

    onChangeDeviceStore(e) {
        this.setState({
            device_store: e.target.value
        });
    }

    onChangeDeviceDescription(e) {
        this.setState({
            device_description: e.target.value
        });
    }

    saveDevice() {
        var data = {
            device_type: this.state.device_type,
            purchase_date: this.state.purchase_date,
            warranty_date: this.state.warranty_date,
            device_store: this.state.device_store,
            device_description: this.state.device_description,
        };

        InventoryDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    device_type: response.data.device_type,
                    purchase_date: response.data.purchase_date,
                    warranty_date: response.data.warranty_date,
                    device_store: response.data.device_store,
                    device_description: response.data.device_description,
                    published: response.data.published,
                    message: "New device was created successfully!",
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newDevice() {
        this.setState({
            id: null,
            device_type: "",
            purchase_date: "",
            warranty_date: "",
            device_store: "",
            device_description: "",
            published: false,

            submitted: false
        });
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <Container className={classes.home_text} >
                    <Typography variant="h4">
                        Inventory
                    </Typography>
                    <Typography variant="h6">
                        Create a new device
                    </Typography>

                    <div>
                        <div className={classes.textField}>
                            <TextField
                                label="Type"
                                name="type"
                                value={this.state.device_type}
                                onChange={this.onChangeDeviceType}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Purchase_date"
                                name="purchase_date"
                                value={this.state.purchase_date}
                                onChange={this.onChangePurchaseDate}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Warrenty_date"
                                name="warrenty_date"
                                value={this.state.warranty_date}
                                onChange={this.onChangeWarrantyDate}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Store"
                                name="store"
                                value={this.state.device_store}
                                onChange={this.onChangeDeviceStore}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Description"
                                name="description"
                                value={this.state.device_description}
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
                            List businesses
                        </Button>
                        <p>{this.state.message}</p>
                    </div>

                </Container>

            </div>

        );
    }
}

export default withStyles(styles)(AddDeviceComponent)
