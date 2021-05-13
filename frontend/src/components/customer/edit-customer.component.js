import React, { Component } from "react";
import CustomerDataService from "../../services/customer.service";
import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import SaveIcon from '@material-ui/icons/Save';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

class EditCustomerComponent extends Component {
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
        this.getCustomers = this.getCustomers.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateCustomers = this.updateCustomers.bind(this);
        this.deleteCustomers = this.deleteCustomers.bind(this);

        this.state = {
            currentCustomer: {
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
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getCustomers(this.props.match.params.id);
    }

    onChangeFirstName(e) {
        const first_name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCustomer: {
                    ...prevState.currentCustomer,
                    first_name: first_name
                }
            };
        });
    }

    onChangeLastName(e) {
        const last_name = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                last_name: last_name
            }
        }));
    }

    onChangePhone(e) {
        const phone = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                phone: phone
            }
        }));
    }

    onChangeFax(e) {
        const fax = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                fax: fax
            }
        }));
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                email: email
            }
        }));
    }

    onChangeCompany(e) {
        const company = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                company: company
            }
        }));
    }

    onChangeAddress(e) {
        const address = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                address: address
            }
        }));
    }

    onChangeCity(e) {
        const city = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                city: city
            }
        }));
    }

    onChangeState(e) {
        const state = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                state: state
            }
        }));
    }

    onChangeZipCode(e) {
        const zip_code = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                zip_code: zip_code
            }
        }));
    }

    onChangeNotes(e) {
        const notes = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                notes: notes
            }
        }));
    }

    getCustomers(id) {
        CustomerDataService.get(id)
            .then(response => {
                this.setState({
                    currentCustomer: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
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

        CustomerDataService.update(this.state.currentCustomer.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentCustomer: {
                        ...prevState.currentCustomer,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateCustomers() {
        CustomerDataService.update(
            this.state.currentCustomer.id,
            this.state.currentCustomer
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Contract was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCustomers() {
        CustomerDataService.delete(this.state.currentCustomer.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/customers')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentCustomer } = this.state;
        const { classes } = this.props

        return (
            <div>
                <Container className={classes.home_text} >
                    <Typography variant="h4">
                        Customers
                    </Typography>
                    <Typography variant="h6">
                        Edit this customer
                    </Typography>

                    <div>
                        <div className={classes.textField}>
                            <TextField
                                label="First Name"
                                name="first_name"
                                value={currentCustomer.first_name}
                                onChange={this.onChangeFirstName}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Last Name"
                                name="last_name"
                                value={currentCustomer.last_name}
                                onChange={this.onChangeLastName}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Phone"
                                name="phone"
                                value={currentCustomer.phone}
                                onChange={this.onChangePhone}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Fax"
                                name="fax"
                                value={currentCustomer.fax}
                                onChange={this.onChangeFax}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Email"
                                name="email"
                                value={currentCustomer.email}
                                onChange={this.onChangeEmail}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Company"
                                name="company"
                                value={currentCustomer.company}
                                onChange={this.onChangeCompany}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Address"
                                name="address"
                                value={currentCustomer.address}
                                onChange={this.onChangeAddress}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="City"
                                name="city"
                                value={currentCustomer.city}
                                onChange={this.onChangeCity}
                                required
                                className={classes.inputWidth}
                            />
                        </div>


                        <div className={classes.textField}>
                            <TextField
                                label="State"
                                name="state"
                                value={currentCustomer.state}
                                onChange={this.onChangeState}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Zip Code"
                                name="zip_code"
                                value={currentCustomer.zip_code}
                                onChange={this.onChangeZipCode}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Notes"
                                name="notes"
                                value={currentCustomer.notes}
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
                            href={"/customer"}
                            startIcon={<SaveIcon />}
                            onClick={this.updateCustomers}
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

export default withStyles(styles)(EditCustomerComponent)
