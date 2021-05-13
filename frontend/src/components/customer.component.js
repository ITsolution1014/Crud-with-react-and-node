import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";

import { styles } from "../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class Customer extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getCustomer = this.getCustomer.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);

        this.state = {
            currentCustomer: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getCustomer(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCustomer: {
                    ...prevState.currentCustomer,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                description: description
            }
        }));
    }

    getCustomer(id) {
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
            id: this.state.currentCustomer.id,
            title: this.state.currentCustomer.title,
            description: this.state.currentCustomer.description,
            published: status
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

    updateCustomer() {
        CustomerDataService.update(
            this.state.currentCustomer.id,
            this.state.currentCustomer
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The customer was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCustomer() {
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
                {currentCustomer ? (
                    <div className={classes.form}>
                        <h2>Customer</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Title"
                                    name="title"
                                    value={currentCustomer.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Description"
                                    name="description"
                                    value={currentCustomer.description}
                                    onChange={this.onChangeDescription}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status: </strong>
                                </label>
                                {currentCustomer.published ? "Published" : "Pending"}
                            </div>
                        </form>
                        <div className={classes.buttonWrapper}>
                            {currentCustomer.published ? (
                                <Button
                                    className={`${classes.publish} ${classes.button}`}
                                    onClick={() => this.updatePublished(false)}
                                >
                                    UnPublish
              </Button>
                            ) : (
                                    <Button
                                        className={`${classes.publish} ${classes.button}`}
                                        onClick={() => this.updatePublished(true)}
                                    >
                                        Publish
              </Button>
                                )}
                            <Button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={this.deleteCustomer}
                            >
                                Delete
            </Button>

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateCustomer}
                            >
                                Update
            </Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Customer...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(Customer)
