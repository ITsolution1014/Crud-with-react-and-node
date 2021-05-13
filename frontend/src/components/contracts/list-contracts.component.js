import React, { Component } from "react";
import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography, ListItem} from "@material-ui/core";

import Container from '@material-ui/core/Container';
import ContractsDataService from "../../services/contracts.service";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class listContractsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contracts: [],
            currentContracts: {
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
            },
            currentIndex: -1,
            count: 0,
        };
    }


    componentDidMount() {
        this.retrieveContracts();
    }
    refreshList() {
        this.retrieveContracts();
        this.setState({
            currentContracts: null,
            currentIndex: -1
        });
    }
    retrieveContracts() {
        ContractsDataService.getAll()
            .then(response => {
                this.setState({
                    contracts: response.data,
                    count:response.data.length
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    setActiveContracts(contract, index) {
        this.setState({
            currentContracts: contract,
            currentIndex: index
        });
    }

    deleteContracts(id) {
        ContractsDataService.delete(id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/contracts')
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { classes } = this.props
        const { contracts, currentContracts, currentIndex, count } = this.state;
        return (
            <div>
                <Container className={classes.home_text} >
                    <Typography variant="h4">
                        Contracts
                    </Typography>
                    <Typography variant="h6">
                        List of contracts
                    </Typography>
                </Container>
                <Container>
                    <div className={classes.customer_create}>
                        <Button
                            size="medium"
                            color="primary"
                            variant="contained"
                            href={"/contracts/add-contract"}>
                            Add a new contract
                        </Button>
                    </div>
                    <div>
                        <ListItem divider>
                            <Typography variant="h6">
                                {count} Contracts
                            </Typography>
                        </ListItem>
                        {contracts &&
                        contracts.map((contract, index) => (
                            <ListItem
                                selected={index === currentIndex}
                                onClick={() => this.setActiveContracts(contract, index)}
                                divider
                                button
                                key={index}
                                className={classes.business_button}>

                                <div><Typography> {contract.name}</Typography></div>
                                <div>
                                    <Button
                                        href={"/contracts/" + contract.id + "/edit-contract/"}
                                        color="primary"
                                    >
                                        Edit
                                    </Button>

                                    <IconButton
                                        onClick={(e)=>{
                                            this.deleteContracts(contract.id)
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

export default withStyles(styles)(listContractsComponent)
