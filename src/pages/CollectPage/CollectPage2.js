import React, { useState, useEffect ,Fragment } from "react";
import heart from "../../asset/img/icon-heart-broken@3x.png";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TrailList from "../../components/Lists/TrailList";
import { Grid, Box, createMuiTheme } from "@material-ui/core";
import TitleBar from "../../components/TopBar/TitleBar";
import Navigation from "../../components/Bottom/Navigation";
import axios from "axios";
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
  button: {
    backgroundColor: "#00d04c",
    width:"100%",
  
    fontSize: "16px",
    textAlign: "center",
    height: "48px;",
    color: "white",
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
}));



const api = axios.create({
  baseURL: "https://go-hiking-backend-laravel.herokuapp.com/",
  headers: {
      "X-Secure-Code": "12345678",
  },
});
export default function CollectPage() {
  const classes = useStyles();
  const [searchResult, setSearchResult] = useState([]);
  const searchApi = async () => {
    await api.get("/api/trail?filters=title:步道" ).then((res) => {
      setSearchResult(res.data);
    });
  };
  useEffect(() => {
    searchApi();
    //載入完就清空kw，使重新載入頁面時會再發送一次apia請求
    return () => {
      
    };
  }, );
  return (
    <>
      <div className={classes.root}>
 
          <TitleBar title="我的收藏" />

          <Grid>
          <TrailList data={searchResult} />            
          </Grid>
       
      </div>
    </>
  );
}
