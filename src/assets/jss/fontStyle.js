import { defaultFont, grayColor } from './material-kit-pro-react';
const defaultTitle={
  fontWeight: '500',
  padding:8,
};
const defaultDesc={
  padding:8,
  lineHeight: 1.5,
  letterSpacing: 0.5
}
const fontStyle = {
  titleXLL: {
    ...defaultFont,
    ...defaultTitle,
    fontSize: 22
  },
  titleXl: {
    ...defaultFont,
    ...defaultTitle,
    fontSize: 20
  },
  titleText: {
    ...defaultFont,
    ...defaultTitle,
    fontSize: 18
  },
  appbarTitle:{
    flexGrow: 1
  },
  mainText: {
    ...defaultFont,
    ...defaultDesc,
    fontSize: 16
  },
  mainTextWeight: {
    ...defaultFont,
    ...defaultDesc,
    fontSize: 16,
    fontWeight: 500,
  },
  descText: {
    ...defaultFont,
    ...defaultDesc,
    fontSize: 14
  },
  infoText: {
    ...defaultFont,
    ...defaultDesc,
    fontSize: 12
  },
  labelText: {
    ...defaultFont,
    ...defaultDesc,
    fontSize: 10
  },
  widerPadding:{
    paddingTop:16,
    paddingBottom:16
  },
  inlineContent:{
    display:'inline-block',
    verticalAlign:'top'
  },
  weightFont:{
    fontWeight:500
  },
  boldFont:{
    fontWeight:'bold'
  },
  commentText:{
    textOverflow:'ellipsis',
    maxHeight:74,
    overflow: 'hidden',
    display:'-webkit-box',
    WebkitLineClamp:3,
    WebkitBoxOrient:'vertical'
  },
  mutedText:{
    color:grayColor[6],
  },
  defaultMargin:{
    margin:8,
  },
  noWrap:{
    margin:0,
    padding:0,
  }
};
export default fontStyle;
