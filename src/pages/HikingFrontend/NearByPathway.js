import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "axios";
import {
    makeStyles, withStyles,
} from "@material-ui/core/styles";
// Import Swiper React components
// Import Swiper styles
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Navigation from "../../components/Bottom/Navigation";
import PathwayDistance from "../../components/PathwayCard/PathwayDistance";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { ReactComponent as Map } from '../../asset/img/map.svg';
// for GPS dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Custom the Button theme
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from "@material-ui/core/styles"
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            // This is green we need to use
            main: '#00d04c',
        },
        secondary: blue,
    },
});

const WhiteTextTypography = withStyles({
    root: {
        color: "#FFFFFF"
    }
})(Typography);

const styles = {
    indicator: {
        backgroundColor: '#00d04c',
    },
    root: {
        fontFamily: "NotoSansCJKtc",
        flexGrow: 1,
        width: "100%",
    },
    appbar: {
        width: "-webkit-fill-available",
        height: "56px",
        backgroundColor: "#3c5754"
    },
    tabs: {
        width: "-webkit-fill-available",
        height: "48px",
        margin: "12px 0 0",
        backgroundColor: "#3c5754"
    },
    listItem: {
        height: "48px",
        margin: "20px 20px 20px",
        fontSize: "20px"
    },
    title: {
        fontFamily: "PingFangTC",
        width: "-webkit-fill-available",
        padding: "17px 0 0 16px",
        fontSize: "18px"
    },
    mapBox: {
        width: 210,
        margin: '123px auto',
        textAlign: 'center',
        fontSize: 16,
    },
    DialogBtn: {
        color: '#007aff',
        fontSize: '14px'
    }
};
const useStyles = makeStyles(styles);

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'} className={classes.listItem}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function NearByPathway() {
    //style for this page
    const classes = useStyles();
    //gps & get api setting
    const [gpsSetting, setGpsSetting] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [searchMaple, setSearchMaple] = useState([]);
    const [searchChallenge, setSearchChallenge] = useState([]);
    const [searchSpring, setSearchSpring] = useState([]);
    const [searchFamily, setSearchFamily] = useState([]);
    const [yes, setYes] = useState("");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSetting = () => {
        setOpenDialog(false);
        setYes(1);

    };
    const handleCancel = () => {
        setOpenDialog(false);
    };

    const GPS = async () => {
        await navigator.geolocation.getCurrentPosition(success, error);
    };

    //call trails and set trails data in search and id is category
    const initial = async () => {
        await axios.get('https://gohiking-server.herokuapp.com/api/classification/1&uuid=1')
            .then((response) => {
                //console.log(response.data.trails);
                setSearchMaple(response.data.trails);
            });
        await axios.get('https://gohiking-server.herokuapp.com/api/classification/2&uuid=1')
            .then((response) => {
                //console.log(response.data.trails);
                setSearchChallenge(response.data.trails);
            });
        await axios.get('https://gohiking-server.herokuapp.com/api/classification/3&uuid=1')
            .then((response) => {
                //console.log(response.data.trails);
                setSearchSpring(response.data.trails);
            });
        await axios.get('https://gohiking-server.herokuapp.com/api/classification/4&uuid=1')
            .then((response) => {
                //console.log(response.data.trails);
                setSearchFamily(response.data.trails);
            });
        console.log('======success========');
    }

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        console.log('prepare to initial!');
        initial();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const secondUpdate = useRef(true);
    useLayoutEffect(() => {
        if (secondUpdate.current) {
            secondUpdate.current = false;
            return;
        }
        console.log("GPS is fired now!");
        GPS();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yes]);


    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);


    function success(pos) {
        var crd = pos.coords;
        setLat(crd.latitude);
        setLng(crd.longitude);
        console.log("Your current position is:");
        console.log("Latitude : " + crd.latitude);
        console.log("Longitude: " + crd.longitude);
        console.log("More or less " + crd.accuracy + " meters.");
        setGpsSetting(true);
    }

    function error(err) {
        console.warn("ERROR(" + err.code + "): " + err.message);
    }

    localStorage.setItem("previous_pathname", "/NearByPathway");

    return (
        <>

            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar className={classes.appbar} position="static">
                        <WhiteTextTypography className={classes.title}>
                            附近步道
                        </WhiteTextTypography>
                        <Tabs
                            indicatorColor="primary"
                            className={classes.tabs}
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            aria-label="collection tabs"
                        >
                            <Tab label={<span style={{ color: '#ffffff' }}>賞楓</span>} {...a11yProps(0)} />
                            <Tab label={<span style={{ color: '#ffffff' }}>挑戰</span>} {...a11yProps(1)} />
                            <Tab label={<span style={{ color: '#ffffff' }}>溫泉</span>} {...a11yProps(2)} />
                            <Tab label={<span style={{ color: '#ffffff' }}>親子</span>} {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                    {gpsSetting ?
                        <>
                            <TabPanel value={value} index={0}>
                                {searchMaple.map((path, i) => (
                                    <PathwayDistance
                                        favorite={path.favorite}
                                        avatar={path.coverImage}
                                        title={path.title}
                                        region={path.location.county.name}
                                        location={path.location.name}
                                        miles={path.distance}
                                        yourlng={lng}
                                        yourlat={lat}
                                        longitude={path.longitude}
                                        latitude={path.latitude}
                                        trail_id={path.id}
                                        key={i}
                                    />
                                ))}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {searchChallenge.map((path, i) => (
                                    <PathwayDistance
                                        favorite={path.favorite}
                                        avatar={path.coverImage}
                                        title={path.title}
                                        region={path.location.county.name}
                                        location={path.location.name}
                                        miles={path.distance}
                                        yourlng={lng}
                                        yourlat={lat}
                                        longitude={path.longitude}
                                        latitude={path.latitude}
                                        trail_id={path.id}
                                        key={i}
                                    />
                                ))}
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                {searchSpring.map((path, i) => (
                                    <PathwayDistance
                                        favorite={path.favorite}
                                        avatar={path.coverImage}
                                        title={path.title}
                                        region={path.location.county.name}
                                        location={path.location.name}
                                        miles={path.distance}
                                        yourlng={lng}
                                        yourlat={lat}
                                        longitude={path.longitude}
                                        latitude={path.latitude}
                                        trail_id={path.id}
                                        key={i}
                                    />
                                ))}
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                {searchFamily.map((path, i) => (
                                    <PathwayDistance
                                        favorite={path.favorite}
                                        avatar={path.coverImage}
                                        title={path.title}
                                        region={path.location.county.name}
                                        location={path.location.name}
                                        miles={path.distance}
                                        yourlng={lng}
                                        yourlat={lat}
                                        longitude={path.longitude}
                                        latitude={path.latitude}
                                        trail_id={path.id}
                                        key={i}
                                    />
                                ))}
                            </TabPanel>
                        </>
                        :
                        <div >
                            <div className={classes.mapBox}>
                                <Map /><br />GPS未開啓<br />請至『設定』並開啟位置設定
                        </div>
                        </div>
                    }
                    <Navigation dfValue={2} />
                    <Dialog
                        fullWidth
                        open={openDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">GPS 未開啟</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">請至『設定』並開啟位置設定。</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={handleCancel}>
                                取消
                            </Button>
                            <Button color="secondary" onClick={handleSetting}>
                                設定
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </ThemeProvider>
        </>
    );
}

export default NearByPathway;