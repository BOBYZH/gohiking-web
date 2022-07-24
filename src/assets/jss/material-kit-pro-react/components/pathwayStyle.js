import { grayColor, primaryColor, title, whiteColor, } from 'assets/jss/material-kit-pro-react.js';

const mediaStyle = {
  container: {
    margin: 0,
    padding: 0,
  },
  button: {
    minHeight: 32,
    padding: 3,
    backgroundColor: primaryColor[3]
  },
  media: {
    margin: 16,
    display: 'flex',
    WebkitBoxAlign: 'start',
    alignItems: 'flex-start',
    '& p': {
      color: grayColor[0],
      fontSize: '1rem',
      lineHeight: '1.6em'
    },
    '& $media $mediaBody': {
      paddingRight: '0px'
    }
  },
  mediaLink: {
    width: '100%',
    float: 'left !important',
    textDecoration: 'none',
  },
  mediaAvatar: {
    position: 'relative',
    margin: '0 auto',
    '& img': {
      borderRadius: '4px',
      minWidth: '104px',
      width: '100%',
      height: '72px',
      objectFit: 'cover',
    }
  },
  mediaBody: {
    paddingLeft: 16,
    WebkitBoxFlex: '1',
    flex: '1'
  },
  mediaHeading: {
    ...title,
    margin: 0,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '& small': {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
  },
  mediaFooter: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: grayColor[0],
    '& button, & a': {
      marginBottom: '20px'
    },
    '&:after': {
      display: 'table',
      content: '" "',
      clear: 'both'
    }
  },
  limitText: {
    width: '38vw',
  },
  hr: {
    margin: 0,
    border:`solid 1px ${grayColor[8]}`,
  },
  widerHr: {
    marginTop: 8,
  },
  favorite: {
    color: whiteColor,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  sliderBox:{
    // marginR:16
  }
};

export default mediaStyle;
