import React, { Component } from "react";
import FilesDataService from "../../services/files.service";

import { styles } from "../../css-common";
import { TextField, Button, withStyles, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

class EditFilesComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getFiles = this.getFiles.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateFiles = this.updateFiles.bind(this);
    this.deleteFiles = this.deleteFiles.bind(this);

    this.state = {
      currentFile: {
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

        submitted: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getFiles(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFile: {
          ...prevState.currentFile,
          title: title,
        },
      };
    });
  }

  onChangeUrl(e) {
    const url = e.target.value;

    this.setState((prevState) => ({
      currentFile: {
        ...prevState.currentFile,
        url: url,
      },
    }));
  }

  onChangeLanguage(e) {
    const language = e.target.value;

    this.setState((prevState) => ({
      currentFile: {
        ...prevState.currentFile,
        language: language,
      },
    }));
  }

  onChangeType(e) {
    const type = e.target.value;

    this.setState((prevState) => ({
      currentFile: {
        ...prevState.currentFile,
        type: type,
      },
    }));
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentFile: {
        ...prevState.currentFile,
        description: description,
      },
    }));
  }

  getFiles(id) {
    FilesDataService.get(id)
      .then((response) => {
        this.setState({
          currentFile: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      title: this.state.title,
      url: this.state.url,
      language: this.state.language,
      type: this.state.type,
      description: this.state.description,
    };

    FilesDataService.update(this.state.currentFile.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentFile: {
            ...prevState.currentFile,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateFiles() {
    FilesDataService.update(this.state.currentFile.id, this.state.currentFile)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The File was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteFiles() {
    FilesDataService.delete(this.state.currentFile.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/files");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentFile } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Container className={classes.home_text}>
          <Typography variant="h4">Files</Typography>
          <Typography variant="h6">Edit this file</Typography>

          <div>
            <div className={classes.textField}>
              <TextField
                label="Title"
                name="title"
                value={currentFile.title}
                onChange={this.onChangeTitle}
                required
                className={classes.inputWidth}
              />
            </div>

            <div className={classes.textField}>
              <TextField
                label="Url"
                name="url"
                value={currentFile.url}
                onChange={this.onChangeUrl}
                required
                className={classes.inputWidth}
              />
            </div>

            <div className={classes.textField}>
              <TextField
                label="Language"
                name="language"
                value={currentFile.language}
                onChange={this.onChangeLanguage}
                required
                className={classes.inputWidth}
              />
            </div>

            <div className={classes.textField}>
              <TextField
                label="Type"
                name="type"
                value={currentFile.type}
                onChange={this.onChangeType}
                required
                className={classes.inputWidth}
              />
            </div>

            <div className={classes.textField}>
              <TextField
                label="Description"
                name="description"
                value={currentFile.description}
                onChange={this.onChangeDescription}
                required
                className={classes.inputWidth}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              href={"/files"}
              startIcon={<SaveIcon />}
              onClick={this.updateFiles}
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
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(EditFilesComponent);
