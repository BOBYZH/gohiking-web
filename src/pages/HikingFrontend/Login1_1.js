import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    width: '-webkit-fill-available',
    height: '48px',
    fontSize: '16px',
    margin: '56px 0 0',
    backgroundColor: '#00d04c',
    color: '#ffffff',
    borderRadius: 4
  },
  container: {
    width: '-webkit-fill-available',
    height: '768px',
    padding: '40px 16px 213px',
    backgroundColor: '#ffffff'
    
    //backgroundColor:'#66CBBA'
  },
  MaterialIconsBlackArrowback :{
    width: '24',
    height: '24',
    color: '#00d04c',
    margin: '0 297px 61px 0'
  },
  InputBackground:{
    width: '-webkit-fill-available',
    height: '40',
    margin: '1px 0 0',
    padding: '9px 0 0',
    borderColor:'#232323',
  },
  Title:{
    width: '98',
    height: '36',
    margin: '0 281px 31px 0',
    fontFamily: "NotoSansCJKtc",
    fontSize: '24px',
    fontweight: 500,
    lineheight: 1.5,
    letterspacing: '0.5px',
    color: '#232323'
  },
  Text:{
    width: '66px',
    height:'24px',
    margin: '0 313px 1px 0',
    fontSize: '16px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#232323',
  },
  ErrorInfo:{
    width: '100%',
    height: '21px',
    margin: '16px 0 32px 0',
    fontFamily: "NotoSansCJKtc",
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#ff3b30',
  },
  ForgotInfo:{
    width: '100px',
    height: '21px',
    fontFamily: "NotoSansCJKtc",
    margin: '-30px 0 56px 263px',
    fontSize: '14px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#232323',
  },
  ModifyTextFieldColor: {
    // Theme Color, or use css color in quote
    fontSize: '14px',
    color: '#979797',  
    borderColor:'#979797'
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm()
  const axios = require('axios');
  const [serverState, setServerState] = React.useState();
  const handleServerResponse = (login, msg) => {
    setServerState({
      login,
      msg
    });
  };
  //JSON
  let responsedJSON;
  //Go to ? Page
  let goNext = useHistory();
  let goHome = useHistory();
  let back = useHistory();
  let history = useHistory();
  function GoToLogin1_2() {
    goNext.push("/login1_2");
  }
  function GoHome() {
    goHome.push("/home");
  }
  function backhandleClick() {
    back.push("/signin");
  }

  const previous_pathname = localStorage.getItem('previous_pathname');

  // API POST
  const onSubmit = async (data) => {
    console.log(data);
    await axios.post('https://gohiking-server.herokuapp.com/api/login', data)
    .then(function (response) {
      console.log('correct');

      responsedJSON = response.data;
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.userId)
      const now = new Date()
      localStorage.setItem('expireTime', now.getTime() + response.data.expireTime)
      if(previous_pathname == null) {
        GoHome()
      } else {
        history.push({ pathname: previous_pathname });
      }
    })
    .catch(function (error) {
      console.log('error');
      responsedJSON = error.response.data;
      handleServerResponse(false, responsedJSON.error)
    })
    .finally(function () {
      console.log(responsedJSON);
    });  
  }

  return (
      <div className={classes.container}>
        <ArrowBackIcon className={classes.MaterialIconsBlackArrowback} onClick={backhandleClick} ></ArrowBackIcon>
        <Typography className={classes.Title} textalign="left">
          登入
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
        <Typography className={classes.Text}  textalign="left">
          電子信箱 
        </Typography>   
        <TextField
          inputRef={register({ required: true })}
          className={classes.InputBackground}
          id="email"
          placeholder="請輸入你的電子信箱"
          name="email"
        />
        <Typography className={classes.ErrorInfo}  textalign="left">
          {errors.email && "請輸入正確Email"}
        </Typography>  
        <Typography className={classes.Text}  textalign="left">
          密碼
        </Typography>  
        <TextField
          inputRef={register({ required: true, minLength: 8 })}
          className={classes.InputBackground}
          id="password"
          placeholder="請輸入你的密碼"
          name="password"
          type="password"
        />
        <Typography className={classes.ErrorInfo} >
          {errors.password && "密碼必須包含8個字元以上"}
          {serverState && (
          <Typography className={classes.ErrorInfo}>{serverState.msg}</Typography>
          )}
        </Typography>  
        <Grid container justify="flex-end">
            <Link  onClick={GoToLogin1_2}>
              <Typography  className={classes.ForgotInfo} >忘記密碼?</Typography>
            </Link>
        </Grid>
        <Button
            type="submit"
            variant="contained"
            className={classes.submit}
          >
            登入
        </Button>
      </form>
    </div>
  );
}