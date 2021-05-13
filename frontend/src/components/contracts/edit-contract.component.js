import React, { Component } from "react";
import ContractsDataService from "../../services/contracts.service";

import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

class EditContractsComponent extends Component {
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
        this.getContracts = this.getContracts.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateContracts = this.updateContracts.bind(this);
        this.deleteContracts = this.deleteContracts.bind(this);

        this.state = {
            currentContract: {
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
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getContracts(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentContract: {
                    ...prevState.currentContract,
                    name: name
                }
            };
        });
    }

    onChangeStart(e) {
        const start = e.target.value;

        this.setState(prevState => ({
            currentContract: {
                ...prevState.currentContract,
                start: start
            }
        }));
    }

    onChangeEnd(e) {
        const end = e.target.value;

        this.setState(prevState => ({
            currentContract: {
                ...prevState.currentContract,
                end: end
            }
        }));
    }

    onChangeDocumentUrl(e) {
        const document_url = e.target.value;

        this.setState(prevState => ({
            currentContract: {
                ...prevState.currentContract,
                document_url: document_url
            }
        }));
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentContract: {
                ...prevState.currentContract,
                description: description
            }
        }));
    }

    onChangeDatePurchased(e) {
        const date_purchased = e.target.value;

        this.setState(prevState => ({
            currentContract: {
                ...prevState.currentContract,
                date_purchased: date_purchased
            }
        }));
    }

    onChangeDateCancelation(e) {
        const date_cancelation = e.target.value;

        this.setState(prevState => ({
            currentContract: {
                ...prevState.currentContract,
                date_cancelation: date_cancelation
            }
        }));
    }

    onChangeAmount(e) {
        const amount = e.target.value;

        this.setState(prevState => ({
            currentContract: {
                ...prevState.currentContract,
                amount: amount
            }
        }));
    }

    onChangePaymentMethod(e) {
        const payment_method = e.target.value;

        this.setState(prevState => ({
            currentContract: {
                ...prevState.currentContract,
                payment_method: payment_method
            }
        }));
    }
    getContracts(id) {
        ContractsDataService.get(id)
            .then(response => {
                this.setState({
                    currentContract: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            name: this.state.name,
            start: this.state.start,
            end: this.state.end,
            document_url: this.state.document_url,
            description: this.state.description,
            date_purchased: this.state.date_purchased,
            date_cancelation: this.state.date_cancelation,
            amount: this.state.amount,
            payment_method: this.state.payment_method,
            published: status
        };

        ContractsDataService.update(this.state.currentContract.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentContract: {
                        ...prevState.currentContract,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateContracts() {
        ContractsDataService.update(
            this.state.currentContract.id,
            this.state.currentContract
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

    deleteContracts() {
        ContractsDataService.delete(this.state.currentContract.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/contracts')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentContract } = this.state;
        const { classes } = this.props

        return (
            <div>
                <Container className={classes.home_text} >
                    <Typography variant="h4">
                        Contracts
                    </Typography>
                    <Typography variant="h6">
                        Edit this contract
                    </Typography>

                    <div>
                            <div className={classes.textField}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={currentContract.name}
                                    onChange={this.onChangeName}
                                    required
                                className={classes.inputWidth}
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Start Date"
                                    name="start"
                                    value={currentContract.start}
                                    onChange={this.onChangeStart}
                                    required
                                className={classes.inputWidth}
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="End Date"
                                    name="end"
                                    value={currentContract.end}
                                    onChange={this.onChangeEnd}
                                    required
                                className={classes.inputWidth}
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Document Url"
                                    name="document_url"
                                    value={currentContract.document_url}
                                    onChange={this.onChangeDocumentUrl}
                                    required
                                className={classes.inputWidth}
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={currentContract.description}
                                    onChange={this.onChangeDescription}
                                    required
                                className={classes.inputWidth}
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Date Purchased"
                                    name="date_purchased"
                                    value={currentContract.date_purchased}
                                    onChange={this.onChangeDatePurchased}
                                    required
                                className={classes.inputWidth}
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Date Cancelation"
                                    name="date_cancelation"
                                    value={currentContract.date_cancelation}
                                    onChange={this.onChangeDateCancelation}
                                    required
                                className={classes.inputWidth}
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Amount"
                                    name="amount"
                                    value={currentContract.amount}
                                    onChange={this.onChangeAmount}
                                    required
                                className={classes.inputWidth}
                                />
                            </div>


                            <div className={classes.textField}>
                                <TextField
                                    label="Payment Method"
                                    name="payment_method"
                                    value={currentContract.payment_method}
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
                                onClick={this.updateContracts}
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

                    </div>
                </Container>

            </div>
        );
    }
}

export default withStyles(styles)(EditContractsComponent)
