import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { Redirect } from "react-router";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  alertShown: {
    opacity: 1,
    transition: "all 250ms linear",
    zIndex: 1
  },
  alertHidden: {
    opacity: 0,
    transition: "all 250ms linear"
  }
}));

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
      <Typography variant="h6">{children}</Typography>
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

const AvatarUploadDialog = props => {
  const classes = useStyles();
  const isOpen = props.isOpen;
  const closeDialog = props.closeDialog;
  const triggerImageInput = props.triggerImageInput;
  const inputRef = props.inputRef;
  const pData = props.pData;
  console.log(pData);
  const [file, setFile] = useState(null);
  const [showAlert, setshowAlert] = useState(false);

  const handleInputChange = event => {
    if (!event.target.files[0]) return;
    if (event.target.files[0].size > 1048576) {
      setshowAlert(true);
    } else {
      setFile(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setshowAlert(false);
  };
  if (file)
    return (
      <Redirect
        to={{ pathname: "/cropAvatar", state: { image: file, pData: pData } }}
      />
    );
  return (
    <>
      <Dialog
        onClose={closeDialog}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={true}>
          編輯個人檔案圖片
        </DialogTitle>
        <DialogContent>
          <Typography style={{ color: "#919191" }} gutterBottom>
            請選擇您的個人頭貼
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={false} style={{ color: "#007aff" }}>
            拍攝相片
          </Button>
        </DialogActions>
        <DialogActions>
          <input
            ref={inputRef}
            type="file"
            id="avatar_img"
            name="avatar_img"
            accept="image/*"
            onChange={event => {
              handleInputChange(event);
            }}
            hidden
          />
          <Button
            autoFocus
            onClick={triggerImageInput}
            style={{ color: "#007aff" }}
          >
            從相簿中選取
          </Button>
        </DialogActions>
        <DialogActions>
          <Button autoFocus onClick={closeDialog} style={{ color: "#007aff" }}>
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error">圖片不可大於1mb! 請重新選擇圖片。</Alert>
      </Snackbar>
    </>
  );
};
export default AvatarUploadDialog;
