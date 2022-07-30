import React from "react";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Link as RouterLink} from "react-router-dom";
import { useHistory } from "react-router-dom";
import bg from '../../asset/img/sample.jpg';
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import googleIcon from '.../../asset/img/google-icon.svg'

import firebase from 'firebase/app';
import "firebase/analytics";
import 'firebase/firestore';
import 'firebase/auth';

// import {useAuthState} from 'react-firebase-hooks/auth';
// import {useCollectionData} from 'react-firebase-hooks/firestore';

const { useState, useRef, useLayoutEffect } = React; //#####
<script src="https://www.gstatic.com/firebasejs/5.9.1/firebase-auth.js"></script>

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAZECXAG-TWAR9_AOlKExuq2tJ-8tWVfA4",
    authDomain: "go-hiking-test.firebaseapp.com",
    databaseURL: "https://go-hiking-test-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "go-hiking-test",
    storageBucket: "go-hiking-test.appspot.com",
    messagingSenderId: "1009464473437",
    appId: "1:1009464473437:web:b6283b9c93964195409ab4",
    measurementId: "G-DLB3B3L50D"
  });
}else {
  firebase.app(); // if already initialized, use that one
}

// const auth = firebase.auth();
// const firestore = firebase.firestore();

const useStyles = makeStyles((theme)=> ({
  container: {
    display:'flex',
    flexDirection: 'column',  // flexDirection:'column' 使button strech 開來
    // width:'411px',
    width: '100%',
    // height: '736px',
    height: '100%',
  },
  root:{
    maxheight: '600',
    width: '100%',
    margin: '0',
    padding: '0',
    overflowX: 'hidden',
    objectFit: 'cover',
  },
  google:{
    margin: 'auto', 
  },
  facebook:{
    // root:{
    //   backgroundColor: "#4267b2",
    // },
    display: 'flex',
    backgroundColor: "#4267b2",
    letterSpacing: 2,
    color: "#ffffff",
    width: '92%',
    height: '44px',
    marginBottom: '16px',
    margin: 'auto', 
    
  },
  newFacebook:{
    width: '92%',
    height: '44px',  
    borderRadius: '4px',
    background: '#4267b2',
    color: '#ffffff',
    border: '0px transparent',
    letterSpacing: 2,  
    marginBottom: '16px',
    margin: 'auto', 
    display: 'flex',
    fontSize: '13.5px',
    padding: '13px 0px 0px',
    justifyContent: 'center',
    shadowRadius: '15',
  }
}));

const ColorButton1 = withStyles(() => ({
  root: {
    display: 'flex',
    backgroundColor: "#ffffff",
    letterSpacing: 1.6,
    color: "#000000",
    width: '92%',
    height: '44px',
    marginBottom: '16px',
    margin: 'auto', 
    fontWeight: '500',  
  },
}))(Button);

const ColorButton2 = withStyles(() => ({
  root: {
    display: 'flex',
    backgroundColor: "#4267b2",
    letterSpacing: 2,
    color: "#ffffff",
    width: '92%',
    height: '44px',
    marginBottom: '16px',
    margin: 'auto',  
    
  },
}))(Button);

const ColorButton3 = withStyles(() => ({
  root: {
    display: 'flex',
    backgroundColor: "#000000",
    letterSpacing: 2,
    color: "#ffffff",    
    width: '92%',
    height: '44px',
    marginBottom: '16px',
    margin: 'auto',     
  },
}))(Button);

const ColorButton4 = withStyles(() => ({
  root: {
    display: 'flex',
    backgroundColor: "#ffffff",
    letterSpacing: 1.6,
    color: "#000000",
    width: '92%',
    height: '44px',
    margin: 'auto', 
    fontWeight: '500',  
  },
}))(Button);

const testTheme = createMuiTheme({
  palette: {
    primary:{
      main: '#b000ff',
      contrastText: '#ffffff',
    }
  }
});

const previous_pathname = localStorage.getItem('previous_pathname');

