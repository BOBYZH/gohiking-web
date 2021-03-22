import React, { Fragment, useState, useEffect } from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import axios from "axios";
import TrailList from "../../components/Lists/TrailCard";
import BackArrow from "../../components/TopBar/BackArrow";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";

import ShareIcon from "@material-ui/icons/Share";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    fontFamily: "NotoSansCJKtc",
  },
  backArrow: {
    position: "absolute",
    top: "0",
    left: "0",
    color:"#fff",
    display: "block",
    width: "40px",
    height: "40px",
  },
  favoriteIcon: {
    width: "40px",
    height: "40px",
    position: "absolute",
    top: "0",
    right: "20%",
    display: "block",
    color: "#ffffff",
  },
  shareIcon: {
    width: "40px",
    height: "40px",
    position: "absolute",
    top: "0",
    right: "0",
    display: "block",
    color: "#ffffff",
  },
  bar: {
    height: "56px",
    backgroundColor: "transparent",
  },
  Img: {
    width: "100%",
    height: "179px",
  },
  title: {
    height: "36px",
    textIndent: "5%",
    fontSize: "22px",
    fontWeight: "bold",
    lineHeight: "1.64",
    letterSpacing: "0.46px",

    color: "#232323",
  },
  text: {
    height: "84px",
    margin: "16px 16px 24px",
    fontSize: "14px",

    lineHeight: "1.5",
    letterSpacing: "0.5px",
    color: "#232323",
  },
  background: {
    margin: "24px 16px",
    height: "1px",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  textlist: {
    width: "74px",
    height: "27px",
    width: "100%",
    textIndent: "5%",
    fontSize: "18px",
    fontWeight: "bold",
  },
  trailList: {
    padding: " 5%",
  },
  arrow: {
    width: "24px",
    height: "24px",
    margin: "1px 32px 2px 0",
    objectFit: "contain",
  },
}));

const api = axios.create({
  //heroku
  baseURL: "https://go-hiking-backend-laravel.herokuapp.com/",
  headers: {
    "X-Secure-Code": "12345678",
  },
});
const demoapi = axios.create({
  //測試 api
  baseURL: "http://09da54f0b81b.ngrok.io",
  headers: {
    "X-Secure-Code": "12345678",
  },
});

function Column(props) {
  const classes = useStyles();
  const [trail, setTrail] = useState([]);
  const [article, setArticle] = useState([]);
  const id = props.match.params.id;

  console.log(id);

  const articleApi = async (id) => {
    //搜尋文章頁面api
    await demoapi.get("/api/article/" + id).then((res) => {
      setArticle(res.data);
      setTrail(res.data.trails);
    });
  };

  useEffect(() => {
    articleApi(id);
  }, [id]);
  console.log(article);
  return (
    <>
      <div className={classes.root}>
        <ThemeProvider>
          <img src={article.image} className={classes.Img} />

          <Grid item xs={12} >
            <Link to="/home" className={classes.backArrow} >
              <BackArrow />
            </Link>
          </Grid>
          <Grid className={classes.favoriteIcon}>
            <FavoriteIcon />
          </Grid>
          <Grid className={classes.shareIcon}>
            <ShareIcon />
          </Grid>
          <div className={classes.title}>{article.title}</div>
          <Grid item xs={12}>
            <div className={classes.text}>{article.content}</div>
          </Grid>

          <Grid item xs={12}>
            <div className={classes.background} />
          </Grid>
          <Grid item xs={12} container>
            <div className={classes.textlist}>步道推薦</div>
            <div className={classes.trailList}>
              {/* 步道list component */}
              <TrailList data={trail} />
            </div>
          </Grid>
        </ThemeProvider>
      </div>
    </>
  );
}

export default Column;
