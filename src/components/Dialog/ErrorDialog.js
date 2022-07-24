import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { useHistory } from "react-router";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography style={{ color: "#FF1C47" }} variant="h6">
        {children}
      </Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: 286
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const ErrorDialog = props => {
  const history = useHistory();
  const isOpen = props.isOpen;
  const path = props.path;
  const goBack = path => {
    history.push({
      pathname: path
    });
  };
  return (
    <Dialog aria-labelledby="customized-dialog-title" open={isOpen}>
      <DialogTitle id="customized-dialog-title">發生錯誤！</DialogTitle>
      <DialogContent>
        <Typography style={{ color: "#FF0000" }} gutterBottom>
          請檢查您的網路連線或稍後再試
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{goBack(path)}} autoFocus style={{ color: "#FF0000" }}>
          返回
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ErrorDialog;
