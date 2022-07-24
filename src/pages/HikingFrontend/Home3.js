import React, {useState, useEffect} from "react";
import axios from "axios";
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import SearchIcon from '@material-ui/icons/Search';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import family from "../../asset/img/icon-family.svg";
import  mapple from '../../asset/img/icon-mapple.svg';
import chellenge from "../../asset/img/icon-chellenge.svg";
import hotSpring from "../../asset/img/icon-hot-spring.svg";
import forest from "../../asset/img/icon-forest.svg";
import sakura from "../../asset/img/icon-sakura.svg";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme)=> ({
    container: {
      display:'flex',
      flexDirection: 'column',  // flexDirection:'column' 使button strech 開來
      height: '768px',
      width: '411px',
    },
    root:{
      maxheight: '600',
    },
    menuButton: {
        marginRight: theme.spacing(2),
      },
    title: {
        flexGrow: 1,
      },
    imageIcon: {
        height: '100%',
      },
    iconRoot: {
        textAlign: 'center',
      },
    button1:{
        backgroundColor:'#00d04c',
        color: '#ffffff',
        width: '98px',
        height: '28px',
        borderRadius: '14px',

        fontWidth: '58px',
        fontHeight: '21px',
        margin: '0 5px 0 0',
        fontFamily: 'NotoSansCJKtc',
        fontSize: '14px',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.5',
        letterSpacing: '0.5px',
    },
    text1:{
        width: '158px',
        height: '36px',
        margin: '0 69px 8px 0',
        fontFamily: 'NotoSansCJKtc',
        fontSize: '22px',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.64',
        letterSpacing: '0.46px',
        color: '#ffffff',
    },
    text2:{
        width: '227px',
        height: '24px',
        margin: '8px 0 24px',
        fontFamily: 'NotoSansCJKtc',
        fontSize: '16px',
        fontWeight: '300',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.5',
        color: '#ffffff',

    },
    greyRectangle:{
        width: '100%',
        height: '16px',
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    whiteRectangle:{
        width: '100%',
        height: '112px',
        margin: '16px 0 0',
        padding: '8px 0 8px 0px',
        boxShadow: '0 0.5px 1px 0 rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent:'space-around',
    },
    quickSearch:{
        width: '72px',
        height: '96px',
        margin: '0 16px 0 0',
        padding: '12px 12px 8px',
    },
    quickSearchTitle:{
        // margin: "0px 21px 8px 22px", 
        // color: "#232323", 
        // fontSize: "14px", 
        // fontWeight:"700",


        width: '72px',
        height: '21px',
        fontFamily: 'NotoSansCJKtc',
        fontSize: '14px',
        fontWeight: '700',
        textAlign: 'center',
    },
    recommendTitle:{
        width: '100px',
        height: '36px',
        margin: '8px 100px 8px 16px',
        fontFamily: 'NotoSansCJKtc',
        fontSize: '22px',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.64',
        letterSpacing: '0.46px',

    },
    recommendation:{
        width: '100px',
        height: '160px',
        display:'flex',
        justifyContent: 'flex-start',        
    },
    recommendBlock:{
        width: '174px',
        height: '143px',
        margin: '0px 0px 0px 16px',
        backgroundColor: '#ffffff',
        
    },
    recommendBlockTitle:{
        width: '164px',
        height: '21px',
        margin: '8px 10px 1px 0px',
        fontFamily: 'NotoSansCJKtc',
        fontSize: '14px',
        fontWeight: '700',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.5',
        letterSpacing: '0.5px',
        color: '#000000',
    },
    recommendBlockDate:{
        width: '62px',
        height: '18px',
        margin: '0 0 0 0',
        fontFamily: 'NotoSansCJKtc',
        fontSize: '10px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.8',
        letterSpacing: '0.42px',
        color: '#919191',
    },
    tabs:{
        margin: '54px 0 0 0',
    },
    swiper: {
        backgroundColor: "#fffff",
        height: "112px",
        textAlign: "center",
        margin: "16px 0 0",
        padding: "8px 0 8px 16px",
    
      },
  }));


  const recommendTheme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiCardMedia: {
        // Name of the rule
        img: {
          //Some CSS
          height: '96px',
          width: '174px',
        //   margin: '0px 8px',
          objectFit: 'cover',
        },
        
      },
      MuiCardActionArea:{
        root: {
            width: '72px',
            height: '96px',
        }
      },
      MuiCardContent:{
          root:{
              padding: 0,
          }
      }
    },
  });
  const tabTheme = createMuiTheme({
    palette: {
      secondary: {
        main: '#00d04c',
      },
    },
  });

  const api = axios.create({
    baseURL: "https://go-hiking-backend-laravel.herokuapp.com/",
    headers: {
      "X-Secure-Code": "12345678",
    },
  });
  
  const obj = {
    "mapple.png": mapple,
    "chellenge.png": chellenge,
    "hotSpring.png": hotSpring,
    "family.png": family,
    "forest.png": forest,
    "sakura.png": sakura,
  };
  
