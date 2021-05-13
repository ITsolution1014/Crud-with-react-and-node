import React, { Component } from "react";
import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography} from "@material-ui/core";

import Container from '@material-ui/core/Container';
import CustomerDataService from "../../services/customer.service";
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
class AddCustomers extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeFax = this.onChangeFax.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeZipCode = this.onChangeZipCode.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.saveCustomers = this.saveCustomers.bind(this);
        this.newCustomers = this.newCustomers.bind(this);

        this.state = {
            id: null,
            first_name: "",
            last_name: "",
            phone: "",
            fax: "",
            email: "",
            company: "",
            address: "",
            city: "",
            state: "",
            zip_code: "",
            notes: "",
        };
    }
    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        })
    }

    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeFax(e) {
        this.setState({
            fax: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        })
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onChangeState(e) {
        this.setState({
            state: e.target.value
        });
    }

    onChangeZipCode(e) {
        this.setState({
            zip_code: e.target.value
        });
    }

    onChangeNotes(e) {
        this.setState({
            notes: e.target.value
        });
    }

    saveCustomers() {
        var data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            fax: this.state.fax,
            email: this.state.email,
            company: this.state.company,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip_code: this.state.zip_code,
            notes: this.state.notes,
        };
        console.log(data)
        CustomerDataService.create(data)
            .then(response => {
                this.setState({

                    id: response.data.id,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    phone: response.data.phone,
                    fax: response.data.fax,
                    email: response.data.email,
                    company: response.data.company,
                    address: response.data.address,
                    city: response.data.city,
                    state: response.data.state,
                    zip_code: response.data.zip_code,
                    notes: response.data.notes,
                    message: "New Customer was created successfully!",
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newCustomers() {
        this.setState({
            id: null,
            first_name: "",
            last_name: "",
            phone: "",
            fax: "",
            email: "",
            company: "",
            address: "",
            city: "",
            state: "",
            zip_code: "",
            notes: "",
        });
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <Container className={classes.home_text} >
                    <Typography variant="h4">
                        Customer
                    </Typography>
                    <Typography variant="h6">
                        Create a new Customer
                    </Typography>

                    <div>
                        <div className={classes.textField}>
                            <TextField
                                label="First Name"
                                name="fist_name"
                                value={this.state.fist_name}
                                onChange={this.onChangeFirstName}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Last Name"
                                name="last_name"
                                value={this.state.last_name}
                                onChange={this.onChangeLastName}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Phone"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.onChangePhone}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Fax"
                                name="fax"
                                value={this.state.fax}
                                onChange={this.onChangeFax}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChangeCompany}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Address"
                                name="address"
                                value={this.state.address}
                                onChange={this.onChangeAddress}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="City"
                                name="city"
                                value={this.state.city}
                                onChange={this.onChangeCity}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="State"
                                name="state"
                                value={this.state.state}
                                onChange={this.onChangeState}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Zip Code"
                                name="zip_code"
                                value={this.state.zip_code}
                                onChange={this.onChangeZipCode}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Notes"
                                name="notes"
                                value={this.state.notes}
                                onChange={this.onChangeNotes}
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
                            href={"/customer"}
                            onClick={this.saveCustomers}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            endIcon={<KeyboardReturnIcon />}
                            href={"/customer"}
                            className={classes.business_edit_button}
                        >
                            Cancel
                        </Button>
                    </div>

                </Container>

            </div>

        );
    }
}

export default withStyles(styles)(AddCustomers)
