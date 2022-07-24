import {
    AppBar
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GPSMapLink from 'components/GPSMapLink/GPSMapLink';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import '../../assets/css/slick.css';
import fontStyle from '../../assets/jss/fontStyle';
import {
    infoColor
} from '../../assets/jss/material-kit-pro-react';
import basicStyle from '../../assets/jss/basicStyle';
import darkTheme from '../../config/darkTheme';
// import { pathwayInfo } from '../../data/pathway';
import axios from "axios";
import demoapi from "axios/api";
// import react slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Title from 'antd/lib/typography/Title';

const style = {
    ...fontStyle,
    ...basicStyle
}

const useStyles = makeStyles(style);

const Trailhead = (props) => {
    var pathwayInfo = [];
    console.log('props', props);
    const trail_id = props.location.state.trail_id;
    console.log(trail_id);
    const key = props.location.state.key;
    console.log(key);
    const history = useHistory();
    const classes = useStyles();
    const [trailHead, setTrailHead] = useState([]);
    const [bannerImage, setBannerImage] = useState([]);
    const [trailName, setTrailName] = useState([]);
    const [description, setDescription] = useState([]);
    const [title, setTitle] = useState([]);
    const bannerCarousel = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const pathwayCarousel = {
        dots: false,
        arrows: false,
        variableWidth: true,
        swipeToSlide: true,
        swipe: true,
        infinite: false
    };

    // GET API
    const getAPI = async() => {
        await demoapi.get("/api/trailinfo/" + trail_id + "?uiud=" + localStorage.getItem("userId"))
        .then((response) => {
            console.log('response', response)
            console.log('response.data', response.data);
            pathwayInfo = response.data;
            setTrailHead(pathwayInfo.trailHead);
            setBannerImage(pathwayInfo.trailHead[key].bannerImage);
            setTrailName(pathwayInfo.trailHead[key].name);
            setDescription(pathwayInfo.trailHead[key].description);
            setTitle(pathwayInfo.title);
        })
        .catch((error) => {
            console.log('====error==== ',error);
        })
    }


    const firstUpdate = useRef(false);
    useLayoutEffect(() => {
        if (!firstUpdate.current) {
            console.log('prepare to initial!');
            getAPI();
            firstUpdate.current = true;
            return;
        }
        console.log('finish');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAPI();
        console.log('render');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key])

    console.log(pathwayInfo);
    console.log(trailHead);
    console.log(bannerImage);
    console.log(title);
    console.log(title + trailName);
    console.log(description);

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.root}>
                <Slider className={classes.slider} {...bannerCarousel}>
                    {bannerImage.map((img, i) => {
                        return (
                            <div key={i}>
                                <img src={img} alt={'slider img'} className={classes.sliderImg} />
                            </div>
                        )
                    })}
                </Slider>
                <AppBar className={classes.appBarTransparent}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="back to previous page" onClick={() => { history.push({ pathname: './pathway', state: { trail_id: trail_id }, }); }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography className={classes.titleText}>登山口</Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.sectionPaper} style={{ marginBottom: 64 }}>
                    <Typography className={classes.titleXLL}>{trailName}</Typography>
                    <Typography className={classes.descText}>{description}</Typography>
                    <Divider className={classes.divider} />
                    <Typography className={classes.titleXLL}>其他登山口</Typography>
                    <Slider className={classes.slider} {...pathwayCarousel}>
                        {trailHead.map((entry, i) => {
                            return (
                                i !== key ? (
                                    <div key={i}>
                                        <Button 
                                            variant={'contained'}
                                            style={{ backgroundColor: infoColor[1] }}
                                            // component={Link} to={'/trailhead'}
                                            className={classes.defaultButton}
                                            disableElevation
                                            onClick={() => { history.push({
                                                pathname: './trailhead',
                                                state: {
                                                    trail_id: trail_id,
                                                    key: i
                                                },
                                                })}}
                                        >
                                            {entry.name}
                                        </Button>
                                    </div>
                                ) : null
                            )  
                        })}
                    </Slider>
                </div>
                <div className={classes.bottomNavigation} style={{ padding: '8px 16px', textAlign: 'center' }}>
                    <Button variant="contained" color="secondary" fullWidth style={{ maxWidth: 1440, height: 48 }} disableElevation>
                        <GPSMapLink
                            destination={title + trailName}
                            text={
                                <Typography className={`${classes.mainText} ${classes.boldFont}`}>
                                    打開GPS路線
                                </Typography>
                            }
                        />
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Trailhead;