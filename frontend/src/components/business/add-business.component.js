import React, { Component } from "react";
import BusinessDataService from "../../services/business.service";
import ContractsDataService from "../../services/contracts.service";

import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography, ListItem} from "@material-ui/core";
import Container from '@material-ui/core/Container';
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class AddBusinessComponent extends Component {

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

        this.saveBusiness = this.saveBusiness.bind(this);

        this.state = {
            id: null,
            contracts: [],
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
            submitted: false,
            message:""
        };
    }
    componentDidMount() {
        this.retrieveContracts();
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
    onChangeCompanyName(e) {
        this.setState({
            company_name: e.target.value
        });
    }

    onChangeContractsId(e) {
        this.setState({
            contracts_id: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
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

    onChangeContactFname(e) {
        this.setState({
            contact_fname: e.target.value
        });
    }

    onChangeContactLname(e) {
        this.setState({
            contact_lname: e.target.value
        });
    }

    onChangeContactPhone(e) {
        this.setState({
            contact_phone: e.target.value
        });
    }

    onChangeContactFax(e) {
        this.setState({
            contact_fax: e.target.value
        });
    }

    onChangeContactEmail(e) {
        this.setState({
            contact_email: e.target.value
        });
    }

    saveBusiness() {
        var data = {
            contracts_id:this.state.contracts_id,
            company_name: this.state.company_name,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip_code: this.state.zip_code,
            notes: this.state.notes,
            contact_fname: this.state.contact_fname,
            contact_lname: this.state.contact_lname,
            contact_phone: this.state.contact_phone,
            contact_fax: this.state.contact_fax,
            contact_email: this.state.contact_email,
        };

        BusinessDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    contracts_id: response.data.contracts_id,
                    company_name: response.data.company_name,
                    address: response.data.address,
                    city: response.data.city,
                    state: response.data.state,
                    zip_code: response.data.zip_code,
                    notes: response.data.notes,
                    contact_fname: response.data.contact_fname,
                    contact_lname: response.data.contact_lname,
                    contact_phone: response.data.contact_phone,
                    contact_fax: response.data.contact_fax,
                    contact_email: response.data.contact_email,
                    published: response.data.published,
                    submitted: true,
                    message: "New business was created successfully!"
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { classes } = this.props
        const { contracts } = this.state;

        return (
            <div>
                <Container className={classes.home_text} >
                    <Typography variant="h4">
                        Business
                    </Typography>
                    <Typography variant="h6">
                        Create a new business
                    </Typography>

                    <div>


                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Select contract</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                onChange={this.onChangeContractsId}
                            >
                                {contracts &&
                                contracts.map((contract, index) => (
                                    <MenuItem value={contract.id} key={index}>{contract.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <div className={classes.textField}>
                            <TextField
                                label="CompanyName"
                                name="company_name"
                                value={this.state.company_name}
                                onChange={this.onChangeCompanyName}
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
                                label="ZipCode"
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

                          <div className={classes.textField}>
                            <TextField
                                label="ContactFname"
                                name="contact_fname"
                                value={this.state.contact_fname}
                                onChange={this.onChangeContactFname}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="ContactLname"
                                name="contact_lname"
                                value={this.state.contact_lname}
                                onChange={this.onChangeContactLname}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="ContactPhone"
                                name="contact_phone"
                                value={this.state.contact_phone}
                                onChange={this.onChangeContactPhone}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="ContactFax"
                                name="contact_fax"
                                value={this.state.contact_fax}
                                onChange={this.onChangeContactFax}
                                required
                        className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="ContactEmail"
                                name="contact_email"
                                value={this.state.contact_email}
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
                            href={"/business"}
                            startIcon={<SaveIcon />}
                            onClick={this.saveBusiness}
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

export default withStyles(styles)(AddBusinessComponent)
