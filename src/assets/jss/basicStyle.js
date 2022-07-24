import { grayColor, primaryColor, whiteColor } from './material-kit-pro-react';
const pageRootSetting = {
  margin: 'auto',
  maxWidth: '1440px',
  width: '100%',
  lineHeight: 1.5,
  letterSpacing: 0.5,
  // minHeight: '86vh',
  justifyContent: 'center',
  alignItems: 'center',
}

const basicStyle = {
  root: { width: '100%' },
  title: {
    padding: 0,
    fontSize: '18px',
    fontWeight: '500',
    flexGrow: 1,
  },
  opacityAppBar: {
    boxShadow: 'none',
    backgroundColor: primaryColor[5],
    color: grayColor[5],
    objectFit: 'cover',
    height: 176,
    position: 'relative',
  },
  appBar: {
    padding: 0,
    boxShadow: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  toolbar: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  homeSectionPaper: {
    margin: '16px 0',
    padding: 8,
    backgroundColor: whiteColor,
  },
  sectionPaper: {
    ...pageRootSetting,
    padding: 8,
    backgroundColor: whiteColor,
  },
  homePaper: {
    ...pageRootSetting,
    margin: '56px auto',
  },
  basicPaper: {
    ...pageRootSetting,
    padding: 8,
    margin: '56px auto 0',
    backgroundColor: whiteColor,
  },
  tabPaper: {
    ...pageRootSetting,
    backgroundColor: whiteColor,
    padding: 8,
    margin: '104px auto 56px',
    minHeight: '80vh',
  },
  banner: {
    objectFit: 'cover',
    width: '100%',
    overflow: 'hidden',
  },
  searchInput: {
    margin: 8,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#e5e5ea'
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  mapBox: {
    width: 379,
    margin: '123px auto',
    textAlign: 'center',
    fontSize: 16,
  },
  loginButton: {
    height: '48px',
    padding: 12,
    marginTop: 28,
    fontSize: '16px',
  },
  drawerPaper: {
    width: 364,
    paddingTop: 0,
  },
  drawerTitle: {
    width: '100%',
    backgroundColor: 'rgba(0, 208, 76, 0.05)',
    color: primaryColor[0],
    padding: '29px 16px 17px',
    fontSize: '18px',
    fontWeight: '500',
  },
  categoryButton: {
    width: 158,
  },
  icon: {
    fontSize: 14,
    color: grayColor[5],
    padding: 8,
    borderRadius: 3,
    width: 150,
    backgroundColor: 'rgba(35, 35, 35, 0.1)',
    'input:hover ~ &': {
      backgroundColor: 'rgba(35, 35, 35, 0.15)'
    },
    'input:disabled ~ &': {
      boxShadow: 'none'
    }
  },
  checkedIcon: {
    color: primaryColor[0],
    border: '1px solid #00d04c',
    backgroundColor: whiteColor,
    '&:before': {
      display: 'block',
      backgroundColor: 'gray'
    },
    'input:hover ~ &': {
      backgroundColor: 'rgba(0, 208, 76, 0.05)'
    }
  },
  filterSection: {
    fontSize: 16,
    margin: 0,
    width: '100%',
    padding: 16,
  },
  checkboxRoot: {
    margin: '16px 16px 0 0',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  showMore: {
    padding: 8,
    color: grayColor[0]
  },
  filterButtonSection: {
    boxShadow: '0 -2px 2px 0 rgba(0, 0, 0, 0.05)',
    width: 364,
    padding: 8,
    margin: 0,
    position: 'fixed',
    bottom: 0,
    right: 0,
    backgroundColor: whiteColor
  },
  ads: {
    width: '100%',
    maxHeight: 88,
    overflow: 'hidden',
    objectFit: 'cover',
    marginTop: 104,
    display: 'block'
  },
  appBarTransparent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    background: 'transparent',
    boxShadow: 'none',
  },
  collectionContent: {
    marginTop: 61,
    position: 'relative',
    padding: 8,
    height: 120,
    overflow: 'hidden'
  },
  collectionIcon: {
    position: 'absolute',
    right: 0,
    bottom: -40,
    width: 142,
    height: 142,
    overflow: 'hidden'
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
  divider: {
    margin: 8,
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
    height: 64,
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    boxShadow: '0 -2px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  rootRoot: {
    color: "#e57373",
    "&$selected": {
      color: "#007aff"
    }
  },
  leftNavigation: {
    minWidth: 120,
    width: '20vw',
    color: primaryColor[0],
    backgroundColor: whiteColor,
  },
  rightNavigation: {
    minWidth: 291,
    width: '80vw',
    color: whiteColor,
    fontSize:'80px',
    backgroundColor: primaryColor[0],
  },
  categoryContent: {
    maxWidth: '1440px',
    paddingTop: 192,
    padding: 8,
    margin: 'auto',
    width: '100%',
    lineHeight: 1.5,
    letterSpacing: 0.5
  },
  bannerContent: {
    position: 'absolute',
    color: grayColor[5],
    backgroundColor: primaryColor[5],
    height: '176px',
    width: '100%',
    overflow: 'hidden',
    paddingLeft: 16,
  },
  categoryTitle: {
    width: '100%',
    paddingTop: 2,
    fontWeight: '500',
    fontSize: '18px',
  },
  toolbarSubmit: {
    fontSize: 16,
    paddingRight: 0,
  },
  inputBox:{
    padding:8,
  },
  hikingInfoLeft:{
    margin: '16px 0 16px 16px',
  },
  hikingInfoRight:{
    textAlign: 'right',
    margin: '14px 16px 13px 0',
  },
};
export default basicStyle;
