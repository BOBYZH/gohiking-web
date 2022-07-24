import React, { useState, useEffect } from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Rating from "@material-ui/lab/Rating";
import { Grid, Link } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";
import { Checkbox } from "@material-ui/core";
import demoapi from "axios/api";
import { useHistory } from "react-router";
import { set } from "date-fns";
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "NotoSansCJKtc",
    flexGrow: 1,
    width: "100%",
  },
  tangle: {
    width: "100%",
    height: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },

  comment: {
    fontWeight: 500,
    fontSize: "14px",
    paddingLeft: "3%",
    paddingRight: "2%",
  },
  commentName: {
    fontWeight: "bold",
    fontSize: "14px",
    paddingTop: "4%",
    paddingBottom: "4%",
  },
  rating: {
    paddingBottom: "5%",
  },
  commentButton: {
    position: "absolute",
    right: 10,
    paddingBottom: 3,
    textAlign: "center",
    fontSize: "12px",
    backgroundColor:"rgba(0, 208, 76, 0.1)",
  },
  thumbup: {
    paddingRight: "10%",
  },
  icon: {
    color: "#3c5754",
  },
  thumbupText: {
    fontSize: "14px",
    marginLeft: 5,
  },
  gridList: {},
  magetty: {
    padding: "2%",
    width: "88px",
    height: "88px",
  },
  time: {
    color: "#979797",
    fontSize: "12px",
  },
  number: {
    paddingLeft: "30%",
  },
}));

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#00d04c",
    },
  },
});

export default function Commit(props) {
  const history = useHistory();
  const classes = useStyles();

  const comment = props.data;
  const [like, setLike] = useState(comment.like);
  const [dislike, setDisLike] = useState(comment.dislike);
  const [likeCheck, setLikeCheck] = useState(comment.likestatus);
  const [dislikeCheck, setDislikeCheck] = useState(comment.dislikestatus);

  const handleChange = (id) => {
    //觸發  likeCheck 喜歡 post status +1

    let uid = 0;
    if (localStorage.getItem("userId")) {
      uid = localStorage.getItem("userId");
    } else {
      history.push({ pathname: "/signin" });
    }
    setLikeCheck((prev) => !prev);

    if (likeCheck) {
      setLike(like - 1);
    } else {
      setLike(like + 1);
    }
   
    if (dislikeCheck) {
      setDislikeCheck(false);
      setDisLike(dislike - 1);
    } //如果 dislikeCheck 不喜歡 為true 改為false
    demoapi
      .post(
        "/api/likeComment/?user_id=" + uid + "&comment_id=" + id + "&status=" + 1
      )
      .then((res) => {
        console.log(res.status);
      });
  };
  const handleChange1 = (id) => {
    //觸發  didlikeCheck 不喜歡poststatus -1
    let uid = 0;
    if (localStorage.getItem("userId")){
      uid = localStorage.getItem("userId");
    } else {
      alert("請先登入");
      history.push({ pathname: "/signin" });
    }
    setDislikeCheck((prev) => !prev);
    if (dislikeCheck) {
      setDisLike(dislike - 1);
    }else{
      setDisLike(dislike + 1);
    }
    if (likeCheck) {
      setLikeCheck(false);
      setLike(like - 1);
    } //如果 likeCheck 喜歡 為true 改為false
    demoapi
      .post(
        "/api/likeComment/?user_id=" + uid + "&comment_id=" + id + "&status=" + -1
      )
      .then((res) => {
        console.log(res.status);
      });
  };
  return (
    <ThemeProvider theme={lightTheme}>
      <Grid className={classes.comment}>
        <Grid className={classes.commentName}>{comment.user.name}</Grid>
        <Rating
         
          className={classes.rating}
          value={comment.star}
          readOnly
        />
        <Button
          className={classes.commentButton}
          variant="outlined"
          color="primary"
        >
          {comment.difficulty == 1 && "疑?有山嗎?"}
          {comment.difficulty == 2 && "覺得輕鬆"}
          {comment.difficulty == 3 && "覺得還好"}
          {comment.difficulty == 4 && "有點兒累"}
          {comment.difficulty == 5 && "根本自虐吧"}
        </Button>

        <Grid>{comment.content}</Grid>
        <Grid item xs={12} sm={6}>
          <IconButton className={classes.thumbup}>
            <Checkbox
              checked={likeCheck}
              onChange={() => {
                handleChange(comment.id);
              }}
              icon={<ThumbUpIcon />}
              checkedIcon={<ThumbUpIcon style={{ color: "#3c5754" }} />}
            />

            <Typography className={classes.thumbupText}>{like}</Typography>
          </IconButton>

          <IconButton className={classes.thumbup}>
            <Checkbox
              checked={dislikeCheck}
              onChange={() => {
                handleChange1(comment.id);
              }}
              icon={<ThumbDownIcon />}
              checkedIcon={<ThumbDownIcon style={{ color: "#3c5754" }} />}
            />

            <Typography className={classes.thumbupText}>{dislike}</Typography>
          </IconButton>
        </Grid>

        <Grid className={classes.gridList}>
          {comment.comments_images.map((img) => (
            <img src={img.s3_url} className={classes.magetty} />
          ))}
        </Grid>
        <Typography className={classes.time}>
          {comment.date}. 來回時間: {Math.round(comment.duration / 60)}h{" "}
          {comment.duration % 60}m
        </Typography>
        <hr />
      </Grid>
    </ThemeProvider>
  );
}
function checkExpireTime() {
  const expireTime = localStorage.getItem("expireTime");
  console.log(expireTime);
  if (!expireTime) {
    return null;
  }
  const now = new Date();
  if (now.getTime() > expireTime) {
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
    localStorage.removeItem("userId");
    console.log("remove");
    return null;
  }
  console.log("token");
  return localStorage.getItem("token");
}
checkExpireTime();
