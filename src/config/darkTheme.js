import { createMuiTheme } from '@material-ui/core/styles';
import { dangerColor, grayColor, primaryColor, whiteColor } from 'assets/jss/material-kit-pro-react';

const darkTheme = createMuiTheme({
  palette: {
    common: {
      black: grayColor[9],
      white: whiteColor,
    },
    background: {
      paper: whiteColor,
      'default': grayColor[8],
    },
    primary: {
      main: primaryColor[4],
    },
    secondary: {
      main: primaryColor[0],
      contrastText: whiteColor,
    },
    error: {
      light: dangerColor[0],
      main: dangerColor[1],
      dark: dangerColor[2],
      contrastText: whiteColor,
    },
  },
  typography: {
    body1: {
      fontFamily: 'NotoSansCJKtc, Noto Sans TC, sans-serif',
      fontWeight: 400,
      fontSize: 16,
    },
    fontFamily: [
      'NotoSansCJKtc',
      'Noto Sans TC',
      '-apple-system',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiBottomNavigationAction: {
      root: {
        '&$selected': {
          color: primaryColor[0],
        },
      },
      selected: {},
    },
  }
});

export default darkTheme;
