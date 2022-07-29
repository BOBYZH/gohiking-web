import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";
import Input from '@material-ui/core/Input';
//localhost記得改成127.0.0.1才會出現驗證
const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    width: '-webkit-fill-available',
    height: '48px',
    margin: '56px 0 0',
    backgroundColor: '#00d04c',
    color: '#ffffff',
    borderRadius: 4
  },
  container: {
    width: '-webkit-fill-available',
    height: 768,
    padding: '40px 16px 213px',
    backgroundColor: '#ffffff'

    //backgroundColor:'#66CBBA'
  },
  MaterialIconsBlackArrowback: {
    width: '24px',
    height: '24px',
    color: '#00d04c',
    margin: '0 297px 61px 0'
  },
  InputBackground: {
    width: '-webkit-fill-available',
    height: '40px',
    margin: '1px 0 0',
    padding: '9px 0 0',
    borderColor: '#232323',
  },
  Title: {
    width: '98px',
    height: '36px',
    margin: '0 281px 31px 0',
    fontFamily: "NotoSansCJKtc",
    fontSize: '24px',
    fontweight: 500,
    lineheight: 1.5,
    letterspacing: '0.5px',
    color: '#232323'
  },
  Text: {
    width: '66px',
    height: '24px',
    margin: '0 313px 1px 0',
    fontSize: '16px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#232323',
  },
  ErrorInfo: {
    width: '100%',
    height: '21px',
    margin: '16px 263px 56px 0',
    fontFamily: "NotoSansCJKtc",
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#ff3b30',
  },
  ForgotInfo: {
    width: '58px',
    height: '21px',
    fontFamily: "NotoSansCJKtc",
    margin: '-75px 0 56px 263px',
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
    borderColor: '#979797'
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm()
  const [errormassage, setErrormassage] = React.useState(false);
  const [captchavalidate, setCaptchavalidate] = React.useState(false);
  const axios = require('axios');
  let responsedJSON;
  let back = useHistory();
  let GoNext = useHistory();
  function ResetPassword() {
    GoNext.push("/Verify2");
  }
  function onChange(value) {
    console.log("Captcha value:", value);
    setCaptchavalidate(true);
    setErrormassage(false);
  }
  function backhandleClick() {
    back.push("/login1_1");
  }
  console.log(errormassage);
  // API POST
  const onSubmit = async (data) => {
    console.log(data);
    if (captchavalidate) {
      await axios.post('https://gohiking-server.herokuapp.com/api/password/forget', data)
        .then(function (response) {
          console.log('correct');
          const { token } = response.data;
          responsedJSON = response.data
          localStorage.setItem('token', token)
          localStorage.setItem('email', email)

          ResetPassword()
        })
        .catch(function (error) {
          console.log('error');
          responsedJSON = error.response.data;
        })
        .finally(function () {
          console.log(responsedJSON);
        });
    }
    else {
      setErrormassage(true);
    }
  }
  function handleErrorMessage() {
    if (captchavalidate) {
      setErrormassage(false);
    }
    else {
      setErrormassage(true);
    }
  }
  const [email, setEmail] = useState(-1);
  const handleChange = (event) => {
    setEmail(event.target.value);
  }

  return (
    <div className={classes.container}>
      <ArrowBackIcon className={classes.MaterialIconsBlackArrowback} onClick={backhandleClick} ></ArrowBackIcon>
      <Typography className={classes.Title} textalign="left">
        忘記密碼
        </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography className={classes.Text} textalign="left">
          電子信箱
        </Typography>
        <Input
          onChange={event => handleChange(event)}
          inputRef={register({ required: true, minLength: 8 })}
          className={classes.InputBackground}
          id="email"
          label="請輸入你的電子信箱"
          name="email"
        />
        <Typography className={classes.ErrorInfo} >
          {errors.email && "請輸入電子信箱"}
        </Typography>
        <ReCAPTCHA
          sitekey="6LeXWS8hAAAAAJY-E3bjYowKoBR-E2Xn-b2M0sch"
          onChange={onChange}
        />
        {errormassage ?
          <>
            <Typography className={classes.ErrorInfo} >
              {"請輸入電子信箱"}
            </Typography>
          </>
          :
          <div></div>
        }
        <Button
          onClick={handleErrorMessage}
          type="submit"
          variant="contained"
          className={classes.submit}
        >
          繼續
        </Button>
      </form>
    </div>
  );
}