import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import getCroppedImg from "./cropImage";
import { useHistory } from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 88
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
const CropAvatar = props => {
  const history = useHistory();
  const selectedImage = props.location.state
    ? props.location.state.image
    : null;
  if (!selectedImage) {
    history.goBack();
  }
  const pData = props.location.state.pData;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const doneCropping = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImage,
        croppedAreaPixels
      );
      console.log("donee", { croppedImage });
      props.history.push({
        pathname: "/editAccount",
        state: { croppedImage: croppedImage, pData: pData }
      });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        position="relative"
        style={{ background: "#3c5754" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() =>
              history.push({
                pathname: "/editAccount",
                state: { pData: pData }
              })
            }
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            個人檔案相片
          </Typography>

          <Button
            className={classes.finishButton}
            color="inherit"
            edge="end"
            onClick={() => {
              doneCropping();
            }}
          >
            下一步
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.imgContainer}>
        <div className={classes.cropContainer}>
          <Cropper
            cropShape="round"
            image={selectedImage}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            onImageLoaded={res => {
              console.log(res);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default CropAvatar;
