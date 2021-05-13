import React, { Component } from "react";
import { styles } from "../../css-common"
import {TextField, Button, withStyles, Typography} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import {Link} from "react-router-dom";
import { shadows } from '@material-ui/system';
import Container from '@material-ui/core/Container';
class Home extends Component {
    render() {
        const { classes } = this.props
        return (
            <div>
                <Container>
                    <Typography className={classes.home_text} variant="h4">
                        Home
                    </Typography>
                </Container>
                <Container className={classes.home_flex}>
                    <Link to={"/customer"} className={classes.home_link}>
                        <Box className={classes.home_box}>
                            <Typography className={classes.name} variant="h6">
                                Customer
                            </Typography>
                            <Typography className={classes.name} variant="h6">
                                Manage costumer and its files
                            </Typography>
                        </Box>
                    </Link>
                    <Link to={"/business"} className={classes.home_link}>
                        <Box className={classes.home_box}>
                            <Typography className={classes.name} variant="h6">
                                Business
                            </Typography>
                            <Typography className={classes.name} variant="h6">
                                Manage business its devices and slots
                            </Typography>
                        </Box>
                    </Link>
                    <Link to={"/inventory"} className={classes.home_link}>
                        <Box className={classes.home_box}>
                            <Typography className={classes.name} variant="h6">
                                Inventory
                            </Typography>
                            <Typography className={classes.name} variant="h6">
                                Manage the devices to be assigned to business
                            </Typography>
                        </Box>
                    </Link>
                    <Link to={"/files"} className={classes.home_link}>
                        <Box className={classes.home_box} >
                            <Typography className={classes.name} variant="h6">
                                Files
                            </Typography>
                            <Typography className={classes.name} variant="h6">
                                Manage the files of the costumers and see a list of files by business and devices
                            </Typography>
                        </Box>
                    </Link>
                    <Link to={"/contracts"} className={classes.home_link} boxshadow={5}>
                        <Box className={classes.home_box} >
                            <Typography className={classes.name} variant="h6">
                                Contracts
                            </Typography>
                            <Typography className={classes.name} variant="h6">
                                Manage all the contracts
                            </Typography>
                        </Box>
                    </Link>
                </Container>
            </div>

        );
    }
}

export default withStyles(styles)(Home)
