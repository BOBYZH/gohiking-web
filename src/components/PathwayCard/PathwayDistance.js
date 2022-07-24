import React, { useState, useLayoutEffect, useRef } from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
// import styles from 'assets/jss/material-kit-pro-react/components/pathwayStyle.js';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Checkbox, Divider } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import Grid from "@material-ui/core/Grid";
import ButtonBase from '@material-ui/core/ButtonBase';
//import styles from '../../assets/jss/material-kit-pro-react/components/pathwayStyle';
//import { whiteColor } from 'assets/jss/material-kit-pro-react';
//Custom the Button theme
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from "@material-ui/core/styles"
import { green } from '@material-ui/core/colors';
//import api
import demoapi from "axios/api";

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
const styles = {
    gridcontain: {
        marginRight: "-15px",
        marginLeft: "-15px",
        width: "100%",
    },
    gridItem: {
        position: "relative",
        width: "auto",
        height: "auto",
        margin: "16px 0 0 0",
        /* flexBasis: "auto" */
    },
    mediaHeading: {
        textOverflow: 'ellipsis',
        fontSize: '16px',
    },
    mediaFooter: {
        fontSize: '14px',
        
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        color: '#919191'
    },
    mediaDistance: {
        fontSize: '12px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        color: '#919191'
    },
    limitText: {
        fontSize: "16px",
        width: '38vw',
    },
    img: {
        objectFit:'cover',
        width:'100%',
        height:72,
        borderRadius:4,
        minWidth:72,
        maxWidth:300
    },
    favorite: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: "#ffffff"
    },
    Rectangle: {
        fontSize: "12px",
        width: "105px",//need to be fix
        backgroundColor: "rgba(0, 208, 76, 0.1)",
        minHeight: 32,
        minWidth:83
    },
    root: {
        width: '100%',
    }
};
//指定title字數多的變"..."避免擋到顯示距離的button
function renderContentLimit(p){
    const len = 9; // 超過9個字以"..."取代
    //console.log(p.length);
    if(p.length>len){
        const final=p.substring(0,len-1)+"...";
        return final
    }
    else{
        return p
    }
}

function getDistance(start, end) {
    var lon1 = (Math.PI / 180) * start.longitude;
    var lat1 = (Math.PI / 180) * start.latitude;

    var lon2 = (Math.PI / 180) * end.longitude;
    var lat2 = (Math.PI / 180) * end.latitude;

    // 地球半徑
    var R = 6371;

    // 兩點間距離 KM
    var d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * R;

    // 公里轉公尺
    var abs = Math.abs(d);

    return Math.round(abs);
}

const useStyles = makeStyles(styles);

export default function PathwayCard(props) {
    
    const {
        avatar,
        title,
        location,
        miles,
        region,
        favorite,
        trail_id,
        yourlng,
        yourlat,
        longitude,
        latitude,
    } = props;
    const classes = useStyles();
    var start = { longitude: yourlng, latitude: yourlat };
    var end = { longitude: longitude, latitude: latitude };
    var m = getDistance(start, end);
    const history = useHistory();

    const handlePage = () =>{
        history.push({
            pathname:'/pathway',
            state: {trail_id: trail_id},
        });
    };
    //api回傳資料
    const data = props;
    const [nothing, setNothing] = useState(false);
    const [checked, setChecked] = useState(nothing);

    

    const checkFavorite = async() =>{
        console.log('checkFavortite starts!');            
        const userId = localStorage.getItem("userId")
            ? localStorage.getItem("userId")
            : 1;
        //console.log('userId: ', userId);
        await demoapi.get("/api/favorites" + "?uuid=" + userId) // 查詢使用者收藏的步道
        .then(res =>{
            res.data.map(element =>{
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
    useLayoutEffect(()=>{
        if (firstUpdate.current){
            firstUpdate.current = false;
            checkFavorite();
            return;
          }                
          console.log('Checked is like: ', checked);        
    },[checked])

    const handleFavoriteChange = id => {
        const uid = localStorage.getItem("userId")
            ? localStorage.getItem("userId")
            : 1;
        setChecked(!checked);
        //console.log('uid: ',uid);
        demoapi
            .post("/api/favorite/?user_id=" + uid + "&trail_id=" + id)
            .then(res => {
                console.log(res.status);
            });
    };
    return (
        <div>
            <Grid container className={classes.gridcontain} spacing={2} direction='row'
                justify='center'
                alignItems='center'

            >
                <Grid item className={classes.gridItem} xs={4}>
                    <ButtonBase >
                        <img alt="" className={classes.img} src={avatar}  />
                        <Checkbox
                            data-testid='checkFavorite'
                            checked={checked}
                            onChange={() =>{handleFavoriteChange(data.trail_id)}}
                            icon={<FavoriteBorder fontSize={'small'} />}
                            checkedIcon={
                                <Favorite fontSize={"small"} style={{ color: "#FFF" }} />
                            }
                            className={classes.favorite}
                            name='favorite' />
                    </ButtonBase>
                </Grid>
                <Grid component={'span'} item xs={5} >
                    <ButtonBase onClick={handlePage}>
                        <Typography noWrap className={classes.mediaHeading}>{renderContentLimit(title)}</Typography>
                    </ButtonBase>
                        <Typography className={classes.mediaFooter}>{region}{location}</Typography>
                        <Typography className={classes.mediaDistance}>全程約 {miles} km</Typography>
                    
                </Grid>
                <Grid item xs={3}>
                <ThemeProvider theme={theme}>
                        <Button
                            fullWidth
                            size='small'
                            variant='outlined'
                            color="primary"
                            className={classes.Rectangle}
                            startIcon={<LocationOnIcon />}
                        >
                            {m} km
                    </Button>
                </ThemeProvider>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
        </div>
    );
}

PathwayCard.propTypes = {
    pathLink: PropTypes.string,
    avatar: PropTypes.string,
    title: PropTypes.node,
    location: PropTypes.node,
    miles: PropTypes.node,
};
