import React, {useState, useRef, useLayoutEffect} from 'react';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';


import PropTypes from 'prop-types';
import axios from 'axios';

const useStyles = makeStyles((theme)=>({
    container: {
        display:'flex',
        flexDirection: 'column',  // flexDirection:'column' 使button strech 開來
        height: '768px',
        // width: '411px',
        width: '100%'
      },
      root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0 73px 0 74px',
        // flexWrap: 'wrap',
      },
      textField:{
          width: '54px',
          height: '40px',
          margin: '48px 0 0',
          padding: '9px 0 0',
      },
}))
const bottomBoard = createMuiTheme({
  palette: {
    primary: {
      light: '#00d04c',
      main: '#00d04c',
      dark: '#00d04c',
      contrastText: '#00d04c',
    },
  },
});

const api = axios.create({
  baseURL: "https://gohiking-server.herokuapp.com/",
  // baseURL: "https://go-hiking-backend-laravel.herokuapp.com/",
});


export default function Verify2(props){
    const classes = useStyles();
    const [state , setState] = useState({
      code_one:'',
      code_two:'',
      code_three:'',
      code_four:'',
      submitted:false,
    })

    const codeOneInput = useRef(null);
    const codeTwoInput = useRef(null);
    const codeThreeInput = useRef(null);
    const codeFourInput = useRef(null);

    var [number1, setNumber1] = useState(-1);
    var [number2, setNumber2] = useState(-1);
    var [number3, setNumber3] = useState(-1);
    var [number4, setNumber4] = useState(-1);
    const [email, setEmail] = useState('');
    // setEmail(localStorage.getItem('email'));
    const headers = {
      'email': localStorage.getItem('email')
    }
    console.log(headers);

    const handleCodeChange = (e) => {
      const {id , value} = e.target
      if(value.length < 2){
          setState(prevState => ({
              ...prevState,
              [id] : value
          }))
          if(id === 'code_one' && value.length >0){
              setNumber1(number1 = value); 
              console.log(number1);
              codeTwoInput.current.focus();
          }
          
          if(id === 'code_two' && value.length >0){
              setNumber2(number2 = value); 
              console.log(number2);
              codeThreeInput.current.focus();
          }
          if(id === 'code_three' && value.length >0){             
              setNumber3(number3 = value); 
              console.log(number3);
              codeFourInput.current.focus();
          }
          if(id === 'code_four' && value.length >0){              
              setNumber4(number4 = value); 
              console.log(number4);
        }
      }
    }
        const backspaceTrigger = (e) =>{
          if (e.keyCode === 8 && e.target.id ==='code_two'){
            if(e.target.value !== ''){
              codeTwoInput.current.focus();
            }else{
              codeOneInput.current.focus();
            }
          }
          if (e.keyCode === 8 && e.target.id ==='code_three'){
            if(e.target.value !== ''){
              codeThreeInput.current.focus();
            }else{
              codeTwoInput.current.focus();
            }
          }
          if (e.keyCode === 8 && e.target.id ==='code_four'){
            if(e.target.value === ''){
              codeThreeInput.current.focus();
            } else{
              codeFourInput.current.focus();
            }
            
          }
        }
      //這邊開始處理input進來的文字
        var [code, setCode] = useState({
          "email": null,
          "verificationCode0": null,
          "verificationCode1": null,
          "verificationCode2": null,
          "verificationCode3": null,
        })

        const continueButton = async() => {
          console.log("code is like this before: "+ code);
          setCode({
            "email": localStorage.getItem('email'),
            "verificationCode0": number1,
            "verificationCode1": number2,
            "verificationCode2": number3,
            "verificationCode3": number4,
          })
          console.log("code is like this after: "+ code);
        }
        
        //這邊是處理code更新的部分
        const firstUpdate = useRef(true);
        useLayoutEffect(()=>{
          if (firstUpdate.current){
            firstUpdate.current = false;
            return;
          }    
          console.log('code is like this Effect: ');
          postBack();      
          // eslint-disable-next-line react-hooks/exhaustive-deps
        },[code]);
      
      // 這邊是POST的部分
      const history = useHistory();
      const [error, setError] = useState('');
      const [makesure, setMakesure] = useState('');

      var responsedJson = '';
        const postBack = async() =>{
          console.log(code);
          await api.post('api/password/confirm', code).then(function (response) {
            console.log('驗證碼正確');
            console.log(response.data);
            localStorage.setItem('token', JSON.stringify(response.data));
            console.log(JSON.parse(localStorage.getItem('token')));
            console.log('得到token!');
            console.log('ready to go');
            history.push('/ResetPassword')
          })
          .catch(function (error) {
            console.log('error');
            responsedJson = error.response.data;
            console.log('錯誤資訊如下: '+ responsedJson.error);
            let errorText = "錯誤資訊: " + responsedJson.error;
            setError(errorText);
          })
          .finally(function () {
            console.log(responsedJson);
          });  
        }
        //這裡是重寄驗證碼按鈕的部分
        const emailHeaders = {
          'email': localStorage.getItem('email')
        }
        const resentButton = async() =>{
          setError('');
          console.log(emailHeaders);
          await api.post('api/password/forget', emailHeaders).then(function (response) {
            console.log('重新寄送成功!');
            setMakesure('重新寄送成功!');
            responsedJson = response.data;
          })
          .catch(function (error) {
            console.log('重新寄送失敗!');
            let errorText = "重新寄送失敗: " + responsedJson.error;
            setError(errorText);
            responsedJson = error.response.data;
          })
          .finally(function () {
            console.log(responsedJson);
          });  
        }
        


    return(        
        <div className = {classes.container}>
            <Typography style={{margin: '84px auto 30px', width: '123px', height: '36px', fontSize: '24px', fontWeight: '900'}}>輸入驗證碼</Typography>
            <Typography style={{margin: '16px auto 0px', height: '10px', fontSize: '15px', fontWeight: '500', color: '#232323'}}>已把驗證碼發至您的信箱：</Typography>
            <br />
            <Typography style={{margin: '0px auto 0px', height: '10px', fontSize: '15px', fontWeight: '700', color: '#232323'}}>{localStorage.getItem('email')}</Typography>
            <br />
            <Typography style={{margin: '0px auto 0px', height: '10px', fontSize: '15px', fontWeight: '500', color: '#232323'}}>請確認您的信箱及輸入4位數驗證碼。</Typography>

            <form className={classes.root} noValidate autoComplete="off">
              <ThemeProvider theme={bottomBoard}>
                <TextField 
                  autoFocus
                  className={classes.textField}
                  id="code_one"
                  inputRef={codeOneInput} 
                  value={state.code_one}
                  onChange={handleCodeChange}
                  onKeyDown={backspaceTrigger}                  
                />
                <TextField                   
                  className={classes.textField} 
                  id="code_two"  
                  inputRef={codeTwoInput}
                  value={state.code_two}
                  onChange={handleCodeChange}
                  onKeyDown={backspaceTrigger}                  
                />
                <TextField 
                  className={classes.textField} 
                  id="code_three"  
                  inputRef={codeThreeInput}    
                  value={state.code_three}              
                  onChange={handleCodeChange}
                  onKeyDown={backspaceTrigger} 
                />
                <TextField 
                  className={classes.textField}
                  id="code_four" 
                  inputRef={codeFourInput} 
                  value={state.code_four}
                  onChange={handleCodeChange} 
                  onKeyDown={backspaceTrigger} 
                  sytyle={{position:'relative', zIndex: '-10'}}           
                />
                </ThemeProvider>  
            </form>

            <Typography style={{margin: '16px auto 0 ',color: '#ff3b30' }}>{error} </Typography>
            <Typography style={{margin: '0 auto 0 ',color: '#000000' }}>{makesure} </Typography>
            <Button disabled= {state.submitted} onClick={continueButton}  variant = "contained"  style={{backgroundColor: '#00d04c',color: "#ffffff", fontWeight:"700" , borderColor: "#00d04c", width: "92%",maxWidth:"379px", Height: "48px", margin: "27px auto 0", borderRadius: '4px'}}>
              繼續
            </Button>
            <Button variant = "outlined" onClick={resentButton} style={{color: "#00d04c", fontWeight:"700" , borderColor: "#00d04c",width: "92%",maxWidth:"379px", Height: "48px", margin: "24px auto 0", }}>
              重新發送驗證碼
            </Button>
        </div>
        
        
        );
};

Verify2.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};
