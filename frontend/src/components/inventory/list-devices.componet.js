import React, { Component } from "react";
import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography, ListItem} from "@material-ui/core";

import Container from '@material-ui/core/Container';
import InventoryDataService from "../../services/inventory.service";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import BusinessDataService from "../../services/business.service";

class listDevicesComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            currentDevice: {
                id: null,
                device_type: "",
                purchase_date: "",
                warranty_date: "",
                device_store: "",
                device_description: "",
                published: false,
            },
            currentIndex: -1,
            count: 1,
        };
    }


    componentDidMount() {
        this.retrieveCustomers();
    }
    refreshList() {
        this.retrieveCustomers();
        this.setState({
            currentDevice: null,
            currentIndex: -1
        });
    }
    retrieveCustomers() {
        InventoryDataService.getAll()
            .then(response => {
                this.setState({
                    devices: response.data,
                    count:response.data.length
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    setActiveDevice(device, index) {
        this.setState({
            currentDevice: device,
            currentIndex: index
        });
    }

    deleteDevice(id) {
        InventoryDataService.delete(id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/inventory')
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { classes } = this.props
        const { devices, currentDevice, currentIndex, count } = this.state;
        return (
            <div>
                <Container className={classes.home_text} >
                    <Typography variant="h4">
                        Inventory
                    </Typography>
                    <Typography variant="h6">
                        List of devices
                    </Typography>
                </Container>
                <Container>
                    <div className={classes.customer_create}>
                        <Button
                            size="medium"
                            color="primary"
                            variant="contained"
                            href={"/inventory/add-device"}>
                            Add a new device
                        </Button>
                    </div>
                    <div>
                        <ListItem divider>
                            <Typography variant="h6">
                                {count} Devices
                            </Typography>
                        </ListItem>
                        {devices &&
                        devices.map((device, index) => (
                            <ListItem
                                selected={index === currentIndex}
                                onClick={() => this.setActiveDevice(device, index)}
                                divider
                                button
                                key={index}
                                className={classes.business_button}>

                                <div><Typography> {device.device_type}</Typography></div>
                                <div>
                                    <Button
                                        href={"/inventory/" + device.id + "/edit-device/"}
                                        color="primary"
                                    >
                                        Edit
                                    </Button>

                                    <IconButton
                                        onClick={(e)=>{
                                            this.deleteDevice(device.id)
                                        }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>




                            </ListItem>
                        ))}
                    </div>
                </Container>

            </div>

        );
    }
}

export default withStyles(styles)(listDevicesComponent)
