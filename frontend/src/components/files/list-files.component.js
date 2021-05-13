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
import FilesDataService from "../../services/files.service";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class listFilesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      currentFiles: {
        id: null,
        title: "",
        url: "",
        language: "",
        type: "",
        description: "",
        length: "",
      },
      currentIndex: -1,
      count: 0,
    };
  }

  componentDidMount() {
    this.retrieveFiles();
  }
  refreshList() {
    this.retrieveFiles();
    this.setState({
      currentFiles: null,
      currentIndex: -1,
    });
  }
  retrieveFiles() {
    FilesDataService.getAll()
      .then((response) => {
        this.setState({
          files: response.data,
          count: response.data.length,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  setActiveFiles(file, index) {
    this.setState({
      currentFiles: file,
      currentIndex: index,
    });
  }

  deleteFiles(id) {
    FilesDataService.delete(id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/files");
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props;
    const { files, currentFiles, currentIndex, count } = this.state;
    return (
      <div>
        <Container className={classes.home_text}>
          <Typography variant="h4">Files</Typography>
          <Typography variant="h6">List of files</Typography>
        </Container>
        <Container>
          <div className={classes.customer_create}>
            <Button
              size="medium"
              color="primary"
              variant="contained"
              href={"/files/add-file"}
            >
              Add a new file
            </Button>
          </div>
          <div>
            <ListItem divider>
              <Typography variant="h6">{count} Files</Typography>
            </ListItem>
            {files &&
              files.map((file, index) => (
                <ListItem
                  selected={index === currentIndex}
                  onClick={() => this.setActiveFiles(file, index)}
                  divider
                  button
                  key={index}
                  className={classes.business_button}
                >
                  <div>
                    <Typography> {file.title}</Typography>
                  </div>
                  <div>
                    <Button
                      href={"/files/" + file.id + "/edit-file/"}
                      color="primary"
                    >
                      Edit
                    </Button>

                    <IconButton
                      onClick={(e) => {
                        this.deleteFiles(file.id);
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

export default withStyles(styles)(listFilesComponent);
