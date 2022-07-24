import { primaryColor, whiteColor } from './material-kit-pro-react';

const transparentStyle = {
  root: {
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.12)',
    marginBottom: 60,
  },
  appbar: {
    height: '176px',
    backgroundSize: '100% auto',
    boxShadow: 'none',
  },
  appbarTransparent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    background: 'transparent',
    boxShadow: 'none',
  },
  content: {
    backgroundColor: whiteColor,
    padding: 8,
    maxWidth: '1440px',
    margin: 'auto',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'block'
  },
  infoContent: {
    padding: 8,
  },
  articleTitle: {
    padding: 8,
    fontWeight: '500',
    fontSize: '22px',
  },
  description: {
    padding: 8,
    fontSize: '14px',
  },
  chips: {
    margin: 8,
    marginRight: 0,
    padding: 6,
    fontSize: 14,
    fontWeight: 500
  },
  suggestTitle: {
    padding: '16px 8px',
    fontWeight: '500',
    fontSize: '18px',
  },
  hr: {
    margin: '16px 8px 8px',
    border: '1px solid rgba(0, 0, 0, 0.12)'
  },
  divider:{
    margin:8,
  },
  dividerSpacing: {
    height: 8,
    opacity: 0,
  },
  slider: {
    width: '100%',
    height: 176,
  },
  sliderImg: {
    objectFit: 'cover',
    width: '100%',
    height: 176,
  },
  section: {
    margin: '16px 0',
    backgroundColor: whiteColor,
  },
  locationOnIcon: {
    margin: 8,
    padding: 7,
    backgroundColor: 'rgba(0, 208, 76, 0.1)'
  },
  spacingOff: {
    margin: 0,
    padding: 0
  },
  textAlignRight: {
    textAlign: 'right'
  },
  defaultButton: {
    minWidth: 83,
    padding: 8,
    margin: 8,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'relative',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    padding: 8,
  },
  mapIcon: {
    padding: 16,
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(35, 35, 35, 0.7)',
    borderRadius: 32,
    height: 64,
    width: 64,
    color: whiteColor
  },
  map: {
    position: 'absolute',
    height: 224,
    width: '100%',
    padding: 8,
    objectFit: 'cover',
  },
  buttonBase: {
    padding: 8,
    height: 224,
    width: '100%',
    objectFit: 'cover',
    position: 'relative',
  },
  albumImage: {
    width: 96,
    height: 96,
    objectFit: 'cover',
    margin: 8,
  },
  ratingBox: {
    padding: 8,
  },
  bottomNavigation: {
    backgroundColor: whiteColor,
    height:64,
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    boxShadow: '0 -2px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  leftNavigation: {
    minWidth:120,
    width:'20vw',
    color: primaryColor[0],
    backgroundColor: whiteColor,
  },
  rightNavigation: {
    minWidth:291,
    width:'80vw',
    color: whiteColor,
    backgroundColor: primaryColor[0],
  },
};
export default transparentStyle;
