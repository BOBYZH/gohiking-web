import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import { Grid } from "@material-ui/core";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Navigation from "../../components/Bottom/Navigation";
import family from "../../asset/img/icon-family.svg";
import mapple from "../../asset/img/icon-mapple.svg";
import chellenge from "../../asset/img/icon-chellenge.svg";
import hotSpring from "../../asset/img/icon-hot-spring.svg";
import forest from "../../asset/img/icon-forest.svg";
import sakura from "../../asset/img/icon-sakura.svg";
import { Link, useHistory } from "react-router-dom";
import TemporaryDrawer from "../../components/SideBar/Sidebar-menu";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import demoapi from "../../axios/api"; //引入api
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
    paddingBottom: "120px",
  },
  appbar: {
    backgroundColor: "#3c5754",
    color: "#ffffff",
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  rectangle: {
    height: "230px",
    maxWidth: "100%",
  },
  title: {
    flexGrow: 1,
  },
  marquee: {
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    left: "5%",
    color: "white",
  
  },

  matitle: {
    fontSize: "22px",
    fontFamily: '"NotoSansCJKtc',
    fontWeight: "900",
    lineHeight: 1.5,
    letterSpacing: 0.5,
    textDecoration: "none",

    padding: 8,
  },
  matext: {
    fontFamily: '"NotoSansCJKtc',
    fontWeight: "normal",
    lineHeight: 1.5,
    letterSpacing: 0.5,
    textDecoration: "none",
    padding: 6,
    marginRight: 3,
  },
  mabutton: {
    fontFamily: '"NotoSansCJKtc',
    fontWeight: "normal",
    backgroundColor: "#00d04c",
    margin: 8,
    borderRadius: "50px",
    color: "white",
  },
  maimg: {
    height: "230px",
  },
  swiper: {
    backgroundColor: "#fffff",
    margin:"5%",
    textAlign: "center",
  },
  collection: {
    textAlign: "center",
  },
  icontext: {
    textAlign: "center",
    fontWeight: "bold",
  },

  iconImg: {
    width: "48px",
  },
  scarch: {
    marginLeft: "50%",
  },

  retitle: {
    fontWeight: "bold",
    fontSize: "22px",
    paddingLeft: "5%",
    paddingTop: "3%",
    color: "#232323",
  },

  linkstlye: {
    color: "#000",
    textDecoration: "none",
  },
  swiperslide2: {
    width: "174px",

    margin: 20,
  },
  text: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: 14,
    fontWeight: 500,
    margin: "4px 0",
  },
  time: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    margin: "1px 0",
    fontSize: 10,
    width: "40%",
  },
  Img: {
    width: "174px",
    height: "96px",
    borderRadius: 4,
    height: "96px",
  },
  tangle: {
    width: "100%",
    height: "16px",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
}));

const obj = {
  "mapple.png": mapple,
  "chellenge.png": chellenge,
  "hotSpring.png": hotSpring,
  "family.png": family,
  "forest.png": forest,
  "sakura.png": sakura,
};
//User SwiperCore 導航dot
SwiperCore.use([Pagination]);
export default function HomePage() {
  const classes = useStyles();
  const [banners, setbanners] = useState([]);
  const [collection, setcollection] = useState([]);
  const [articles, setarticle] = useState([]);
  const history = useHistory();
  collection.length = 7;
  banners.length = 5;
  articles.length = 5;

  //首頁行程api
  const articleApi = async () => {
    await demoapi.get("/api/home").then((res) => {
      setarticle(res.data.articles);
      setbanners(res.data.banners);
      setcollection(res.data.classifications);
    });
  };

  const [state, setState] = useState(false);
  const [anchor] = useState("left");
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown") return;
    setState(open);
  };

  useEffect(() => {
    articleApi();
  }, []);

  localStorage.removeItem('previous_pathname');
  
  return (
    <>
      <div className={classes.root}>
        <ThemeProvider theme={lightTheme}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={anchor}
                open={state}
                onClose={toggleDrawer(false)}
              >
                <TemporaryDrawer />
              </Drawer>
              <Typography variant="h6" className={classes.title}>
                Go Hiking
              </Typography>
              <Button color="inherit" href="searchResult">
                <SearchIcon />
              </Button>
            </Toolbar>
          </AppBar>

          <Swiper
            className={classes.rectangle}
            spaceBetween={0} //side 之間距離
            slidesPerView={1} //容器能够同 时显示的slides数量
            mousewheel={true}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{ clickable: true }} //show dots
          >
            {banners.map((banners) => (
              <SwiperSlide
                style={{
                  backgroundColor: "rgba(0, 0, 0, .6)",
                  // 設置背景混和模式為相乘模式
                  backgroundBlendMode: "multiply",

                  backgroundImage: `url(${banners.image})`,
                }}
              >
                <div className={classes.marquee}>
                  <div className={classes.macolor}>
                    <Typography className={classes.matitle}>
                      {banners.title}
                    </Typography>
                    <Typography className={classes.matext}>
                      {banners.content}
                    </Typography>
                  </div>
                  <Button
                    onClick={() => {
                      history.push({
                        pathname: "/columnPage/1",
                      });
                    }}
                    variant="contained"
                    size="small"
                    color="secondary"
                    className={classes.mabutton}
                    endIcon={<ArrowForwardIcon />}
                  >
                    查看步道
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Grid className={classes.tangle} />

          <Swiper
            className={classes.swiper}
            spaceBetween={50}
            slidesPerView={4}
            breakpoints={{
              425:{slidesPerView:4},
              768:{slidesPerView:6}
            }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            showsButtons
            loop={false}
          >
            {collection.map((collection) => (
              <SwiperSlide className={classes.collection}>
                <Link
                  to={`/searchQuick/${collection.id}`}
                  className={classes.linkstlye}
                >
                  <img
                    src={obj[collection.image]}
                    className={classes.iconImg}
                    alt={collection.iconImg}
                  />
                  <div className={classes.icontext}>{collection.name}</div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <Grid className={classes.tangle} />
          <Grid className={classes.retitle}>行程推薦</Grid>
          <Swiper
            spaceBetween={16} //side 之間距離
            slidesPerView={5}
            navigation
            breakpoints={{
              100: {
                width: 100,
                slidesPerView: 1,
              },
              200: {
                width: 200,
                slidesPerView: 1,
              },
              // when window width is >= 640px
              375: {
                width: 375,
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 4,
              },
            }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {articles.map((articles) => (
              <SwiperSlide className={classes.swiperslide2}>
                <Link
                  to={`/columnPage/${articles.id}`}
                  className={classes.linkstlye}
                >
                  <img src={articles.image} className={classes.Img} />

                  <div className={classes.text}>{articles.title}</div>
                  <div className={classes.time}>{articles.created_at}</div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <Grid className={classes.tangle} />

          <Navigation dfValue={0} />
        </ThemeProvider>
      </div>
    </>
  );
}
