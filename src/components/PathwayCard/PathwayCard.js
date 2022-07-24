import { Checkbox } from '@material-ui/core';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { whiteColor } from 'assets/jss/material-kit-pro-react';
// @material-ui/icons
// core components
import styles from 'assets/jss/material-kit-pro-react/components/pathwayStyle.js';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import React from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';

const useStyles = makeStyles(styles);

export default function PathwayCard(props) {
  const {
    pathLink,
    avatar,
    avatarAlt,
    title,
    location,
    miles,
    favorite,
    ...rest
  } = props;
  const classes = useStyles();
  const [checked, setChecked] = React.useState(favorite);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <GridContainer {...rest}
      className={classes.container} spacing={2} direction="row"
      justify="center"
      alignItems="center">
      <GridItem xs={4}>
        <div className={classes.mediaAvatar}>
          <img src={avatar} alt={avatarAlt} />
          <Checkbox
            checked={checked}
            onChange={handleChange}
            icon={<FavoriteBorder fontSize={'small'} />}
            checkedIcon={<Favorite fontSize={'small'} style={{ color: whiteColor }} />}
            className={classes.favorite}
            name="favorite"
            data-testid='favorite'
          />
        </div>
      </GridItem>
      <GridItem xs={8}>
        <a href={pathLink} className={classes.mediaLink}>
          {title !== undefined ? (
            <h3 className={classes.mediaHeading}>{title}</h3>
          ) : null}
          <div className={classes.mediaFooter}>{location}<br /><small>全程約 {miles} km</small></div>
          <hr className={`${classes.hr} ${classes.widerHr}`} />
        </a>
      </GridItem>
    </GridContainer>
  );
}

PathwayCard.defaultProps = {
  avatarAlt: '...'
};

PathwayCard.propTypes = {
  pathLink: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  avatarAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  miles: PropTypes.number.isRequired,
  favorite: PropTypes.bool.isRequired,
};
