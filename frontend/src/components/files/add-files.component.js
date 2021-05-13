import React, { Component, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FilesDataService from "../../services/files.service";
import CustomerDataService from "../../services/customer.service";
import { useStyles } from "../../globalStyle";
import {
  TextField,
  Grid,
  Button,
  MenuItem,
  Typography,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

const AddFileComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [customer_id, setCustomerID] = useState("");
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    CustomerDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeCustomer = (e) => {
    setCustomerID(e.target.value);
  };

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const onChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const saveFiles = (event) => {
    event.preventDefault();
    var data = {
      customer_id: customer_id,
      title: title,
      url: url,
      language: language,
      type: type,
      description: description,
    };

    console.log(data);
    FilesDataService.create(data)
      .then((response) => {
        console.log(response.data);

        history.push("/files");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container className={classes.home_text}>
        <Typography variant="h4">File</Typography>
        <Typography variant="h6">Create a new File</Typography>
        <form method="post" name="" onSubmit={saveFiles}>
          <Grid container>
            <Grid item xs={8} className={classes.m1}>
              <TextField
                id="outlined-select-currency"
                select
                required
                label="Customer"
                value={customer_id}
                onChange={onChangeCustomer}
                //   helperText="Please select Customer"
                fullWidth
                variant="outlined"
              >
                {customers &&
                  customers.map((row, key) => (
                    <MenuItem key={key} value={row.id}>
                      {row.first_name} {row.last_name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={8} className={classes.m1}>
              <TextField
                label="Title"
                fullWidth
                name="title"
                value={title}
                onChange={onChangeTitle}
                required
              />
            </Grid>

            <Grid item xs={8} className={classes.m1}>
              <TextField
                label="Url"
                fullWidth
                name="url"
                value={url}
                onChange={onChangeUrl}
                required
              />
            </Grid>

            <Grid item xs={8} className={classes.m1}>
              <TextField
                label="Language"
                name="language"
                value={language}
                onChange={onChangeLanguage}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={8} className={classes.m1}>
              <TextField
                label="Type"
                name="type"
                value={type}
                onChange={onChangeType}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={8} className={classes.m1}>
              <TextField
                label="Description"
                name="description"
                value={description}
                onChange={onChangeDescription}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={8} className={classes.m1}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                startIcon={<SaveIcon />}
                // onClick={saveFiles}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="default"
                size="small"
                endIcon={<KeyboardReturnIcon />}
                href={"/files"}
                className={classes.business_edit_button}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default AddFileComponent;
