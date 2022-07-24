import React, { useState, useEffect, Fragment } from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import TrailCard from "../../components/Lists/TrailCard";
import { Grid, GridList } from "@material-ui/core";
import TitleBar from "../../components/TopBar/TitleBar";
import Navigation from "../../components/Bottom/Navigation";
import Button from "@material-ui/core/Button";
import heart from "../../asset/img/icon-heart-broken@3x.png";
import demoapi from "axios/api"; //引入api
const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#00d04c",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "NotoSansCJKtc",
    flexGrow: 1,
    width: "100%",
  },
  text: {
    fontFamily: "NotoSansCJKtc",
    color: "#232323",
    height: "48px",
    lineheight: "1.5",
    fontSize: "16px",

    textAlign: "center",
  },
  form:{
  margin: '0 16px 48px 16px',
    
  },
  button: {
    width: '-webkit-fill-available',
    height: '48px',
    margin: '40px 0px 0px 0px',
    backgroundColor: '#00d04c',
    color: '#ffffff',
    fontSize:"16px",
  },
  iconImg: {
    heigh: "112",
    width: "112",

    margin: "187px 149.5px 16px",
    display: "block",
  },
  img: {
    display: "flex",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    padding: "5%",
  },
}));

export default function CollectPage() {
  const classes = useStyles();
  const [searchResult, setSearchResult] = useState([]);
  var kw = "步道";
  var uid = 0;
  if(localStorage.getItem('userId')){
     uid= localStorage.getItem('userId'); //取得localstorage ussrId
   }else{
     uid = null;  //取不到user Id
   }
  
  function checkExpireTime() {
    const expireTime = localStorage.getItem('expireTime');
    console.log(expireTime);
    if (!expireTime) { return null; }
    const now = new Date();
    if (now.getTime() > expireTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('expireTime');
      localStorage.removeItem('userId');
      console.log('remove');
      return null;
    }
    console.log('token')
    return localStorage.getItem('token');
  }
  checkExpireTime();

  useEffect(() => {
    searchApi(kw);
    return () => {
      kw = "";
    };
    //載入完就清空kw，使重新載入頁面時會再發送一次apia請求
  }, [kw]);

  const searchApi = async () => {
    await demoapi
      .get("/api/trail?filters=title:" + kw + "&uuid="+uid)
      .then((res) => {
        setSearchResult(res.data);
      });
  };

  localStorage.setItem("previous_pathname", "/CollectPage");

  if(uid !=null ) {return (
    <>
      <div className={classes.root}>
        <ThemeProvider theme={lightTheme}>
          <TitleBar title="我的收藏" />
          <Grid item xs={12} container direction="row">
            {/* 步道list component */}

            <GridList cellHeight={72} cols={1} className={classes.list}>
              {searchResult.map((trail) => {
                if (trail.favorite) {
                  return <TrailCard data={trail} />;
                } else {
                  return "";
                }
              })}
            </GridList>
          </Grid>

          <Navigation dfValue={3} />
        </ThemeProvider>
      </div>
    </>
  );}else{
    return (
      <>
        <div className={classes.root}>
          <ThemeProvider theme={lightTheme}>
            <TitleBar title="我的收藏" />
  
            <Grid>
              <div className={classes.img}>
                <img src={heart} className={classes.iconImg} />
              </div>
              <div className={classes.text}>必須先登入可以收藏並查看喜愛步道</div>
              <div className={classes.form}>
              <Button
                fullWidth
                variant="contained"
                component="a"
                href="/signin"
                className={classes.button}
              >
                登入
              </Button>
              </div>
              <Navigation />
            </Grid>
          </ThemeProvider>
        </div>
      </>
    );
  }
}
