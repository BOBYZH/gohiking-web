import { Backdrop, CircularProgress, Grid, GridList } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import BackArrow from "../../components/TopBar/BackArrow";
import TemporaryDrawer from "../../components/SideBar/Sidebar";
import TrailCard from "../../components/Lists/TrailCard";
import demoapi from "axios/api";
import ErrorDialog from "components/Dialog/ErrorDialog";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "16px"
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    marginTop: 12,
    marginBottom: 12
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

function SearchResult(props) {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  console.log(props); //印出SearchBar的aboutProps
  var kw = "";
  //判斷是否有來自於上一個頁面的kw，若沒有則從localStorage取值
  if (props.location.aboutProps !== undefined) {
    kw = props.location.aboutProps.name;
  } else {
    kw = localStorage.getItem("kw");
  }
  //搜尋結果hook
  const [searchResult, setSearchResult] = useState([]);
  //頁面一載入就發送api請求
  useEffect(() => {
    searchApi(kw);
    //載入完就清空kw，使重新載入頁面時會再發送一次api請求
    return () => {
      kw = "";
    };
  }, [kw]);
  //搜尋function
  const searchApi = async kw => {
    setisLoading(true);
    var uid = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : 1;
    await demoapi
      .get("/api/trail?filters=title:" + kw + "&uuid=" + uid.toString())
      .then(res => {
        setisLoading(false);
        if (res.status === 200) {
          setSearchResult(res.data);
        } else {
          setisError(true);
        }
      });
  };
  //搜尋function2
  const searchApiSlideBar = async url => {
    setisLoading(true);
    var uid = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : 1;
    await demoapi.get(url + "&uuid=" + uid).then(res => {
      setisLoading(false);
      if (res.status === 200) {
        setSearchResult(res.data);
      } else {
        setisError(true);
      }
    });
  };

  //useEffect
  return (
    <>
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justify="flex-start"
          spacing={1}
        >
          <Grid item xs={12}>
            <Link to="/searchPage">
              <BackArrow />
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={11}>
              {/* 搜尋欄component */}
              <SearchBar props={(searchApi, kw)} />
            </Grid>
            <Grid item xs={1}>
              {/* 名彥大哥的超猛篩選器 */}
              <TemporaryDrawer kw={kw} searchApi={searchApiSlideBar} />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div className={classes.text}>搜尋結果</div>
          </Grid>
          <Grid item xs={12} container direction="row">
            {/* 步道list component */}
            <GridList cellHeight={72} cols={1}>
              {searchResult.map(trail => (
                <TrailCard data={trail} />
              ))}
            </GridList>
          </Grid>
        </Grid>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress />
        </Backdrop>
      </div>
      <ErrorDialog isOpen={isError} path="/searchPage" />
    </>
  );
}
export default SearchResult;
