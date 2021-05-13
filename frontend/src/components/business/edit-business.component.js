import React, { Component } from "react";
import BusinessDataService from "../../services/business.service";
import ContractsDataService from "../../services/contracts.service";

import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import SaveIcon from '@material-ui/icons/Save';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class EditBusinessComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeContractsId = this.onChangeContractsId.bind(this);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeZipCode = this.onChangeZipCode.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.onChangeContactFname = this.onChangeContactFname.bind(this);
        this.onChangeContactLname = this.onChangeContactLname.bind(this);
        this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
        this.onChangeContactFax = this.onChangeContactFax.bind(this);
        this.onChangeContactEmail = this.onChangeContactEmail.bind(this);

        this.getBusiness = this.getBusiness.bind(this);
        this.getContract = this.getContract.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateBusiness = this.updateBusiness.bind(this);
        this.deleteBusiness = this.deleteBusiness.bind(this);

        this.state = {
            contracts: [],
            currentBusiness: {
                id: null,
                contracts_id: "",
                company_name: "",
                address: "",
                city: "",
                state: "",
                zip_code: "",
                notes: "",
                contact_fname: "",
                contact_lname: "",
                contact_phone: "",
                contact_fax: "",
                contact_email: "",
                published: false,
            },
            currentContract: "",
            message: ""
        };
    }


    retrieveContracts() {
        ContractsDataService.getAll()
            .then(response => {
                this.setState({
                    contracts: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveContracts();
        this.getBusiness(this.props.match.params.id);
    }

    onChangeContractsId(e) {
        const contracts_id = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBusiness: {
                    ...prevState.currentBusiness,
                    contracts_id: contracts_id
                }
            };
        });
    }

    onChangeCompanyName(e) {
        const company_name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBusiness: {
                    ...prevState.currentBusiness,
                    company_name: company_name
                }
            };
        });
    }

    onChangeAddress(e) {
        const address = e.target.value;

        this.setState(prevState => ({
            currentBusiness: {
                ...prevState.currentBusiness,
                address: address
            }
        }));
    }

    onChangeCity(e) {
        const city = e.target.value;

        this.setState(prevState => ({
            currentBusiness: {
                ...prevState.currentBusiness,
                city: city
            }
        }));
    }

    onChangeState(e) {
        const state = e.target.value;

        this.setState(prevState => ({
            currentBusiness: {
                ...prevState.currentBusiness,
                state: state
            }
        }));
    }

    onChangeZipCode(e) {
        const zip_code = e.target.value;

        this.setState(prevState => ({
            currentBusiness: {
                ...prevState.currentBusiness,
                zip_code: zip_code
            }
        }));
    }

    onChangeNotes(e) {
        const notes = e.target.value;

        this.setState(prevState => ({
            currentBusiness: {
                ...prevState.currentBusiness,
                notes: notes
            }
        }));
    }

    onChangeContactFname(e) {
        const contact_fname = e.target.value;

        this.setState(prevState => ({
            currentBusiness: {
                ...prevState.currentBusiness,
                contact_fname: contact_fname
            }
        }));
    }

    onChangeContactLname(e) {
        const contact_lname = e.target.value;

        this.setState(prevState => ({
            currentBusiness: {
                ...prevState.currentBusiness,
                contact_lname: contact_lname
            }
        }));
    }

    onChangeContactPhone(e) {
        const contact_phone = e.target.value;

        this.setState(prevState => ({
            currentBusiness: {
                ...prevState.currentBusiness,
                contact_phone: contact_phone
            }
        }));
    }

    onChangeContactFax(e) {
        const contact_fax = e.target.value;

        this.setState(prevState => ({
            currentBusiness: {
                ...prevState.currentBusiness,
                contact_fax: contact_fax
            }
        }));
    }

    onChangeContactEmail(e) {
        const contact_email = e.target.value;

        this.setState(prevState => ({
            currentBusiness: {
                ...prevState.currentBusiness,
                contact_email: contact_email
            }
        }));
    }

    getBusiness(id) {
        BusinessDataService.get(id)
            .then(response => {
                this.setState({
                    currentBusiness: response.data
                });
                this.getContract(response.data.contracts_id);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getContract(id) {
        ContractsDataService.get(id)
            .then(response => {
                this.setState({
                    currentContract: response.data.id
                });
                console.log(response.data.id);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentBusiness.id,
            contracts_id: this.state.currentBusiness.contracts_id,
            company_name: this.state.currentBusiness.company_name,
            address: this.state.currentBusiness.address,
            city: this.state.currentBusiness.currentBusiness.city,
            state: this.state.currentBusiness.currentBusiness.state,
            zip_code: this.state.currentBusiness.currentBusiness.zip_code,
            notes: this.state.currentBusiness.notes,
            contact_fname: this.state.currentBusiness.contact_fname,
            contact_lname: this.state.currentBusiness.contact_lname,
            contact_phone: this.state.currentBusiness.contact_phone,
            contact_fax: this.state.currentBusiness.contact_fax,
            contact_email: this.state.currentBusiness.contact_email,
            published: status
        };

        BusinessDataService.update(this.state.currentBusiness.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentBusiness: {
                        ...prevState.currentBusiness,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateBusiness() {
        BusinessDataService.update(
            this.state.currentBusiness.id,
            this.state.currentBusiness
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The business was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteBusiness() {
        BusinessDataService.delete(this.state.currentBusiness.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/businesses')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { contracts, currentBusiness, currentContract } = this.state;
        const { classes } = this.props
        console.log(currentContract)
        return (
            <div>
                <Container className={classes.home_text} >
                    <Typography variant="h4">
                        Businesses
                    </Typography>
                    <Typography variant="h6">
                        Edit this business
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">Select contract</InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            defaultValue={ currentBusiness.id  }
                            onChange={this.onChangeContractsId}
                            // className={classes.selectEmpty}
                        >

                            {contracts &&
                            contracts.map((contract, index) => (
                                <MenuItem value={contract.id} key={index}>{contract.name}</MenuItem>
                            ))}
                        </Select>

                    </FormControl>
                    <div>
                        <div className={classes.textField}>
                            <TextField
                                label="CompanyName"
                                name="company_name"
                                value={currentBusiness.company_name}
                                onChange={this.onChangeCompanyName}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Address"
                                name="address"
                                value={currentBusiness.address}
                                onChange={this.onChangeAddress}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="City"
                                name="city"
                                value={currentBusiness.city}
                                onChange={this.onChangeCity}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="State"
                                name="state"
                                value={currentBusiness.state}
                                onChange={this.onChangeState}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="ZipCode"
                                name="zip_code"
                                value={currentBusiness.zip_code}
                                onChange={this.onChangeZipCode}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Notes"
                                name="notes"
                                value={currentBusiness.notes}
                                onChange={this.onChangeNotes}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="ContactFname"
                                name="contact_fname"
                                value={currentBusiness.contact_fname}
                                onChange={this.onChangeContactFname}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="ContactLname"
                                name="contact_lname"
                                value={currentBusiness.contact_lname}
                                onChange={this.onChangeContactLname}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="ContactPhone"
                                name="contact_phone"
                                value={currentBusiness.contact_phone}
                                onChange={this.onChangeContactPhone}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="ContactFax"
                                name="contact_fax"
                                value={currentBusiness.contact_fax}
                                onChange={this.onChangeContactFax}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="ContactEmail"
                                name="contact_email"
                                value={currentBusiness.contact_email}
                                onChange={this.onChangeContactEmail}
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
                            onClick={this.updateBusiness}
                            href={"/business"}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            endIcon={<KeyboardReturnIcon />}
                            href={"/business"}
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

export default withStyles(styles)(EditBusinessComponent)
