import { Divider } from '@material-ui/core';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = {
    gridcontain: {
        width: "100%",
    },
    gridItem: {
        position: "relative",
        width: "auto",
        height: "auto",
        /* flexBasis: "auto" */
        margin: "16px 0 10px 0"
    },
    titleText:{
        fontSize:"16px",
        color:"#232323",
        margin: "0 0 0 6px"
    },
    mutedText:{
        color:"#979797",
        margin: "0 0 0 7px"
    },
    img: {
        width:'100%',
        height:72,
        objectFit:'cover',
        borderRadius:4,
        minWidth:72,
    },
    buttonBase:{
        margin: "0 0 0 16px",
    }
};

const useStyles = makeStyles(styles);

//指定title字數多的變"..."避免擋到顯示距離的button
function renderContentLimit(p){
  const len = 17; // 超過9個字以"..."取代
  //console.log(p.length);
  if(p.length>len){
      const final=p.substring(0,len-1)+"...";
      return final
  }
  else{
      return p
  }
}

export default function AnnouncementCard(props) {
  const {
    pathLink,
    coverImage,
    coverImageAlt,
    title,
    date,
    source,
    ...rest
  } = props;
  const classes = useStyles();

  return (
    <Link href={pathLink} underline="none">
      <Grid container {...rest} className={classes.gridcontain} spacing={2}
      justify='center'
      alignItems='center'
      >
        <Grid item className={classes.gridItem} xs={3} >
          <ButtonBase className={classes.buttonBase}>
          <img alt={''} src={coverImage} className={classes.img}/>
          </ButtonBase>
        </Grid>
        <Grid item  xs={9} >
            <Typography className={classes.titleText}>{title}</Typography>
            <small className={classes.mutedText}> {date} | {renderContentLimit(source)} </small>
        </Grid>
        <Grid item  xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </Link>

  );
}

AnnouncementCard.defaultProps = {
  coverImageAlt: 'cover image'
};

AnnouncementCard.propTypes = {
  pathLink: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  coverImageAlt: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.node.isRequired,
  source: PropTypes.string.isRequired,
};
