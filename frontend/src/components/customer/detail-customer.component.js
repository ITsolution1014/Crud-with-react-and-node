import React, { Component, useState, useEffect } from "react";
import {
  TextField,
  Button,
  withStyles,
  Typography,
  ListItem,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useStyles } from "../../globalStyle";
import SaveIcon from "@material-ui/icons/Save";
import CustomerDataService from "../../services/customer.service";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const CustomerDetailComponent = (props) => {
  const classes = useStyles();

  const [currentCustomer, setCurrentCustomer] = useState({});

  const getCustomers = (id) => {
    CustomerDataService.get(id)
      .then((response) => {
        setCurrentCustomer((prevState) => ({
          ...prevState,
          ...response.data,
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCustomers(props.match.params.id);
  }, []);

  return (
    <div>
      <Container className={classes.home_text}>
        <Typography variant="h4">Customer</Typography>
        <Typography variant="h6">Profile</Typography>
        <div>
          <div className={classes.business_detail}>
            <div className={classes.business_detail_text}>
              <Typography variant="h6">
                Customer Name : {currentCustomer && currentCustomer.first_name}
              </Typography>
              <Typography variant="h6">
                Address Address : {currentCustomer && currentCustomer.address}
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <ListItem divider>
            <Typography variant="h6"> Files</Typography>
          </ListItem>
          {/* {customers &&
              customers.map((customer, index) => (
                <ListItem
                  selected={index === currentIndex}
                  //   onClick={() => this.setActiveCustomer(customer, index)}
                  href={"/customer/" + customer.id + "/detail/"}
                  divider
                  button
                  component="a"
                  key={index}
                  className={classes.business_button}
                >
                  <div>
                    <Typography> {customer.first_name}</Typography>
                  </div>
                  <div>
                    <Button
                      href={"/customer/" + customer.id + "/edit/"}
                      color="primary"
                    >
                      Edit
                    </Button>

                    <IconButton
                      onClick={(e) => {
                        this.deleteCustomer(customer.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </ListItem>
              ))} */}
        </div>
      </Container>
    </div>
  );
};

export default CustomerDetailComponent;
