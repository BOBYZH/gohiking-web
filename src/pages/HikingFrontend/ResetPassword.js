import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input'
import { useForm } from 'react-hook-form';
import {useHistory} from "react-router";

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
    height: '768px',
    padding: '125px 16px 213px',
    backgroundColor: '#ffffff'
  },
  InputBackground:{
    width: '-webkit-fill-available',
    height: '40px',
    margin: '1px 0 0',
    padding: '9px 0 0',
    borderColor:'#232323',
  },
  Title:{
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
  Hint:{
    width: '180px',
    height: '21px',
    margin: '16px 211px 55px 0',
    fontFamily: "NotoSansCJKtc",
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#979797',
  },
  ModifyTextFieldColor: {
    fontSize: '14px',
    color: '#979797',  
    borderColor:'#979797'
  },
  DailogTitle:{
    fontFamily: "NotoSansCJKtc",
    fontSize: '20px',
    fontWeight:500,
    borderColor:'#232323'
  },
  DailogContent:{
    fontFamily: "NotoSansCJKtc",
    fontSize: '16px',
    borderColor:'#979797'
  },
  DailogCheck:{
    fontFamily: "NotoSansCJKtc",
    fontSize: '14px',
    fontWeight:500,
    borderColor:'#007aff'
  },
  ErrorInfo:{
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
}));

export default function SignIn() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [maxWidth] = React.useState('xs');
  const { register, handleSubmit, errors, watch } = useForm()
  const password = useRef({});
  const history = useHistory();
  password.current = watch("password", "");
  // const [comfirm, setComfirm] = React.useState('');
  const axios = require('axios');
  let responsedJSON;

  //Open Dailog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/signin');

    // backhandleClick()
  };
  //get token from verify
  const token = localStorage.getItem('token')
  console.log(token.substring(10, token.length - 2))
  // console.log('token: ' + localStorage.getItem('token'));
  const headers = {
    'Authorization': 'Bearer '+token.substring(10, token.length - 2)
  }
  console.log(headers);
  // API POST
  const onSubmit = async (data) => {
    console.log(data);
    await axios.post('https://gohiking-server.herokuapp.com/api/password/change', data ,{ headers })
    .then(function (response) {
      console.log('correct');
      //const { token } = response.data;
      responsedJSON = response.data
      handleClickOpen(true);
      //localStorage.setItem('token', token)
    })
    .catch(function (error) {
      console.log('error');
      responsedJSON = error.response.data;
    })
    .finally(function () {
      console.log(responsedJSON);
    });  
  }

  return (
      <div className={classes.container}>
        <Typography className={classes.Title} textalign="left">
          重設密碼
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
        <Typography className={classes.Text}  textalign="left">
          密碼 
        </Typography>   
          <Input
            // onChange={event => setPassword(event.target.value)}
            inputRef={register({ required: true, minLength: 8 })}
            className={classes.InputBackground}
            id="password"
            label="請輸入新的密碼"
            name="password"
            type="password"
          />
        <Typography className={classes.ErrorInfo} >
          {errors.password && "密碼必須包含8個字元以上"}
        </Typography> 
        <Typography className={classes.Text}  textalign="left">
          確認密碼
        </Typography>  
          <Input
            // onChange={event => setComfirm(event.target.value)}
            className={classes.InputBackground}
            id="confirm"
            label="請重新輸入密碼 "
            name="confirm"
            type="password"
            inputRef={register({ 
              validate: value =>
              value === password.current || "密碼不一致！" 
              })}
          />
        <Typography className={classes.ErrorInfo}>
          {errors.confirm && <p>{errors.confirm.message}</p>}
        </Typography> 
        <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            // onClick={handleClickOpen }
          >
          繼續
        </Button>
        <Dialog
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>
          <Typography component={'span'} className={classes.DailogTitle}>密碼更新成功</Typography>
          </DialogTitle>
          <DialogContent >
            <DialogContentText>
              <Typography component={'span'} className={classes.DailogContent}>請重新以新的密碼登入使用。</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary"  >
            <Typography component={'span'} className={classes.DailogCheck}>完成</Typography>
            </Button>
          </DialogActions>
      </Dialog>
      </form>
    </div>
  );
}