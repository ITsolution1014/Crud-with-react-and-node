import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { styles } from "./css-common";
import Home from "./components/home/home.component";

import CustomerList from "./components/customer/list-customer.component";
import AddCustomers from "./components/customer/add-customer.componenet";
import EditCustomers from "./components/customer/edit-customer.component";
import CustomerDetail from "./components/customer/detail-customer.component";

import BusinessList from "./components/business/list-businesses.component";
import BusinessAddDevice from "./components/business/add-business.component";
import BusinessEditDevice from "./components/business/edit-business.component";
import BusinessDetailDevice from "./components/business/detail-business.component";

import SlotsAdd from "./components/slot/add-slot.component";
import SlotsEdit from "./components/slot/edit-slot.component";

import InventoryList from "./components/inventory/list-devices.componet";
import InventoryAddDevice from "./components/inventory/add-device.component";
import InventoryEditDevice from "./components/inventory/edit-device.component";

import FilesList from "./components/files/list-files.component";
import FilesAdd from "./components/files/add-files.component";
import FilesEdit from "./components/files/edit-files.component";

import ContractsList from "./components/contracts/list-contracts.component";
import ContractsAdd from "./components/contracts/add-contract.component";
import ContractsEdit from "./components/contracts/edit-contract.component";

import AddCustomer from "./components/add-customer.component";
import Customer from "./components/customer.component";
import CustomersList from "./components/customers-list.component";

import { AppBar, Toolbar, Typography, withStyles } from "@material-ui/core";

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Link to={"/home"} className={classes.link}>
              <Typography className={classes.name} variant="h6">
                Home
              </Typography>
            </Link>

            <Link to={"/customer"} className={classes.link}>
              <Typography variant="body2">Customer</Typography>
            </Link>
            <Link to={"/business"} className={classes.link}>
              <Typography variant="body2">Business</Typography>
            </Link>
            <Link to={"/inventory"} className={classes.link}>
              <Typography variant="body2">Inventory</Typography>
            </Link>
            <Link to={"/files"} className={classes.link}>
              <Typography variant="body2">Files</Typography>
            </Link>
            <Link to={"/contracts"} className={classes.link}>
              <Typography variant="body2">Contracts</Typography>
            </Link>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />

          <Route exact path={["/customer"]} component={CustomerList} />
          <Route exact path={["/customer/add"]} component={AddCustomers} />
          <Route
            exact
            path={["/customer/:id/edit"]}
            component={EditCustomers}
          />
          <Route
            exact
            path={["/customer/:id/detail"]}
            component={CustomerDetail}
          />

          <Route exact path={["/business"]} component={BusinessList} />
          <Route
            exact
            path={["/business/add-business-location"]}
            component={BusinessAddDevice}
          />
          <Route
            exact
            path={["/business/:id/edit-business-location"]}
            component={BusinessEditDevice}
          />
          <Route
            exact
            path={["/business/:id/detail"]}
            component={BusinessDetailDevice}
          />

          <Route exact path={["/inventory"]} component={InventoryList} />
          <Route
            exact
            path={["/inventory/add-device"]}
            component={InventoryAddDevice}
          />
          <Route
            exact
            path={["/inventory/:id/edit-device"]}
            component={InventoryEditDevice}
          />

          <Route exact path={["/files"]} component={FilesList} />
          <Route exact path={["/files/add-file"]} component={FilesAdd} />
          <Route exact path={["/files/:id/edit-file"]} component={FilesEdit} />

          <Route exact path={["/contracts"]} component={ContractsList} />
          <Route
            exact
            path={["/contracts/add-contract"]}
            component={ContractsAdd}
          />
          <Route
            exact
            path={["/contracts/:id/edit-contract"]}
            component={ContractsEdit}
          />

          <Route
            exact
            path={["/business/:id/detail/:id/device/addSlot"]}
            component={SlotsAdd}
          />
          <Route exact path={["/slot/:id/edit-slot"]} component={SlotsEdit} />

          <Route exact path="/add" component={AddCustomer} />
          <Route path="/customers/:id" component={Customer} />
          <Route exact path={["/customers"]} component={CustomersList} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);
