import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import profilePageStyle from "asset/jss/material-kit-pro-react/views/profilePageStyle";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";

const useStyles = makeStyles(theme => ({
  title: {
    height: "56px",
    lineHeight: "56px",
    backgroundColor: "#3c5754"
  },
  titleDiv: {
    padding: "0 5%",
    color: "white",
    fontFamily: "PingFangTC",
    fontSize: "18px"
  },
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    marginLeft: 32
  },
  finishButton: {
    padding: 0,
    paddingLeft: 40
  }
}));
export default function CustomAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        position="fixed"
        style={{ background: "#3c5754" }}
      >
        <Toolbar>
          {props.back ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={() => {
                if (props.handleBack) {
                  props.handleBack();
                } else {
                  history.goBack();
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <></>
          )}
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          {props.next !== undefined && (
            <Button
              className={classes.finishButton}
              color="inherit"
              edge="end"
              type="submit"
              onClick={props.next}
            >
              {props.next}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
