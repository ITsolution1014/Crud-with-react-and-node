import React, { Component } from "react";
import ContractsDataService from "../../services/contracts.service";

import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography} from "@material-ui/core";
import Container from '@material-ui/core/Container';
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
class AddContractComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.onChangeDocumentUrl = this.onChangeDocumentUrl.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDatePurchased = this.onChangeDatePurchased.bind(this);
        this.onChangeDateCancelation = this.onChangeDateCancelation.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangePaymentMethod = this.onChangePaymentMethod.bind(this);
        this.saveContracts = this.saveContracts.bind(this);
        this.newContracts = this.newContracts.bind(this);

        this.state = {
            id: null,
            name: "",
            start: "",
            end: "",
            document_url: "",
            description: "",
            date_purchased: "",
            date_cancelation: "",
            amount: "",
            payment_method: "",
            published: false,
            submitted: false
        };
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeStart(e) {
        this.setState({
            start: e.target.value
        });
    }

    onChangeEnd(e) {
        this.setState({
            end: e.target.value
        });
    }

    onChangeDocumentUrl(e) {
        this.setState({
            document_url: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDatePurchased(e) {
        this.setState({
            date_purchased: e.target.value
        });
    }

    onChangeDateCancelation(e) {
        this.setState({
            date_cancelation: e.target.value
        })
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onChangePaymentMethod(e) {
        this.setState({
            payment_method: e.target.value
        });
    }

    saveContracts() {
        var data = {
            name: this.state.name,
            start: this.state.start,
            end: this.state.end,
            document_url: this.state.document_url,
            description: this.state.description,
            date_purchased: this.state.date_purchased,
            date_cancelation: this.state.date_cancelation,
            amount: this.state.amount,
            payment_method: this.state.payment_method
        };
        console.log(data)
        ContractsDataService.create(data)
            .then(response => {
                this.setState({

                    id: response.data.id,
                    name: response.data.name,
                    start: response.data.start,
                    end: response.data.end,
                    document_url: response.data.document_url,
                    description: response.data.description,
                    date_purchased: response.data.date_purchased,
                    date_cancelation: response.data.date_cancelation,
                    amount: response.data.amount,
                    payment_method: response.data.payment_method,
                    published: response.data.published,
                    message: "New Contract was created successfully!",
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newContracts() {
        this.setState({
            id: null,
            name: "",
            start: "",
            end: "",
            document_url: "",
            description: "",
            date_purchased: "",
            date_cancelation: "",
            amount: "",
            payment_method: "",
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
                        Contract
                    </Typography>
                    <Typography variant="h6">
                        Create a new contract
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
                                label="Start Date"
                                name="start"
                                value={this.state.start}
                                onChange={this.onChangeStart}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="End Date"
                                name="end"
                                value={this.state.end}
                                onChange={this.onChangeEnd}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Document Url"
                                name="document_url"
                                value={this.state.document_url}
                                onChange={this.onChangeDocumentUrl}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Description"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Date Purchased"
                                name="date_purchased"
                                value={this.state.date_purchased}
                                onChange={this.onChangeDatePurchased}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Date Cancelation"
                                name="date_cancelation"
                                value={this.state.date_cancelation}
                                onChange={this.onChangeDateCancelation}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Amount"
                                name="amount"
                                value={this.state.amount}
                                onChange={this.onChangeAmount}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Payment Method"
                                name="payment_method"
                                value={this.state.payment_method}
                                onChange={this.onChangePaymentMethod}
                                required
                                className={classes.inputWidth}
                            />
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            type="submit"
                            href={"/contracts"}
                            startIcon={<SaveIcon />}
                            onClick={this.saveContracts}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            endIcon={<KeyboardReturnIcon />}
                            href={"/contracts"}
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

export default withStyles(styles)(AddContractComponent)
