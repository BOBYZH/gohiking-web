import {grayColor, primaryColor} from 'assets/jss/material-kit-pro-react'
const announcementStyle={
    pathLink:{
        textDecoration:'none',
        color:grayColor[5],
    },
    squareMedia:{
        width:'100%',
        height:72,
        objectFit:'cover',
        borderRadius:4,
        minWidth:72
    },
    container:{
        margin:0,
        padding:0,
        
    },
    smRatingBox:{
      padding:8,
    },
    ratingLabel:{
        textAlign:'center',
        color:primaryColor[0],
        minWidth:'67px',
        minHeight:'24px',
        margin:8,
        padding:'3px 10px',
        borderRadius:'4px',
        border:`solid 1px ${primaryColor[0]}`,
        backgroundColor:primaryColor[3],
    },
   
}
export default announcementStyle;