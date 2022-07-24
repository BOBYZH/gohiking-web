// @material-ui/core components
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider/Divider';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// @material-ui icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// core components
import basicStyle from 'assets/jss/basicStyle';
import demoapi from 'axios/api';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ads from '../../assets/img/assets-for-demo/cards-test.png';
import fontStyle from '../../assets/jss/fontStyle';
import darkTheme from '../../config/darkTheme';
const style = {
    ...basicStyle,
    ...fontStyle,

};
const useStyles = makeStyles(style);

function TabPanel(props) {
    const classes = useStyles();
    const { children, value, index, ...other } = props;

    return (
        <div 
            role="tabpanel"
            hidden={value !== index}
            id={`attraction-tabpanel-${index}`}
            aria-labelledby={`attraction-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div className={classes.sectionPaper}>{children}</div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function allyProps(index) {
    return {
        id: `attraction-tab-${index}`,
        'aria-controls': `attraction-tabpanel-${index}`,
    };
}

const Attraction = (props) => {
    const history = useHistory();
    const [tab, setTab] = useState(0);    
    const classes = useStyles();
    const [basicInfo, setBasicInfo] = useState([]);
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    
    const getInfo = async(trail_id) =>{
        await demoapi.get("/api/attraction/"+ trail_id)
        .then(res =>{
            setBasicInfo(res.data);
            console.log('======basicInfo======',basicInfo);
        })
        .catch(function(error){
            console.log('======error======',error);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }


    useEffect(() =>{
        getInfo(props.location.state.trail_id);
        setTab(props.location.state.tab);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])
    console.log('tab number is: ',tab);

    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => { history.goBack(); }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography className={classes.titleText}>鄰近景點</Typography>
                    </Toolbar>
                    <Tabs value={tab} onChange={handleChange} aria-label="attraction-tabs" variant="fullWidth">
                        {basicInfo.map((tab, i) => (
                            <Tab key={i} label={tab.category} {...allyProps(i)} />
                        ))}
                    </Tabs>
                </AppBar>
                <img src={ads} alt='ad content' className={classes.ads} />
                {basicInfo.map((tabPanel, i) => (
                    <TabPanel key={i} value={tab} index={i} style={{ width: '100vw' }}>
                        {basicInfo[i].data.map((list, j) => (
                            <>
                                <ListItem button key={j} onClick={() => (window.open(list.link))}>
                                    <ListItemText primary={list.title} primaryTypographyProps={{ className: `${classes.descText} ${classes.noWrap}` }} />
                                    <ChevronRightIcon />
                                </ListItem>
                                <Divider variant="middle" />
                            </>
                        ))}
                    </TabPanel>
                ))}
            </div>
        </ThemeProvider>
    );
};

export default Attraction;
