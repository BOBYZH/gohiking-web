import magetty from "../../asset/img/gettyimages-1197742259-2048x2048.jpg";
import React, { useState, useEffect, useLayoutEffect, Fragment } from "react";
import {
  makeStyles,
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";
import demoapi from "axios/api";
import { useHistory } from 'react-router-dom';
import { Checkbox } from "@material-ui/core";

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
    padding:'16px 16px 0 16px',
    // paddingLeft: "3%",
    // paddingRight: "2%",
  },
  commentName: {
    fontWeight: "bold",
    fontSize:'14px',
    marginBottom:'16px',
    // paddingTop: "4%",
    // paddingBottom: "4%",
    
  },
  rating: {
      marginBottom: '16px',
    // paddingBottom: "5%",
  },
  commentButton: {
    position: "absolute",
    right: 10,
    marginLeft:'16px',
    // paddingBottom: 3,
    textAlign: "center",
    fontSize: "12px",
  },
  thumbup: {
    paddingRight: "10%",
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
  const classes = useStyles();
  const [comment, setComment] = useState(props.data);
  const [s3, setS3] =  useState([]);
  const [like, setLike] = useState(comment.like);
  const [dislike, setDislike] = useState(comment.dislike);
  const [likeCheck, setLikeCheck] = useState(comment.likestatus);
  const [dislikeCheck, setDislikeCheck] = useState(comment.dislikestatus);
  const history = useHistory();

console.log('like', like);
console.log('dislike', dislike);
console.log('likeCheck', likeCheck);
console.log('dislikeCheck', dislikeCheck);
  
  const handleChange = (id) => {
    //觸發  likeCheck 喜歡 post status +1

    let uid = 0;
    if (localStorage.getItem("userId")) {
      uid = localStorage.getItem("userId");
    } else {
      history.push({ pathname: "/signin" });
    }
    // setLikeCheck((prev) => !prev);
    if (likeCheck) {
      setLike(like - 1);
      setLikeCheck(false);
    } else {
      setLike(like + 1);
      setLikeCheck(true);
    }
   
    if (dislikeCheck) {
      setDislikeCheck(false);
      setDislike(dislike - 1);
    } //如果 dislikeCheck 不喜歡 為true 改為false
    demoapi
      .post(
        "/api/likeComment/?user_id=" + uid + "&comment_id=" + id + "&status=" + 1
      )
      .then((res) => {
        console.log('post sucess', res);
      });
  };
  
  const handleChange1 = (id) => {
    //觸發  didlikeCheck 不喜歡poststatus -1
    let uid = 0;
    if (localStorage.getItem("userId")){
      uid = localStorage.getItem("userId");
    } else {

      history.push({ pathname: "/signin" });
    }
    setDislikeCheck((prev) => !prev);
    if (dislikeCheck) {
      setDislike(dislike - 1);
    }else{
      setDislike(dislike + 1);
      setDislikeCheck(true);
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
        console.log('post sucess', res);
      });
  };

 
  return (    
    <ThemeProvider theme={lightTheme}>
      <Grid className={classes.comment}>
        <Grid className={classes.commentName}>{comment.user.name}</Grid>
        <Rating
          readOnly
          className={classes.rating}
          name="size-small"
          defaultValue={comment.star}
        />
        <Button
          className={classes.commentButton}
          variant="outlined"
          color="primary"
        >
        { comment.difficulty == 1 &&("非常簡單") }
        { comment.difficulty == 2 &&("簡單") }
        { comment.difficulty == 3 &&("覺得還好") }
        { comment.difficulty == 4 &&("困難") }
        { comment.difficulty == 5 &&("非常困難") } 
        </Button>
        <Grid>{comment.content}</Grid>
        <Grid item xs={12} sm={6}>
          {/* <IconButton className={classes.thumbup}>
            <ThumbUpIcon />
            <Typography className={classes.thumbupText}>         
              {comment.like}
            </Typography>
          </IconButton> */}
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

          {/* <IconButton className={classes.thumbup}>
            <ThumbDownIcon />

            <Typography className={classes.thumbupText}>
              {comment.dislike}
            </Typography>
          </IconButton> */}

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
          {comment.comments_images.map((img,i) =>(
              <img key={i} src={img.s3_url} className={classes.magetty} />
          )
          )}
        </Grid>
        <Typography className={classes.time}>
          {comment.date}. 來回時間: {Math.round(comment.duration/60)}h {comment.duration%60}m 
        </Typography>
        <hr />
      </Grid>
    </ThemeProvider>


  );
    

}

