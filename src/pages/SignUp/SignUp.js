import Button from '@material-ui/core/Button'
import React, { useRef } from 'react'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  arrow: {
    margin: '40px 371px 0px 16px',
    color: '#00d04c',
  },
  title: {
    width: '98px',
    height: '36px',
    margin: '61px 297px 31px 16px',
    fontFamily: 'NotoSansCJKtc',
    fontSize: '24px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#232323',
  },
  form: {
    margin: '0 16px 48px 16px',
  },
  label: {
    width: '66px',
    height: '24px',
    margin: '0px 0px 31px 0px',
    fontFamily: 'NotoSansCJKtc',
    fontSize: '16px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#232323',
  },
  errorInfo: {
    width: '100%',
    height: '0px',
    margin: '16px 321px 55px 0px',
    fontFamily: 'NotoSansCJKtc',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#ff3b30',
  },
  passwordInfo: {
    width: '169px',
    height: '24px',
    margin: '16px 211px 55px 0px',
    fontFamily: 'NotoSansCJKtc',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#979797',
  },
  privacyInfo: {
    width: '-webkit-fill-available',
    height: '45px',
    margin: '75px 0px 0px',
    fontFamily: 'NotoSansCJKtc',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#232323',
  },
  submit: {
    width: '-webkit-fill-available',
    height: '48px',
    margin: '40px 0px 0px 0px',
    backgroundColor: '#00d04c',
    color: '#ffffff',
  },
})

const SignUp = () => {
  const classes = useStyles()
  const history = useHistory()
  const { register, handleSubmit, errors, watch } = useForm()
  const password = useRef({});
  password.current = watch("password", "");
  const axios = require('axios');
  const [serverState, setServerState] = React.useState();
  const handleServerResponse = (signup, msg) => {
    setServerState({
      signup,
      msg
    });
  };
  let responsedJSON;

  // API POST
  const onSubmit = async (data) => {
    console.log(data);
    await axios.post('https://gohiking-server.herokuapp.com/api/register', data)
    .then(function (response) {
      const now = new Date()
      console.log('correct');
      responsedJSON = response.data
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('expireTime', now.getTime() + response.data.expireTime)
      history.push("/register0_1");
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
 
  function backhandleClick() {
    history.push("/signin");
  }

  return (
    <div className={classes.container}>
      <ArrowBackIcon className={classes.arrow} onClick={backhandleClick} />
      <div className={classes.title}>註冊帳號</div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
        <label className={classes.label}>電子信箱</label>
        <Input name="email" placeholder="請輸入電子信箱" fullWidth inputRef={register({ required: true })} />
        <div className={classes.errorInfo}>{errors.email && "請輸入正確Email"}</div>
        <label className={classes.label}>密碼</label><br />
        <Input name="password" type="password" placeholder="請輸入密碼" fullWidth inputRef={
                                                                        register({ 
                                                                          required: true,
                                                                          minLength: 8
                                                                        })} />                                                             
        <div className={classes.errorInfo}>{errors.password && "密碼必須包含8個字元以上"}</div>
        <label className={classes.label}>確認密碼</label><br />
        <Input placeholder="請重新輸入密碼" name="password_repeat" type="password" fullWidth inputRef={register({ 
                                                                validate: value =>
                                                                value === password.current || "密碼不一致！" 
                                                                })} />
        <div className={classes.errorInfo}>
          {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
          {serverState && (
          <div className={classes.errorInfo}>{serverState.msg}</div>
          )}
        </div>
        <div className={classes.privacyInfo}>使用這個應用程式前，請先詳閱「Go Hiking」的
        《<Link to="/privacyPolicy" style={{ color: '#007aff' }}>隱私權政策</Link>》及《<Link to="/aboutUs" style={{ color: '#007aff' }}>服務條款</Link>》
        </div>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          同意並註冊
        </Button>
      </form>
    </div>
  )
}

export default SignUp
