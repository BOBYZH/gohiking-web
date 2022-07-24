import React , {useState, useLayoutEffect, useRef} from 'react';
import Slider from "react-slick";
import {makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import fontStyle from '../../assets/jss/fontStyle';
import basicStyle from '../../assets/jss/basicStyle';
// import { pathwayInfo } from '../../data/pathway';
import darkTheme from '../../config/darkTheme';

import AppBar from '@material-ui/core/AppBar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShareIcon from '@material-ui/icons/Share';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { Grid, GridList } from "@material-ui/core";

import { useHistory } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import Charts from 'react-apexcharts';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Zmage from 'react-zmage'
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import Snackbar from '@material-ui/core/Snackbar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Comment from '../../components/Comment/Comment2';
import Rating from "@material-ui/lab/Rating";

import CommentIcon from '@material-ui/icons/Comment';
import GPSMapLink from '../components/GPSMapLink/GPSMapLink';
import MuiAlert from '@material-ui/lab/Alert';
import demoapi from "axios/api";
import { Checkbox } from "@material-ui/core";
import { Favorite, FavoriteBorder, RadioButtonUnchecked, SettingsInputAntennaRounded } from "@material-ui/icons";

    const style = {
        ...fontStyle,
        ...basicStyle,
        buttonAlign :{
            padding: 0,
        },
    };
    
    const useStyles = makeStyles(style)
    const bannerCarousel = { //控制react-slick的properties
        dot: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    const pathwayCarousel = { //控制react-slick的properties
        dots: false,
        arrows: false,
        variableWidth: true,
        swipeToSlide: true,
        swipe: true,
        infinite: false,
    };

    const twoRowCarousel = {
        rows: 2,
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
   

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} style={{
          position: 'fixed', bottom: '8vh',
          left: '50%',
          transform: 'translate(-50%, -50%)', width: 379
        }} />;
    }

    const lightTheme = createMuiTheme({
        palette: {
          type: "light",
          primary: {
            main: "#00d04c",
          },
        },
    });


  
   
    const Pathway = (props) =>{
        var pathwayInfo = [];
        const trail_id = props.location.state.trail_id;
        const uid = localStorage.getItem('userId');
        const previous_pathname = localStorage.getItem('previous_pathname');
        console.log(previous_pathname)
        const classes = useStyles();
        const history = useHistory();             
        const [nothing, setNothing] = useState(false);         
        const [checked, setChecked] = useState(nothing); //這邊應該要吃axios回傳的後端資料        
        const [open, setOpen] = React.useState(true);
        const handleClose = () => {
            setOpen(false);
        };
        const [album, setAlbum] = useState([]);
        const [chips, setChips] = useState([]);
        const [trailHead, setTrailHead] = useState([]);
        const [announcement, setAnnouncement] = useState([]);
        const [attraction, setAttraction] = useState([]);
        const [articles, setArticles] = useState([]);
        const [similar, setSimilar] = useState([]);
        const [title, setTitle] = useState([]);
        const [comment, setComment] = useState([]);
        const [comments, setComments] = useState([]);
        const [basicInfo, setBasicInfo] = useState('');
        const [radar, setRadar] = useState([]);
        const [star, setStar] = useState(0);
        const [trailStatus, setTrailStatus] = useState('');
        const [test, setTest] = useState([]);
        console.log('trail_id: ',trail_id);
        console.log('userId:', uid);
        
        
        const getInfo = async() =>{
            await demoapi.get("/api/trailinfo/" + trail_id + "?uiud=" + localStorage.getItem("userId"))
            .then(res =>{
                // console.log('res', res);
                // console.log('res.data', res.data);
                pathwayInfo = res.data;
                setTest(res.data.album);
                setBasicInfo(res.data);
                setAlbum(pathwayInfo.album.slice(0,1));
                setChips(pathwayInfo.chips);
                setTrailHead(pathwayInfo.trailHead);
                setAnnouncement(pathwayInfo.announcement.slice(0,3));
                setAttraction(pathwayInfo.attraction);
                setArticles(pathwayInfo.articles);
                setSimilar(pathwayInfo.similar);
                setTitle(pathwayInfo.title);
                setStar(decimalAdjust('floor', pathwayInfo.comment.avgStar, -1));    
                setRadar(pathwayInfo.chart);        
                setTrailStatus(pathwayInfo.trailstatus);
            })
            .catch(function (error){
                console.log('====error==== ',error);
            })

            await demoapi.get("/api/comment/" + trail_id + "?uuid=" + uid).then((res) => {
                setComment(res.data);
                setComments(res.data.comments.slice(0,2)); 
              });
        }

              
        
        const checkFavorite = async() =>{
            console.log('checkFavortite starts!');            
            const userId = localStorage.getItem("userId")
                ? localStorage.getItem("userId")
                : 1;
            console.log('userId: ', userId);
            await demoapi.get("/api/favorites" + "?uuid=" + userId) // 查詢使用者收藏的步道
            .then(res =>{
                console.log('res', res);
                console.log('trail_id', trail_id);
                res.data.map(element =>{
                    console.log('element: ', element);
                    let counter = element.trail_id;
                    if (counter == trail_id){
                        console.log("this trail has already been liked!");
                        setNothing(true);
                        setChecked(true);                        
                    }
                })                
            })
            .catch(function (error){
                console.log('====error==== ',error);
                console.log('checked is checked!');
              })
            
        }

        const firstUpdate = useRef(true);
        console.log('firstUpdate', firstUpdate);
        useLayoutEffect(()=>{
            if (firstUpdate.current){
                firstUpdate.current = false;
                getInfo(); 
                checkFavorite();
                return;
              }               
            //   console.log('Checked is like: ', checked);        
        },[checked])

        

         
        const handleChange = trail_id => {
            const userId = localStorage.getItem("userId")
            // 由於沒有userId所以需要讓使用者登入
            console.log('user')
            if(userId === null || userId === -1 || userId === undefined){
                history.push('/collectpage');
            }
            setChecked(!checked);
            demoapi
                .post("/api/favorite/?user_id=" + userId + "&trail_id=" + trail_id)
                .then(res => {
                console.log('res', res);
                console.log(res.status);
                });                
        };
      
        const handleShare = () => {
            if (navigator.share) {
                console.log("Congrats! Your browser supports Web Share API");
                navigator
                    .share({
                        url: `https://share.toogoodtogo.com/store/1006/milestones/meals-saved/`
                    })
                    .then(() => {
                        console.log("Sharing successfull");
                    })
                    .catch(() => {
                        console.log("Sharing failed");
                    }); 
            } else {
                console.log("Sorry! Your browser does not support Web Share API");
            }
        };

        const decimalAdjust = (type, value, exp) => {
            // If the exp is undefined or zero...
            if (typeof exp === 'undefined' || +exp === 0) {
              return Math[type](value);
            }
            value = +value;
            exp = +exp;
            // If the value is not a number or the exp is not an integer...
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
              return NaN;
            }
            // Shift
            value = value.toString().split('e');
            value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
            // Shift back
            value = value.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
          }


        const chartSetting={
            series: [{
                name: 'Series 1',
                data: radar,
              }],
            options: {
                chart: {
                  height: 350,
                  type: 'radar',
                  toolbar:{
                      show: false,
                  }
                },
                xaxis: {
                  categories: ['距離', '難易', '熱門', '景色', '高度'],
                  labels:{
                    style: {
                        colors: [],
                        fontSize: '16px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                  },
                },
                yaxis:{
                    show: false,
                },
                colors: ['#00d04c'],
                markers: {
                    size: 2,
                    colors: undefined,
                    strokeColors: '#fff',
                    strokeWidth: 1,
                    strokeOpacity: 0.9,
                    fillOpacity: 1,
                    radius: 1,
                },
            }, 
            
        }

        const rerender = (item) =>{
            var temporary = item.trail_id;            
            window.location.reload();
            window.scrollTo(0, 0);
            history.push({
                pathname:'/pathway',
                state:{trail_id: temporary},
            })
        }

        var id = 0;
        if(localStorage.getItem('userId')){
            id= localStorage.getItem('userId'); //取得localstorage ussrId
          }else{
            id = null;  //取不到user Id
        }

            return(
                <ThemeProvider theme = {darkTheme}>
                    <div className = {classes.root}>
    
                        <Slider {...bannerCarousel} className={classes.slider}>                           
                        {album.map((img, i) => (
                            <div key={i}>
                            <img src={img} alt={'slider img'} className={classes.sliderImg} />
                            </div>
                        )
                        )}
                        </Slider>
                        <AppBar className = {classes.appBarTransparent}>
                            <Toolbar>
                                <IconButton style={{color: 'inherit'}} onClick={()=>{history.push({ pathname: previous_pathname })}}>
                                    <ArrowBackIcon> </ArrowBackIcon>
                                </IconButton>
                                <span style= {{flexGrow: 1}} /> {/*把剩下的空間全部分配在這個span裡面 */}
                                {/* <IconButton edge="end" color="inherit" aria-label="add to the favorite" onClick={() => {}}>
                                    <FavoriteIcon /> 
                                </IconButton>   */}
                                <Checkbox
                                    checked= {checked} //這邊應該要吃axios回傳的後端資料
                                    onChange={() => {
                                    handleChange(trail_id); //這邊應該要吃axios回傳的後端資料
                                    }}
                                    icon={<FavoriteBorder fontSize={"small"} />}
                                    checkedIcon={
                                    <Favorite style={{ color: "#FFF", fontSize:'24px', }} />
                                    }
                                    className={classes.favorite}
                                    name="favorite"
                                />      
                                <IconButton edge="end" color="inherit" style = {{marginLeft: '24px',}} aria-label="share article" onClick={() => {}}>
                                    <ShareIcon onClick={handleShare} />
                                </IconButton>               
                            </Toolbar>
                        </AppBar>
    
                        
                        
                        <div style={{display: 'flex',}}>
                            <Typography variant="h6" className={classes.titleXLL} style={{marginLeft: '8px', marginTop: '8px', fontWeight: '900'}} >
                                {basicInfo.title}
                            </Typography>
                            <span style= {{flexGrow: 1}} />
                            <Button
                                size="small"
                                variant="outlined"
                                color="secondary"
                                className={classes.locationOnIcon}
                                startIcon={<LocationOnIcon />}
                                style={{marginRight: '16px', marginTop:'16px'}}
                            >
                                {basicInfo.distance} km
                            </Button>
                        </div>
                        <Divider style={{height:'8px'}} />
                        <div style={{paddingTop: '8px', paddingBottom: '8px'}}>
                            {chips.map((chip,i) =>{
                                return <Chip key= {i} label={chip} href="#chip" variant="outlined" style={{margin: '8px', marginRight: 0, padding: '6px', fontSize: '14px', fontWeight: '700'}} />
                            })}
                        </div>
                        <Divider style={{height:'8px'}} />                  
                        <Grid container spacing={0}>
                            <Grid item xs={4} >
                                <div className={classes.hikingInfoLeft}> 海拔 </div>
                            </Grid>
                            <Grid item xs={8} >
                                <div className={classes.hikingInfoRight}> {basicInfo.altitude} m</div>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={4} >
                                <div className={classes.hikingInfoLeft}> 全長 </div>
                            </Grid>
                            <Grid item xs={8} >
                                <div className={classes.hikingInfoRight}> {basicInfo.distance} km </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={4} >
                                <div className={classes.hikingInfoLeft}> 分類 </div>
                            </Grid>
                            <Grid item xs={8} >
                                <div className={classes.hikingInfoRight}> {basicInfo.class} </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={4} >
                                <div className={classes.hikingInfoLeft}> 行程時間 </div>
                            </Grid>
                            <Grid item xs={8} >
                                <div className={classes.hikingInfoRight}> {Math.floor(basicInfo.costTime/60)}h {basicInfo.costTime % 60} m</div>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={4} >
                                <div className={classes.hikingInfoLeft}> 地區 </div>
                            </Grid>
                            <Grid item xs={8} >
                                <div className={classes.hikingInfoRight}> {basicInfo.location} </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={4} >
                                <div className={classes.hikingInfoLeft}> 路面狀況 </div>
                            </Grid>
                            <Grid item xs={8} >
                                <div className={classes.hikingInfoRight}> { <span> {basicInfo.roadstatus}</span> } </div>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom: '16px'}}>
                                <Divider />
                            </Grid>
                        </Grid>
                        <Divider style={{height:'8px'}} />                  
                        <div >
                            <Typography variant = "h6" style={{margin:'16px 0 16px 16px', fontSize:'16px', fontWeight:'900', lineHeight: '1.5', letterSpacing:'0.5px'}}>登山口</Typography>
                            <Slider {...pathwayCarousel} >
                                {trailHead.map((entry, i) => (
                                <div key={i} >
                                    <Button variant={'contained'} style={{ backgroundColor: '#abebdc', }} onClick={() => {history.push({
                                    pathname:'/trailhead',
                                    state: {
                                        trail_id: trail_id,
                                        key: i,
                                    },                                    
                                    })}} className={classes.defaultButton} disableElevation>{entry.name}
                                    </Button>
                                </div>
                                ))}
                            </Slider>
                        </div>
                        <Divider style={{height:'8px'}} />
                        <div >
                            <div style={{fontSize:'16px', marginTop:'16px', marginLeft:'16px', fontWeight: '700'}}>步道雷達圖</div>
                            <Charts options={chartSetting.options} series={chartSetting.series} type="radar" height={325} />
                        </div>
                        <Divider style={{height:'8px'}} />
                        <div style={{display:'flex'}}>
                            <Typography style={{fontSize:'16px', marginTop:'16px', marginLeft:'16px', fontWeight: '700'}}>步道消息</Typography>
                            <span style= {{flexGrow: 1}} />
                            <Button style={{fontSize:'14px', color: '#00d04c', marginTop:'16px', fontWeight:'900', padding:'0'}} onClick={() => {history.push({
                                pathname:'/announcement',
                                state:{
                                    trail_id: trail_id,
                                },
                            })}}>顯示更多</Button>
                            <IconButton edge="end" color="inherit" style = {{color: '#00d04c', marginRight: '6px', marginTop:'16px', padding:'0'}} aria-label="ChevronRightIcon" onClick={() => {history.push({
                                pathname:'/announcement',
                                state:{
                                    trail_id: trail_id,
                                },
                            })}}>
                                <ChevronRightIcon></ChevronRightIcon>
                            </IconButton>                        
                        </div>
                        <div style={{marginLeft:'8px',}}>
                            {announcement.slice(0,3).map((news, i) => (
                                <AnnouncementCard
                                // pathLink={news.link}
                                coverImage={news.imgUrl}
                                title={news.title}
                                date={news.date}
                                source={news.source}
                                key={i}
                                />
                            ))}
                        </div>
                        <Divider style={{height:'8px'}} />
                        <div style={{padding: '16px 16px 0 16px'}}>
                            <Typography style={{marginBottom: '16px', fontSize:'16px', fontWeight: '700'}}>步道介紹</Typography>
                            <Typography style={{marginBottom: '24px', fontSize:'14px'}}>{basicInfo.intro}</Typography>
    
                            {/* <a className={classes.buttonBase} onClick={() => Zmage.browsing({ src: imagePath })}>                
                                <img style={{position:'absolute', width:'100%', height:'224px', objectFit:'cover'}}alt={'map'} src={pathwayInfo.map}/>
                                <div style={{position:'relative', width:'100%', height:'224px',backgroundColor: 'rgba(0,0,0,0.6)', top:'100px', left:'50px'}}></div> 
                                <img alt={'map'} src={pathwayInfo.map} className={classes.map} />
                                <div className={classes.overlay} />
                                <div className={classes.mapIcon}><ZoomInIcon fontSize="large" /></div>                            
                                </a> */}
                            <ButtonBase className={classes.buttonBase} onClick={() => Zmage.browsing({ src: basicInfo.map })} >
                                <img alt={'map'} src={basicInfo.map} className={classes.map} />
                                <div className={classes.overlay} />
                                <div className={classes.mapIcon}>
                                    <ZoomInIcon fontSize="large" />
                                </div>
                            </ButtonBase>
                        </div>
                        <Divider style={{height:'8px'}} />
                        <div>
                            <Typography style={{margin:'16px 0 16px 16px', fontSize:'16px', fontWeight: '700'}}>步道照片</Typography>
                            <Slider {...pathwayCarousel}>
                                {album.slice(0, 1).map((img, i) => (
                                    <ButtonBase onClick={() => Zmage.browsing({ src: img })} >
                                        <div key={i}>
                                        <img src={img} alt={'slider img'} style={{width:'96px', height:'96px', objectFit:'cover', marginLeft:'16px', marginBottom:'16px'}} />
                                        </div>
                                    </ButtonBase>
                                ))}
                            </Slider>
                        </div>
                        <Divider style={{height:'8px'}} />
                        <div>
                            <Typography style={{margin:'16px 0 16px 16px', fontSize:'16px', fontWeight: '700'}}>鄰近景點</Typography>
                            <Slider {...pathwayCarousel}>
                            {attraction.map((item, i) => (
                                <div key={i}>
                                    <Button variant={'contained'} style={{ backgroundColor: '#abddeb', minWidth:'83px', margin:'0 0 16px 16px' }}
                                    onClick={()=>{history.push({
                                        pathname: '/attraction',
                                        state: { 
                                            tab: i,
                                            trail_id: trail_id, 
                                        },
                                        
                                    })}}
                                    disableElevation>{item.category}</Button>
                                </div>
                            ))}
    
                            </Slider>
                        </div>
                        <Divider style={{height:'8px'}} />
                        <div style={{padding:'16px 0 0 16px', marginBottom:'16px', display:'flex'}}>
                        <Typography style={{fontSize:'16px', fontWeight: '700'}}>步道紀錄與評價</Typography>
                            <span style= {{flexGrow: 4}} />
                            <Button style={{fontSize:'14px', color: '#00d04c', fontWeight:'900', padding:'0',}} onClick={() => {history.push({
                                pathname:'/trailComment',
                                state: {trail_id: trail_id},
                                })}}>顯示更多</Button>                                
                            <IconButton edge="end" color="inherit" style = {{color: '#00d04c', marginRight: '6px', padding:'0'}} aria-label="ChevronRightIcon" onClick={() => {history.push({
                                pathname:'/trailComment',
                                state: {trail_id: trail_id},
                                })}}>
                                <ChevronRightIcon></ChevronRightIcon>
                            </IconButton>                                            
                        </div>
                        <Rating precision = {0.1} value = {star} readOnly style={{fontSize:'28px', marginBottom:'16px', marginLeft:'16px',}}></Rating>
                        <Divider />
                        <div>
                            {comments.map((child)=>(
                                <Comment data ={child}></Comment>
                            ))}
                        </div>
                        <Divider style={{height:'8px'}} />
                        <div>
                            <Typography style={{margin:'16px 0 16px 16px', fontSize:'16px', fontWeight: '700'}}>相關文章</Typography>
                                <Slider {...pathwayCarousel}>
                                    {articles.map((item, i) => (
                                        <div key={i}>
                                            <img src={item.image} alt = 'related_article_images' style={{width:'174px', height:'96px', objectFit:'cover', margin:'0 0 8px 16px'}}></img>
                                            <Typography style={{fontSize:'14px', fontWeight:'900', marginBottom:'1px', marginLeft:'16px',}}>{item.title}</Typography>
                                            <Typography style={{fontSize:'10px', color:'979797', marginBottom:'16px',marginLeft:'16px',}}>{item.date}</Typography>
                                        </div>
                                    ))}
                                </Slider>                       
                        </div>
                        <Divider style={{height:'8px'}} />
                        <div>
                            <Typography style={{margin:'16px 0 16px 16px', fontSize:'16px', fontWeight: '700'}}>相似步道</Typography>
                                <Slider {...twoRowCarousel}>
    
                                    {similar.map((item, i) => (                                       
                                            
                                                <Button key={i} className={classes.buttonAlign} onClick={()=>(rerender(item))}>
                                                <Grid container spacing={0}>
                                                    <Grid item xs={4}>
                                                        <img src={item.coverImage} alt = 'similar_pathway_images' style={{width:'104px', height:'72px', objectFit:'cover', margin:'0 0 8px 16px'}}></img>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography style={{fontSize:'16px', fontWeight:'900', marginBottom:'1px', textAlign:'left',}}>{item.title}</Typography>
                                                        <Typography style={{fontSize:'14px', color: '#979797', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', textAlign:'left'}}>{item.location.name}</Typography>
                                                        <Typography style={{fontSize:'12px', color:'#979797', marginBottom:'16px', textAlign: 'left',}}>全程約 {item.distance} km</Typography>
                                                    </Grid>
                                                </Grid>
                                                </Button>

                                    ))}
                                </Slider>                       
                        </div>       
                        <br /><br /><br /><br />
                        {
                            trailStatus !== null ? (
                                <Snackbar open={open} onClose={handleClose}>
                                <Alert severity="info" onClose={handleClose}>目前全線封閉，暫停開放。</Alert>
                                </Snackbar>
                            )
                            :
                            null
                        }
                        
                        <BottomNavigation
                            showLabels
                            className={classes.bottomNavigation}
                            >
                            <BottomNavigationAction onClick={() => (history.push({
                                pathname:'/commentPage',
                                state: {trail_id: trail_id},
                                }))} 
                                label={<Typography className={`${classes.descText} ${classes.noWrap}`} color={'textPrimary'}>評論步道</Typography>} icon={<CommentIcon color={'secondary'} />} className={classes.leftNavigation} />
                            <BottomNavigationAction label={
                                <GPSMapLink
                                text={
                                    <Typography className={`${classes.mainText} ${classes.boldFont}`} >
                                    打開GPS路線
                                    </Typography>
                                }
                                destination={title}
                                />
                            } className={classes.rightNavigation} />
                        </BottomNavigation>
    
                            {/* <BottomNavigation
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                showLabels
                                className={classes.bottomNavigation}
                                >                            
                                <BottomNavigationAction  className={classes.leftNavigation} label="評論步道" icon={<RestoreIcon />} />                            
                                <BottomNavigationAction  className={classes.rightNavigation}  label="打開GPS"/>
    
                            </BottomNavigation> */}
                    </div>
                </ThemeProvider>
            );
        
        



    };


    export default Pathway;