export default function ImgMediaCard() {
  const classes = useStyles();
  const [socialData, setSocialData] = useState({}); // #####
  let history = useHistory();
  function GoToLogin1_1() {
    history.push("/login1_1");
  }
// Google第三方登入
  const responseGoogle = async(response) => {
    console.log('response: ', response);
    var data = {
      'email': response.profileObj.email,
      'name': response.profileObj.name,
      'google_id': response.profileObj.googleId,
      'avatar': response.profileObj.imageUrl,
      'token': response.tokenId,
    }
    console.log('data: ', data);
    await axios.post('https://gohiking-server.herokuapp.com/api/auth/social/callback', data).then(function(response1){
      console.log('====second response==== ',response1);
      console.log('====second response token==== ', response1.data.token);
      localStorage.setItem('token', response1.data.token);
      localStorage.setItem('userId',response1.data.userId);
      const now = new Date()
      localStorage.setItem('expireTime', now.getTime() + response1.data.expireTime)
      if(previous_pathname == null) {
        history.push('/home');
      } else {
        history.push({ pathname: previous_pathname });
      }
    })
    .catch(function (error) {
      console.log('====error==== ', error);
      
    })
  };
// Google Firebase
const signInWithGoogle = () =>{
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    console.log('******resul******', result);
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    var data = {
      'email': result.additionalUserInfo.profile.email,
      'name': result.additionalUserInfo.profile.name,
      'google_id': result.additionalUserInfo.profile.id,
      'avatar': result.additionalUserInfo.profile.picture,
      'token': result.credential.idToken,
    }
    console.log('====data====',data);
    setSocialData(data);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}




// Facebook 第三方登入
  const responseFacebook = async(response) => {
    console.log('====response===== ',response)
    var data = {
      'email': response.email,
      'name': response.name,
      'facebook_id': response.id,
      'avatar': response.picture.data.url,
      'token': response.accessToken,
    }
    console.log('====data====',data);
    await axios.post('https://gohiking-server.herokuapp.com/api/auth/social/callback', data).then(function(response2){
      console.log('====second response==== ', response2);
      console.log('====second response token==== ', response2.data.token);
      localStorage.setItem('token', response2.data.token);
      localStorage.setItem('userId',response2.data.userId);
      const now = new Date()
      localStorage.setItem('expireTime', now.getTime() + response2.data.expireTime)
      if(previous_pathname == null) {
        history.push('/home');
      } else {
        history.push({ pathname: previous_pathname });
      }
    })
    .catch(function (error){
      console.log('====error==== ',error);
    })
  }

  const componentClicked =()=>console.log("clicked!")


// Facebook Firebase
const signInWithFacebook = () =>{
  const provider = new firebase.auth.FacebookAuthProvider();
  console.log('facebook firebase start');
  firebase.auth().useDeviceLanguage();
  firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    console.log('#######################');
    console.log('====result==== ',result);
    var data = {
      'email': result.additionalUserInfo.profile.email,
      'name': result.additionalUserInfo.profile.name,
      'facebook_id': result.additionalUserInfo.profile.id,
      'avatar': result.additionalUserInfo.profile.picture.data.url,
      'token': result.credential.accessToken,
    }
    console.log('====data====',data);
    setSocialData(data);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  console.log('facebook firebase end');
}

// Apple第三方登入

  const signInWithApple = () =>{
      var data_apple ={}; // #####
      const provider = new firebase.auth.OAuthProvider('apple.com');
      provider.addScope('email')
      provider.addScope('name')
      firebase.auth().useDeviceLanguage();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log('====result is like this==== ',result);
          /** @type {firebase.auth.OAuthCredential} */
          //準備data的name
          var s = result.user.providerData[0].email;
          var name ='';
          var counter = false;
          s.split("").forEach(character => {
            if(character === '@' || counter === true){
              counter = true;
            }else{
              name = name + character;
            }
            })
          // 準備data
          var data = {
            'email':result.user.providerData[0].email,
            'name': name,
            'apple_id': result.user.uid,
            'avatar': 'https://imgur.com/gallery/TX5W1uj',
            'token': result.credential.idToken,
          }
          console.log('====data====',data);
          setSocialData(data);
        })
        .catch((error) => {
          // Handle Errors here.
          console.log('error message:  ', error.message);
        });
        // var headers = {"Access-Control-Allow-Origin": "https://gohiking-server.herokuapp.com:443"} //#####
    }

    const signInWithSocialChangePage = async() =>{ //#####
      console.log('========final data_apple===========', socialData);
      await axios.post('https://gohiking-server.herokuapp.com/api/auth/social/callback', socialData).then(function(response3){
          console.log("====post success====",response3);
          console.log('====second response token====', response3.data.token);
          localStorage.setItem('token', response3.data.token);
          localStorage.setItem('userId',response3.data.userId);
          const now = new Date()
          localStorage.setItem('expireTime', now.getTime() + response3.data.expireTime)
          if(previous_pathname == null) {
            history.push('/home');
          } else {
            history.push({ pathname: previous_pathname });
          }
        })
        .catch(function (error){
          console.log('error: ', error);
        })
    }

    const firstUpdate = useRef(true); //#####
    useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      signInWithSocialChangePage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[socialData]);

  return (   
         
      <div className= {classes.container} style={{objectFit: "cover"}}>
        <div style={{
          width: '100vw',
          height: 381,
          overflow: 'hidden',
        }}>
          <img src={bg} alt={'bg'} style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }} />
        </div>
        <div style={{margin: "16.5px 16px 0px",}}>
          {/* <GoogleLogin
            clientId="184500302467-kn257cjsh71fconchpf7dmd52qmdvkkg.apps.googleusercontent.com"
            render={renderProps => (
              <ColorButton1 className = {classes.google} onClick={renderProps.onClick} disabled={renderProps.disabled} variant = "contained" startIcon={<img src = {googleIcon} alt = 'google_icon' style={{height: '18px', weight: '18px'}}/>}>透過Google登入</ColorButton1>
            )}
            buttonText="使用 Google 登入"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}
          <ColorButton1 variant = "contained" onClick = {signInWithGoogle} startIcon={<img src = {googleIcon} alt = 'google_icon' style={{height: '18px', weight: '18px'}}/>} disabled={(window.location.host !== "localhost:3000")? true : false}>
            透過Google登入(限開發環境)
          </ColorButton1>
          {/* <FacebookLogin
            appId="1311202525878900"
            autoLoad={false}
            onClick={componentClicked}
            callback={responseFacebook}
            fields="name,email,picture"
            cssClass = {classes.newFacebook}
            textButton= "透過FACEBOOK登入"
            icon = {<FacebookIcon style={{color: "#ffffff", marginRight: "5px",fontSize : "24px", paddingBottom: "4px"}}/>}
            />           */}
          <ColorButton2 variant = "contained" onClick = {signInWithFacebook} startIcon={<FacebookIcon style={{color: "#ffffff"}}/>} disabled={(window.location.host !== "localhost:3000")? true : false}>
            透過FACEBOOK登入(限開發環境)
          </ColorButton2>  
          <ColorButton3 variant = "contained" onClick = {signInWithApple} startIcon={<AppleIcon style={{color: "#ffffff"}}/>} disabled={(window.location.host !== "localhost:3000")? true : false}>
            透過Apple ID登入(限開發環境)
          </ColorButton3>
          <ColorButton4 variant = "contained" onClick = {GoToLogin1_1} startIcon={<MailOutlineIcon style={{color: "#000000"}}/>}>
            透過Mail登入
          </ColorButton4>
        </div>
          <ThemeProvider theme = {testTheme}>
            <div style={{margin: "24px 0px 0px 0px"}}></div>
          </ThemeProvider>
          <Typography variant="body2" component="p" style={{color: "black", direction: "column", textAlign: "center"}}>
            還不是會員嗎? <RouterLink to="/signup" style={{color: '#000000'}}>註冊新帳號</RouterLink>
          </Typography>
          <Button variant = "outlined" component={RouterLink} to="/home" style={{color: "#00d04c", fontWeight:"700" , borderColor: "#00d04c", width:"182px", height: "40px", margin: "auto",marginTop: '16px' }}>
            直接使用
          </Button>
          
      </div>
  );
}