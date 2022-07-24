import {
  makeStyles,
  Snackbar,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import CommentBlock from "components/Content/CommentBlock";
import DateBlock from "components/Content/DateBlock";
import RatingBlock from "components/Content/RatingBlock";
import SliderBlock from "components/Content/SliderBlock";
import CustomAppBar from "components/TopBar/AppBar";
import { CommentContext } from "contexts/CommentContext";
import { DifficultyLabel } from "data/difficulty";
import { ViewLabel } from "data/viewLabel";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "@material-ui/lab/Alert";
import * as yup from "yup";
import ImageDrawer from "./ImageDrawer";
import demoapi from "axios/api";
import { useHistory } from "react-router";
import Helper from "helper/helper";

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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

const CommentPage = props => {
  const history = useHistory();
  const helper = Helper();
  if (!helper.verifyToken()) history.push({ pathname: "/trailComment2" });
  const trail_id =
    props.location.state === undefined ? null : props.location.state.trail_id;
  if (!trail_id) {
    history.push({ pathname: "/home" });
  }
  const classes = useStyles();
  const [showAlert, setshowAlert] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [files, setFiles] = useState([]);
  const [tag, setTag] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //開關警示通知
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setshowAlert("");
  };

  //開關選擇標籤頁面
  const toggleDrawer = state => {
    setOpenDrawer(state);
  };

  //設置選取的圖片
  const handleImage = event => {
    setFiles(event.target.files);
  };

  //表單驗證機制
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
      .integer("請輸入正整數")
      .positive("請輸入正整數")
      .typeError("請輸入正確時間")
      .required("請填寫花費時間"),
    timeSpentM: yup
      .number()
      .integer("請輸入正整數")
      .positive("請輸入正整數")
      .max(60, "請勿超過60分鐘")
      .typeError("請輸入正確時間")
      .required("請填寫花費時間"),
    comment: yup.string().required("請撰寫評論")
  });
  //react hook form
  const {
    register,
    control,
    setValue,
    getValues,
    errors,
    handleSubmit
  } = useForm({ resolver: yupResolver(schema) });

  //通過驗證後表單送出
  const onSubmit = data => {
    //跳出載入圈ㄑㄢ
    setIsLoading(true);
    //取得userId
    let uid = 0;
    if (localStorage.getItem("userId")) {
      uid = localStorage.getItem("userId");
    } else {
      history.push({ pathname: "/signin" });
    }
    //打包資料
    const fd = new FormData();
    fd.append("user_id", uid);
    fd.append("trail_id", trail_id);
    fd.append("date", moment(data.hikingDate).format("YYYY-MM-DD"));
    fd.append("star", data.ratingStar);
    fd.append("difficulty", data.difficulty);
    fd.append("beauty", data.view);
    fd.append("duration", data.timeSpentH * 60 + data.timeSpentM);
    fd.append("content", data.comment);

    if (files.length > 0 && tag.length > 0) {
      for (let i = 0; i < files.length; i++) {
        fd.append("images[" + i + "]", files[i]);
        fd.append("tag_id[" + i + "]", tag[i]);
      }
    }
    //post資料
    demoapi
      .post("/api/comment/", fd, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        if (res.status === 200) {
          history.push({
            pathname: "/trailComment",
            state: { trail_id: trail_id }
          });
        } else {
          history.push({ pathname: "/pathway", state: { trail_id: trail_id } });
        }
      });
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
            {/* AppBar */}
            <CustomAppBar title="評論步道" back={true} next="發布" />
            {/* 日期區塊 */}
            <DateBlock />
            {/* 評價區塊 */}
            <RatingBlock />
            {/* 滑動選擇器區塊 */}
            <SliderBlock
              title="難易度"
              label={DifficultyLabel}
              name="difficulty"
            />
            <SliderBlock title="景色" label={ViewLabel} name="view" />
            {/* 其他區塊 */}
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
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default CommentPage;
