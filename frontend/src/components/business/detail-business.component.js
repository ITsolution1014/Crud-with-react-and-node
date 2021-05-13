import React, { Component, useEffect, useState } from "react";
import BusinessDataService from "../../services/business.service";
import DevicesDataService from "../../services/inventory.service";
import BusinessDevicesDataService from "../../services/businessDevice.service";
import SlotDataService from "../../services/slot.service";
import { useStyles } from "../../globalStyle";
import {
  TextField,
  Button,
  withStyles,
  Typography,
  ListItem,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";

import SaveIcon from "@material-ui/icons/Save";

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
import InventoryDataService from "../../services/inventory.service";

const DetailBusinessComponent = (props) => {
  const classes = useStyles();
  const [device_id, setDeviceID] = useState("");
  const [devices, setDevices] = useState([]);
  const [currentBusiness, setCurrentBusiness] = useState({});
  const [allBusinessDevices, setAllBusinessDevices] = useState([]);
  const [deviceCount, setDeviceCount] = useState("");

  const retrieveDevices = () => {
    DevicesDataService.getAll()
      .then((response) => {
        setDevices(response.data);
        //   count: response.data.length,
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveDevices();
    getBusiness(props.match.params.id);
    getAllBusinessDevice(props.match.params.id);
  }, []);

  //   componentDidMount() {
  //     this.getAllBusinessDeviceSlot(this.props.match.params.id);
  //   }

  const onChangeDevicesId = (e) => {
    setDeviceID(e.target.value);
  };

  const getBusiness = (id) => {
    BusinessDataService.get(id)
      .then((response) => {
        setCurrentBusiness((prevState) => ({
          ...prevState,
          ...response.data,
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllBusinessDevice = (id) => {
    BusinessDevicesDataService.get(id)
      .then((response) => {
        console.log(response.data);
        // setAllBusinessDevices(response.data.devices);
        setDeviceCount(response.data.length);
        // console.log(response.data.devices)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //   getAllBusinessDeviceSlot(id1, id2) {
  //     var data = {
  //       businessId: id1,
  //       deviceId: id2,
  //     };
  //     SlotDataService.findSlots(data)
  //       .then((response) => {
  //         this.setState({
  //           AllBusinessDeviceSlots: response.data,
  //         });
  //         this.refresh();
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }

  const saveBusinessDevice = (event) => {
    event.preventDefault();

    var data = {
      location_id: currentBusiness.id,
      device_id: device_id,
    };

    BusinessDevicesDataService.create(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  //   saveSlot(id1, id2) {
  //     var data = {
  //       location_id: id1,
  //       device_id: id2,
  //       file_id: "1",
  //       name: "newFileName",
  //       length: "10",
  //       expiration: "1123",
  //     };
  //     SlotDataService.create(data)
  //       .then((response) => {
  //         this.setState({
  //           location_id: response.data.location_id,
  //           device_id: response.data.device_id,
  //           file_id: response.data.file_id,
  //           name: response.data.name,
  //           length: response.data.length,
  //           expiration: response.data.expiration,
  //         });
  //         console.log(response.data);
  //         this.getAllBusinessDeviceSlot(id1, id2);
  //       })
  //       .catch((e) => {
  //         // console.log(e);
  //       });
  //   }

  //   deleteBusinessDevice(id1, id2) {
  //     let data = {
  //       businessId: id1,
  //       deviceId: id2,
  //     };
  //     BusinessDevicesDataService.update(id2, data)
  //       .then((response) => {
  //         console.log(response.data);
  //         this.props.history.push("/business");
  //         this.refreshList();
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }

  //   deleteBusinessDeviceSlot(id1, id2, id3) {
  //     SlotDataService.delete(id1)
  //       .then((response) => {
  //         console.log(response.data);
  //         this.props.history.push("/slot");
  //         this.getAllBusinessDeviceSlot(id2, id3);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }

  //   const {
  //     devices,
  //     currentBusiness,
  //     currentDevice,
  //     currentIndex,
  //     count,
  //     AllBusinessDevices,
  //     deviceCount,
  //     AllBusinessDeviceSlots,
  //     expanded,
  //   } = this.state;
  //   const { classes } = this.props;

  return (
    <div>
      <Container className={classes.home_text}>
        <Typography variant="h4">Businesses location</Typography>
        <Typography variant="h6">Profile</Typography>

        <div>
          <div className={classes.business_detail}>
            <div className={classes.business_detail_text}>
              <Typography variant="h6">
                Business Name : {currentBusiness.company_name}
              </Typography>
              <Typography variant="h6">
                Business Address : {currentBusiness.address}
              </Typography>
            </div>

            <div className={classes.business_detail_add_button}>
              <FormControl>
                <TextField
                  id="outlined-select-currency"
                  select
                  required
                  label="Select device"
                  value={device_id}
                  onChange={onChangeDevicesId}
                  //   helperText="Please select Customer"
                  fullWidth
                  variant="outlined"
                >
                  {devices &&
                    devices.map((device, index) => (
                      <MenuItem value={device.id} key={index}>
                        {device.device_type}
                      </MenuItem>
                    ))}
                </TextField>
              </FormControl>
              <Button
                className={classes.business_detail_addButton}
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                startIcon={<SaveIcon />}
                onClick={saveBusinessDevice}
                href={"/business/" + currentBusiness.id + "/detail/"}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
        <div>
          <ListItem divider>
            <Typography variant="h6">{deviceCount} devices</Typography>
          </ListItem>
          {/* <div>
            {AllBusinessDevices &&
              AllBusinessDevices.map((device, index) => (
                <ListItem
                  // selected={index === currentIndex}
                  // href={"/business/" + currentBusiness.id + "/detail/" + device.id + "/listSlots/"}
                  // onClick={}
                  divider
                  button
                  component="a"
                  key={index}
                >
                  <Accordion
                    className={classes.accordion}
                    expanded={expanded === device.id}
                    onChange={(e) => {
                      this.handleChange(device.id);
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={(e) => {
                        this.getAllBusinessDeviceSlot(
                          currentBusiness.id,
                          device.id
                        );
                      }}
                    >
                      <div className={classes.accordion_summary}>
                        <div className={classes.accordion_div}>
                          <Typography className={classes.heading}>
                            {device.device_type}
                          </Typography>
                        </div>
                        <div>
                          <Button
                            href={"/inventory/" + device.id + "/edit-device/"}
                            color="primary"
                          >
                            Edit
                          </Button>
                          <IconButton
                            onClick={(e) => {
                              this.deleteBusinessDevice(
                                currentBusiness.id,
                                device.id
                              );
                            }}
                            href={
                              "/business/" + currentBusiness.id + "/detail/"
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className={classes.slotsCommon}>
                        {AllBusinessDeviceSlots &&
                          AllBusinessDeviceSlots.map(
                            (AllBusinessDeviceSlot, index) =>
                              (() => {
                                if (
                                  AllBusinessDeviceSlot.device_id == device.id
                                ) {
                                  return (
                                    <div
                                      className={classes.slotSizes}
                                      key={index}
                                    >
                                      <Typography
                                        className={classes.slotCommonFont}
                                      >
                                        {AllBusinessDeviceSlot.name}
                                      </Typography>
                                      <Typography
                                        className={classes.slotCommonFont}
                                      >
                                        {AllBusinessDeviceSlot.file_id}
                                      </Typography>
                                      <Button
                                        href={
                                          "/slot/" +
                                          AllBusinessDeviceSlot.id +
                                          "/edit-slot/"
                                        }
                                        color="primary"
                                      >
                                        Edit
                                      </Button>
                                      <IconButton
                                        onClick={(e) => {
                                          this.deleteBusinessDeviceSlot(
                                            AllBusinessDeviceSlot.id,
                                            currentBusiness.id,
                                            device.id
                                          );
                                        }}
                                        href={
                                          "/business/" +
                                          currentBusiness.id +
                                          "/detail/"
                                        }
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </div>
                                  );
                                } else {
                                  return <div></div>;
                                }
                              })()
                          )}
                        <Button
                          type="submit"
                          className={classes.slotSize}
                          onClick={() => {
                            this.saveSlot(currentBusiness.id, device.id);
                          }}
                        >
                          <div>
                            <Typography className={classes.slotFont}>
                              Add a new slot
                            </Typography>
                          </div>
                          <div>
                            <AddIcon className={classes.slotPlusIcon} />
                          </div>
                        </Button>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
              ))}
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default DetailBusinessComponent;
