
import React, { Fragment } from "react";
import { makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';


import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
const useStyles = makeStyles((theme) => ({
  footer:{
    boxShadow:" 0 0 3px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor:"white",
    position:"fixed",
    bottom:0,
    left:0,
    zIndex:1,
    width:"100%",
    fontFamily:"NotoSansCJKtc",
  }, 
}));

function Navigation(props) {
  const{dfValue}=props;
  const classes = useStyles(); 
  const [value, setValue] = React.useState(dfValue);

  return(
    
    <Fragment>
    <div className={classes.bottom}>
    <BottomNavigation
     value={value} 
     onChange={(event, newValue) => {
        setValue(newValue);
      }}
     showLabels
     className={classes.footer}
     >
     
      <BottomNavigationAction label="首頁" href="/home" icon={<HomeIcon />} />
      <BottomNavigationAction label="步道搜尋" href="/searchPage" icon={<SearchIcon />} />
      <BottomNavigationAction label="附近步道"  href="/nearbypathway"  icon={ <LocationSearchingIcon />} />
      <BottomNavigationAction label="我的收藏" href="/CollectPage"  icon={<FavoriteIcon  />} />
     </BottomNavigation>
    </div>
  </Fragment>
  );
}
export default Navigation;