function Home3(){
    const classes = useStyles();
    const [collection, setcollection] = useState([]);
    const [value, setValue] = React.useState(0);
    const searchApi = async () => {
        await api.get("/api/collection").then((res) => {
          setcollection(res.data);
        });
      };
      useEffect(() => {
        searchApi();
      }, []);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className="container">
            <AppBar position="static" style={{background: '#3c5754'}}>
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Go Hiking
                </Typography>
                <Button color="inherit">
                    <SearchIcon style={{color: '#ffffff', fontSize: '24px'}}/>
                </Button>
                </Toolbar>
            </AppBar>

            <div className = "container container2">
                <section className = "contextBlock" style={{padding: '40px 16px 70px', width: '259px', height: '230px', float: 'left', backgroundColor: '#232323'}}>
                    <div className = {classes.text1}>親子步道上線囉</div>
                    <div className = {classes.text2}>帶著你的老爸冒險去。</div>
                    <input type = "button" value= "查看步道→" className = {classes.button1}></input>
                </section>
                <Card className={classes.root} style={{backgroundColor: "white"}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="family"
                            height="230"
                            width="342"
                            image="/asset/images/family.jpg" 
                            title="family image"
                        />
                    </CardActionArea>
                </Card>
            </div>
            <div className = {classes.greyRectangle}></div>
            
            <Swiper
            className={classes.swiper}
            spaceBetween={25}
            slidesPerView={6}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            >
            {collection.map((collection) => (
              <SwiperSlide>
                <Link
                  to={`/searchQuick/${collection.id}`}
                  className={classes.linkstlye}
                >
                  <img
                    src={obj[collection.iconImage]}
                    className={classes.iconImg}
                    alt={collection.iconImg}
                  />
                  <div className={classes.icontext}>{collection.name}</div>
                </Link>
              </SwiperSlide>
            ))}
            </Swiper>
            <div className = {classes.greyRectangle}></div>
            <div className = {classes.recommendTitle}><div>行程推薦</div></div>
                <div className =  {classes.recommendation}> {/*有利用到flexbox */}
                    <div className = {classes.recommendBlock}>
                        <ThemeProvider theme={recommendTheme}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="family"
                                    width="174"
                                    image="/asset/images/trail1.jpg" 
                                    title="Sign-in background img"
                                />
                            </CardActionArea>
                            <CardContent>                            
                                <Typography className={classes.recommendBlockTitle} textAlign="center">2020跨年日出秘境步道...</Typography>                          
                                <Typography className={classes.recommendBlockDate} variant = "h5" textAlign="center">2019-12-11</Typography>                          
                            </CardContent>                            
                        </ThemeProvider>
                    </div>

                    <div className = {classes.recommendBlock}>
                        <ThemeProvider theme={recommendTheme}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="family"
                                    height="96"
                                    width="74"
                                    image="/asset/images/trail2.jpg" 
                                    title="Sign-in background img"
                                />
                            </CardActionArea>
                            <CardContent>                            
                                <Typography className={classes.recommendBlockTitle} textAlign="center">2020跨年日出秘境步道...</Typography>                          
                                <Typography className={classes.recommendBlockDate} variant = "h5" textAlign="center">2019-12-31</Typography>                          
                            </CardContent>                            
                        </ThemeProvider>
                    </div>

            </div>
            <div className = {classes.greyRectangle}></div>

            <Paper square className={classes.tabs}>
                <ThemeProvider theme={tabTheme}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="icon label tabs example"
                    >
                        <Tab icon={<HomeIcon />} label="首頁" />
                        <Tab icon={<SearchIcon />} label="步道搜尋" />
                        <Tab icon={<LocationSearchingIcon />} label="附近步道" />
                        <Tab icon={<FavoriteIcon />} label="我的收藏" />
                    </Tabs>
                    </ThemeProvider>
            </Paper>
            
        </div>
    );
};

export default Home3; 