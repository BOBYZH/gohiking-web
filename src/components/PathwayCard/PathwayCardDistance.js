import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
// import styles from 'assets/jss/material-kit-pro-react/components/pathwayStyle.js';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Checkbox, Divider } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import styles from '../../assets/jss/material-kit-pro-react/components/pathwayStyle';
import { whiteColor } from 'assets/jss/material-kit-pro-react';

const useStyles = makeStyles(styles);

export default function PathwayCardDistance(props) {
  const {
    pathLink,
    avatar,
    avatarAlt,
    title,
    location,
    miles,
    innerMedias,
    distance,
    favorite,
    trail_id,
    ...rest
  } = props;
  const classes = useStyles();
  const [checked, setChecked] = React.useState(favorite);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <GridContainer {...rest} className={classes.container} spacing={2} direction='row'
      justify='center'
      alignItems='center'>
      <GridItem xs={4}>
        <div className={classes.mediaAvatar}>
          <img src={avatar} alt={avatarAlt} />
          <Checkbox
            data-testid='checkFavorite'
            checked={checked}
            onChange={handleChange}
            icon={<FavoriteBorder fontSize={'small'} />}
            checkedIcon={<Favorite fontSize={'small'} style={{ color: whiteColor }} />}
            className={classes.favorite}
            name='favorite' />
        </div>
      </GridItem>
      <GridItem xs={5}>
        <a href={pathLink} className={classes.mediaLink}>
          {title !== undefined ? (
            <h3 className={`${classes.mediaHeading} ${classes.limitText}`}>{title}</h3>
          ) : null}
          <div className={`${classes.mediaFooter} ${classes.limitText}`}>{location}<br /><small>全程約 {miles} km</small></div>
          {innerMedias !== undefined
            ? innerMedias.map(prop => {
              return prop;
            })
            : null}
        </a>
      </GridItem>
      <GridItem xs={3}>
        <Button
          fullWidth
          size='small'
          variant='outlined'
          color='secondary'
          className={classes.button}
          startIcon={<LocationOnIcon />}
        >
          {miles} km
        </Button>
      </GridItem>
      <GridItem xs={12}>
        <Divider />
      </GridItem>
    </GridContainer>
  );
}

PathwayCardDistance.defaultProps = {
  pathLink: '#pablo',
  avatarAlt: '...'
};

PathwayCardDistance.propTypes = {
  pathLink: PropTypes.string,
  avatar: PropTypes.string,
  avatarAlt: PropTypes.string,
  title: PropTypes.node,
  location: PropTypes.node,
  miles: PropTypes.node,
  innerMedias: PropTypes.arrayOf(PropTypes.object)
};
