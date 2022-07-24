import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import FavoriteIcon from '@material-ui/icons/Favorite';
import darkTheme from '../../config/darkTheme';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    fontSize: 12,
    boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.1)'
  },
});

export default function SimpleBottomNavigation(props) {
  const {
    location,
    ...rest
  } = props;
  const classes = useStyles();
  const intl = useIntl();
  const [value, setValue] = React.useState(location);
  return (
    <ThemeProvider theme={darkTheme}>
      <BottomNavigation
        {...rest}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.root}
      >
        <BottomNavigationAction label={intl.formatMessage({ id: 'home' })} icon={<HomeIcon fontSize={'small'} />}
          component={Link}
          to="/home"
          value="home"
        />
        <BottomNavigationAction label={intl.formatMessage({ id: 'search_title' })} icon={<SearchIcon fontSize={'small'} />}
          component={Link}
          to="/search"
          value="search"
        />
        <BottomNavigationAction label={intl.formatMessage({ id: 'nearby_pathway' })} icon={<LocationSearchingIcon fontSize={'small'} />}
          component={Link}
          to="/nearby_pathway"
          value="nearby_pathway"
        />
        <BottomNavigationAction label={intl.formatMessage({ id: 'favorite' })} icon={<FavoriteIcon fontSize={'small'} />}
          component={Link}
          to="/favorite"
          value="favorite"
        />
      </BottomNavigation>
    </ThemeProvider>
  );
}
