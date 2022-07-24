import Comment from "../../components/Comment/Comment"; //引入討論頁面
import React, { useState, useEffect, Fragment } from "react";
import {
  makeStyles,
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Rating from "@material-ui/lab/Rating";
import { Link, useHistory  } from "react-router-dom";
import { Grid } from "@material-ui/core";
import demoapi from "../../axios/api";
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: "60%",
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#fec15d",
  },
}))(LinearProgress);
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
  rating: {
    position: "absolute",
    right: "3%",
  },
  number: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: "14px",
  },
  fraction: {
    fontSize: "64px",
  },
  text: {
    fontFamily: "Roboto",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.38)",
  },

  gridList: {},
  magetty: {
    padding: "2%",
    width: "88px",
    height: "88px",
  },
  time: {
    fontSize: "12px",
  },
  progress: {
    marginLeft: "4%",
    marginBottom: "1%",
  },
}));

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3c5754",
    },
  },
});

export default function TrailCommit(props) {
  const classes = useStyles();
  const [stars, setStars] = useState([]);
  const [comment, setComment] = useState([]);
  const history = useHistory(); 
  const [comments, setComments] = useState([]);
  const trail_id = props.location.state.trail_id;
  console.log(trail_id);
  const uid = localStorage.getItem("userId");
  
  const commentApi = async (id) => {
    await demoapi.get("/api/comment/" + trail_id + "?uuid=" + uid).then((res) => {
      setComment(res.data); //步道總討論 api
      setStars(res.data.stars); //星星等級api
      setComments(res.data.comments); //步道討論 api
    });
  };
  useEffect(() => {
    commentApi(uid);
  }, [uid]);
  function financial(x) {
    return Number.parseFloat(x).toFixed(1); // 判斷總成績 小數點後一位
  }
  var avgStar = comment.avgStar;
  avgStar = financial(avgStar);

  let mathStar = 0;
  mathStar = Math.ceil(avgStar);
if(comment.avgStar) {return (
  
    <>
      <div className={classes.root}>
        <ThemeProvider theme={lightTheme}>
          <AppBar position="static">
            <Toolbar>
         
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={() => {history.push({
                    pathname:'/pathway',
                    state: {trail_id: trail_id},
                    })}}
                >
                  <ArrowBackIcon style={{ color: "white" }} />
                </IconButton>
            
              <Typography variant="h6" className={classes.title}>
                步道評論與討論
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>

        <Grid className={classes.tangle} />

        <Grid className={classes.progress}>
          <Grid className={classes.rating}>
            <Grid className={classes.fraction}>{avgStar} </Grid>
            <Rating name="size-small"  precision = {0.1}  value={avgStar}  readOnly size="small" />
            <Grid className={classes.text}> ({comment.totalPeople})</Grid>
          </Grid>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem>
              <ThemeProvider className={classes.number}>5 </ThemeProvider>
              <BorderLinearProgress
                className={classes.progress}
                variant="determinate"
                value={(stars.five * 100) / comment.totalPeople}
              />
            </ListItem>

            <ListItem>
              <ThemeProvider className={classes.number}>4</ThemeProvider>
              <BorderLinearProgress
                variant="determinate"
                value={(stars.four * 100) / comment.totalPeople}
                className={classes.progress}
              />
            </ListItem>
            <ListItem>
              <ThemeProvider className={classes.number}> 3</ThemeProvider>
              <BorderLinearProgress
                variant="determinate"
                value={(stars.three * 100) / comment.totalPeople}
                className={classes.progress}
              />
            </ListItem>
            <ListItem>
              <ThemeProvider className={classes.number}>2</ThemeProvider>
              <BorderLinearProgress
                variant="determinate"
                value={(stars.two * 100) / comment.totalPeople}
                className={classes.progress}
              />
            </ListItem>
            <ListItem>
              <ThemeProvider className={classes.number}>1</ThemeProvider>
              <BorderLinearProgress
                variant="determinate"
                value={(stars.one * 100) / comment.totalPeople}
                className={classes.progress}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid className={classes.tangle} />

        {comments.map((trail) => (
          <Comment data={trail} />
        ))}
      </div>
    </>
  );}else{
    return(
      <>
      <div className={classes.root}>
        <ThemeProvider theme={lightTheme}>
          <AppBar position="static">
            <Toolbar>
         
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={() => {history.goBack({
                    
                    state: {trail_id: trail_id},
                    })}}
                >
                  <ArrowBackIcon style={{ color: "white" }} />
                </IconButton>
            
              <Typography variant="h6" className={classes.title}>
                步道評論與討論
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <div  style={{  position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
        <h1>查無此評論</h1>
        </div>
         
      </div>
    </>
    );
  }
}
