import {
  primaryColor,
  grayColor,
  container,
  cardTitle,
  whiteColor,
  blackColor,
  hexToRgb, infoColor
} from 'assets/jss/material-kit-pro-react.js';

import customCheckboxRadioSwitchStyle
  from 'assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js';

const signupPageStyle = {
  container: {
    ...container,
    zIndex: '2',
    position: 'relative',
    paddingTop: '95px',
    color: grayColor[5]
  },
  pageHeader: {
    minHeight: '100vh',
    height: 'auto',
    display: 'inherit',
    position: 'relative',
    margin: '0',
    padding: '0',
    border: '0',
    alignItems: 'center',
    '&:before': {
      background: 'rgba(' + hexToRgb(blackColor) + ', 0.5)'
    },
    '&:after': {
      background:
        'linear-gradient(60deg,rgba(' +
        hexToRgb(primaryColor[4]) +
        ',.56),rgba(' +
        hexToRgb(primaryColor[5]) +
        ',.95))'
    },
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: '""'
    }
  },
  cardSignup: {
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(' +
      hexToRgb(blackColor) +
      ', 0.14), 0 6px 30px 5px rgba(' +
      hexToRgb(blackColor) +
      ', 0.12), 0 8px 10px -5px rgba(' +
      hexToRgb(blackColor) +
      ', 0.2);',
    marginBottom: '100px',
    padding: '40px 0px'
  },
  cardTitle: {
    ...cardTitle,
    textDecoration: 'none',
    marginBottom: '0.75rem'
  },
  ...customCheckboxRadioSwitchStyle,
  socials: {
    marginTop: '0',
    position: 'absolute',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px'
  },
  textCenter: {
    textAlign: 'center'
  },
  textRight: {
    textAlign: 'right'
  },
  inputAdornment: {
    marginRight: '18px',
    position: 'relative'
  },
  inputAdornmentIcon: {
    color: grayColor[13]
  },
  form: {
    padding: '0',
    margin: '0'
  },
  infoArea: {
    padding: '0px 0px 20px !important'
  },
  block: {
    color: 'inherit',
    padding: '0.9375rem',
    fontWeight: '500',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    textDecoration: 'none',
    position: 'relative',
    display: 'block'
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0px',
    width: 'auto'
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0'
  },
  left: {
    float: 'left!important',
    display: 'block',
    '&,& *,& *:hover,& *:focus': {
      color: whiteColor + '  !important'
    }
  },
  right: {
    padding: '15px 0',
    margin: '0',
    float: 'right',
    '&,& *,& *:hover,& *:focus': {
      color: whiteColor + '  !important'
    }
  },
  icon: {
    width: '18px',
    height: '18px',
    top: '3px',
    position: 'relative'
  },
  submitButton: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '24px 0 0 0',
    padding: '11px'
  },
  link: {
    color: infoColor[0]
  },
  terms: {
    fontSize: '14px',
    margin: '16px 0',
    textAlign: 'left'
  },
  labelText: {
    fontWeight: '600',
    marginTop: '32px'
  },
  gridContainer: {
    margin: '0',
    padding: '0'
  },
  forgetPassword: {
    margin: '16px  0 32px 0',
    fontSize: '14px',
  },
  errorMsg: {
    margin: '16px  0 32px 0',
    fontSize: '12px',
  },
  partitioned: {
    margin: '32px',
    letterSpacing: '33px'
  },
  hint: {
    color: '#007aff'
  }
};

export default signupPageStyle;
