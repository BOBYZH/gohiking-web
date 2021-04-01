import {
  makeStyles,
  TextField,
  Card,
  CardContent,
  Grid,
  Typography,
  withStyles,
  Slider,
  Snackbar,
  Drawer,
  AppBar
} from "@material-ui/core";
import CommentBlock from "components/Content/CommentBlock";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DateBlock from "components/Content/DateBlock";
import RatingBlock from "components/Content/RatingBlock";
import SliderBlock from "components/Content/SliderBlock";
import CustomAppBar from "components/TopBar/AppBar";
import { CommentContext } from "contexts/CommentContext";
import { DifficultyLabel } from "data/difficulty";
import { ViewLabel } from "data/viewLabel";
import moment from "moment";
import React, { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "@material-ui/lab/Alert";
import * as yup from "yup";
import ImageDrawer from "./ImageDrawer";
import freeDemoStyle from "asset/jss/material-kit-pro-react/views/presentationSections/freeDemoStyle";
import demoapi from "axios/api";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 500
  },
  titleDiv: {
    padding: "0 5%",
    color: "white",
    fontFamily: "PingFangTC",
    fontSize: "18px"
  },
  finishButton: {
    padding: 0,
    paddingLeft: 40
  },
  date: {
    color: "#979797",
    fontSize: 14,
    marginTop: 9
  },
  card: {
    marginTop: 9
  },
  label: {
    fontSize: 16,
    margin: 16,
    float: "right"
  }
}));

const CommentPage = () => {
  const classes = useStyles();
  const [showAlert, setshowAlert] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [files, setFiles] = useState([]);
  const [tag, setTag] = useState([]);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setshowAlert("");
  };

  const toggleDrawer = state => {
    setOpenDrawer(state);
  };

  const handleImage = event => {
    // let filesArray = [];
    // for (let i = 0; i < event.target.files.length; i++) {
    //   filesArray.push(URL.createObjectURL(event.target.files[i]));
    // }
    setFiles(event.target.files);
  };
  const schema = yup.object().shape({
    hikingDate: yup
      .date()
      .max(moment())
      .required(),
    ratingStar: yup
      .number()
      .positive()
      .integer()
      .min(1, "請評價正確星等")
      .max(5, "請評價正確星等")
      .required("請評價星等"),
    difficulty: yup
      .number()
      .positive()
      .integer()
      .max(5)
      .min(0)
      .required(),
    view: yup
      .number()
      .positive()
      .integer()
      .max(5)
      .min(0)
      .required(),
    timeSpentH: yup
      .number("請輸入正確時間")
      .typeError("請輸入正確時間")
      .required("請填寫花費時間"),
    timeSpentM: yup
      .number()
      .max(60, "請勿超過60分鐘")
      .typeError("請輸入正確時間")
      .required("請填寫花費時間"),
    comment: yup.string().required("請撰寫評論")
  });
  const {
    register,
    control,
    setValue,
    getValues,
    errors,
    handleSubmit
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = data => {
    console.log(files);
    console.log(tag);
    console.log(data);
    const formatData = {
      user_id: 1,
      trail_id: 5,
      date: moment(data.hikingDate).format("YYYY-MM-DD"),
      star: data.ratingStar,
      difficulty: data.difficulty,
      beauty: data.view,
      duration: data.timeSpentH * 60 + data.timeSpentM,
      content: data.comment
      // images: freeDemoStyle,
      // tag_id: tag
    };
    demoapi.post("/api/comment/");
  };
  return (
    <>
      <div className={classes.root}>
        <ImageDrawer
          openDrawer={openDrawer}
          toggleDrawer={toggleDrawer}
          selectedImages={files}
          setTag={setTag}
          setFiles={setFiles}
        />
        <CommentContext.Provider
          value={{
            register: register,
            control: control,
            setValue: setValue,
            getValues: getValues,
            errors: errors,
            toggleDrawer: toggleDrawer,
            handleImage: handleImage,
            setshowAlert: setshowAlert
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomAppBar title="評論步道" back={true} next="發布" />
            <DateBlock />
            <RatingBlock />
            <SliderBlock
              title="難易度"
              label={DifficultyLabel}
              name="difficulty"
            />
            <SliderBlock title="景色" label={ViewLabel} name="view" />
            <CommentBlock />
          </form>
        </CommentContext.Provider>
        <Snackbar
          open={showAlert}
          autoHideDuration={3000}
          onClose={handleAlertClose}
        >
          <Alert severity="error">{showAlert}</Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default CommentPage;
