import React, { Component } from "react";
import { styles } from "../../css-common";
import {
  TextField,
  Button,
  withStyles,
  Typography,
  ListItem,
} from "@material-ui/core";

import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomersDataService from "../../services/customer.service";

class listCustomerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      currentCustomers: {
        id: null,
        fist_name: "",
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
        published: false,
      },
      currentIndex: -1,
      count: 0,
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }
  refreshList() {
    this.retrieveCustomers();
    this.setState({
      currentCustomers: null,
      currentIndex: -1,
    });
  }
  retrieveCustomers() {
    CustomersDataService.getAll()
      .then((response) => {
        this.setState({
          customers: response.data,
          count: response.data.length,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  setActiveCustomer(customer, index) {
    this.setState({
      currentCustomers: customer,
      currentIndex: index,
    });
  }

  deleteCustomer(id) {
    CustomersDataService.delete(id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/customers");
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props;
    const { customers, currentCustomers, currentIndex, count } = this.state;
    return (
      <div>
        <Container className={classes.home_text}>
          <Typography variant="h4">Customer</Typography>
          <Typography variant="h6">List of Customers</Typography>
        </Container>
        <Container>
          <div className={classes.customer_create}>
            <Button
              size="medium"
              color="primary"
              variant="contained"
              href={"/customer/add"}
            >
              Add a new customer
            </Button>
          </div>
          <div>
            <ListItem divider>
              <Typography variant="h6">{count} Customers</Typography>
            </ListItem>
            {customers &&
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
              ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(listCustomerComponent);
