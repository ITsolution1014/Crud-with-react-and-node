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
import BusinessDataService from "../../services/business.service";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class listBusinessesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: [],
      currentBusiness: {
        id: null,
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
      currentIndex: -1,
      count: 1,
    };
  }
  componentDidMount() {
    this.retrieveCustomers();
  }
  refreshList() {
    this.retrieveCustomers();
    this.setState({
      currentBusiness: null,
      currentIndex: -1,
    });
  }
  retrieveCustomers() {
    BusinessDataService.getAll()
      .then((response) => {
        this.setState({
          businesses: response.data,
          count: response.data.length,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteBusiness(id) {
    BusinessDataService.delete(id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/business");
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props;
    const { businesses, currentBusiness, currentIndex, count } = this.state;
    return (
      <div>
        <Container className={classes.home_text}>
          <Typography variant="h4">Business location</Typography>
          <Typography variant="h6">Profile</Typography>
        </Container>
        <Container>
          <div className={classes.customer_create}>
            <Button
              size="medium"
              color="primary"
              variant="contained"
              href={"/business/add-business-location"}
            >
              Add a business
            </Button>
          </div>
          <div>
            <ListItem divider>
              <Typography variant="h6">{count} Businesses</Typography>
            </ListItem>
            {businesses &&
              businesses.map((business, index) => (
                <ListItem
                  selected={index === currentIndex}
                  href={"/business/" + business.id + "/detail/"}
                  divider
                  button
                  component="a"
                  key={index}
                  className={classes.business_button}
                >
                  <div>
                    <Typography> {business.company_name}</Typography>
                  </div>
                  <div>
                    <Button
                      href={
                        "/business/" + business.id + "/edit-business-location/"
                      }
                      color="primary"
                    >
                      Edit
                    </Button>

                    <IconButton
                      onClick={(e) => {
                        this.deleteBusiness(business.id);
                      }}
                      href={"/business"}
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

export default withStyles(styles)(listBusinessesComponent);
