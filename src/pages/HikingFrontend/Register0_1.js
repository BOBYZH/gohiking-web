import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { countryInfo } from "../../data/countryInfo";
import { countryCode } from "../../data/countryCode";

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  FormControl: {
    margin: theme.spacing(1),
    width: '-webkit-fill-available',
  },
  container: {
    width: '-webkit-fill-available',
    height: 768,
    padding: '40px 16px 48px',
  },
  Title: {
    width: '-webkit-fill-available',
    height: '36px',
    margin: '0 0px 31px 0',
    fontFamily: "NotoSansCJKtc",
    fontSize: '24px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#232323'
  },
  Text: {
    // width: '33px',
    // height:'24px',
    margin: '0 0 1px 0',
    fontSize: '16px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#232323',
  },
  InputBackground: {
    width: '-webkit-fill-available',
    // height: '40px',
    margin: '8px 0 31px 0',
    borderColor: '#232323',
  },
  PhoneRegionBackground: {
    width: '-webkit-fill-available',
    // height: '40px',
    margin: '8px 0 31px 0',//not correct position
    padding: '8px 0 0',
  },
  PhoneNumberBackground: {
    width: '-webkit-fill-available',
    //fullWidth:true,
    height: '40px',
    margin: '8px 0 31px 0',
    //margin: '-12px 0 0px 40px',//first value need to fix
    padding: '8px 0 0',
  },
  submit: {
    width: '-webkit-fill-available',
    height: '48px',
    margin: '10px 0px 0px 0px',
    backgroundColor: '#00d04c',
    color: '#ffffff',
  },
  ModifyTextFieldColor: {
    // Theme Color, or use css color in quote
    fontSize: '14px',
    color: '#979797',
    borderColor: '#979797'
  },
  errorInfo: {
    width: '100%',
    height: '0px',
    margin: '-20px 0px 30px 0px',
    fontFamily: 'NotoSansCJKtc',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    color: '#ff3b30',
  },
}));
const usePlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#aaa"
  }
}));
;

export default function SignIn() {
  const classes = useStyles();

  let responsedJSON;
  const [serverState, setServerState] = React.useState();
  const handleServerResponse = (signup, msg) => {
    setServerState({
      signup,
      msg
    });
  };

  const [name, setName] = React.useState('');

  const [gender, setGender] = React.useState('');
  const [gendererror, setGendererror] = React.useState(false);
  const [gendervalidate, setGendervalidate] = React.useState(false);

  const [phoneRegion, setPhoneRegion] = React.useState('');
  const [phoneRegionError, setPhoneRegionError] = React.useState(false);
  const [phoneRegionvalidate, setPhoneRegionvalidate] = React.useState(false);

  const [phoneNumeber, setPhoneNumeber] = React.useState('');

  //const [selectedDate, setSelectedDate] = React.useState('');
  const [dateError, setDateError] = React.useState(false);
  const [dateValidate, setDateValidate] = React.useState(false);

  const [county, setCounty] = React.useState('');
  const [countyError, setCountyError] = React.useState(false);
  const [countyValidate, setCountyValidate] = React.useState(false);

  const [inputValue, setInputValue] = useState([]);
  const { register, handleSubmit, errors, control } = useForm()
  const history = useHistory();
  const handleChange = (event) => {
    setGender(event.target.value);
    setGendererror(false);
    setGendervalidate(true);
  };
  const handlePhoneRegion = (event) => {
    setPhoneRegion(event.target.value);
    setPhoneRegionError(false);
    setPhoneRegionvalidate(true);
  };
  const handleDateChange = (date, value) => {
    setInputValue(value);
    setDateError(false);
    setDateValidate(true);
  };
  const handleCountyChange = (event) => {
    setCounty(event.target.value);
    setCountyError(false);
    setCountyValidate(true);
  };

  const Placeholder = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
  };

  let testOuputObj = {
    name: name,
    gender: gender,
    phone_number: phoneNumeber,
    country_code_id: phoneRegion,
    birth: inputValue,
    county_id: county
  }
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
  const axios = require('axios');
  //let responsedJson; // 將回傳的JSON先定義為變數，後面再賦值

  const onSubmit = async (data) => {
    data = testOuputObj;
    if (gendervalidate || phoneRegionvalidate || countyValidate || dateValidate) {
      await axios.post('https://gohiking-server.herokuapp.com/api/profile', data, { headers })
        .then(function (response) {
          console.log('correct');
          responsedJSON = response.data;
          history.push('/signin');
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
    else {
      if (!gendervalidate) {
        setGendererror(true);
      }
      if (!phoneRegionvalidate) {
        setPhoneRegionError(true);
      }
      if (!dateValidate) {
        setDateError(true);
      }
      if (!countyValidate) {
        setCountyError(true);
      }
    }
  }

  function handleErrorMessage() {
    if (gendervalidate) {
      setGendererror(false);
    }
    else {
      setGendererror(true);
    }
    if (phoneRegionvalidate) {
      setPhoneRegionError(false);
    }
    else {
      setPhoneRegionError(true);
    }
    if (dateValidate) {
      setDateError(false);
    }
    else {
      setDateError(true);
    }
    if (countyValidate) {
      setCountyError(false);
    }
    else {
      setCountyError(true);
    }
  }

  //console.log(testOuputObj);
  return (

    <div className={classes.container}>
      <Typography className={classes.Title}>
        建立個人資料
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <Typography className={classes.Text}>
            姓名
          </Typography>
          <Input
            id="name"
            name="name"
            className={classes.InputBackground}
            placeholder="請輸入您的名稱"
            fullWidth
            inputRef={register({ required: true })}
            onChange={event => setName(event.target.value)}//Get value in Email
          />
          <Typography className={classes.errorInfo}>{errors.name && "請輸入姓名"}</Typography>
        </div>
        <div>
          <Typography className={classes.Text} >
            性別
          </Typography>
          <Select
            name="gender"
            className={classes.InputBackground}
            inputProps={{ 'aria-label': 'Without label' }}
            value={gender}
            displayEmpty
            onChange={handleChange}
          >
            <MenuItem value="" disabled> <Placeholder>請選擇</Placeholder></MenuItem>
            <MenuItem value={1}>男</MenuItem>
            <MenuItem value={0}>女</MenuItem>
          </Select>
          {gendererror ?
            <>
              <Typography className={classes.errorInfo} >
                {"請輸入性別"}
              </Typography>
            </>
            :
            <div></div>
          }
        </div>
        <div>
          <Typography className={classes.Text} >
            手機
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Select
                className={classes.PhoneRegionBackground}
                value={phoneRegion}
                displayEmpty
                onChange={handlePhoneRegion}
              >
                <MenuItem value="" disabled> <Placeholder>台灣+886</Placeholder></MenuItem>
                {countryInfo.map((region, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {region.countryName}{region.phoneCode}
                  </MenuItem>
                ))}
              </Select>
              {phoneRegionError ?
                <>
                  <Typography className={classes.errorInfo} >
                    {"請輸入區碼"}
                  </Typography>
                </>
                :
                <div></div>
              }
            </Grid>
            <Grid item xs={8}>
              <Input
                name="phoneNumber"
                className={classes.PhoneNumberBackground}
                placeholder="請輸您的手機號碼"
                onChange={event => setPhoneNumeber(event.target.value)}//Get value in Email
                fullWidth
                inputRef={register({ required: true })}
              />
              <Typography className={classes.errorInfo}>{errors.phoneNumber && "請輸入手機號碼"}</Typography>
            </Grid>
          </Grid>
        </div>
        <div>
          <Typography className={classes.Text} >
            生日
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              placeholder="請選擇"
              className={classes.InputBackground}
              format="yyyy/MM/dd"
              margin="normal"
              invalidDateMessage=''
              id="date-picker-dialog"
              //value={selectedDate}
              inputValue={inputValue}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          {dateError ?
            <>
              <Typography className={classes.errorInfo} >
                {"請輸入日期"}
              </Typography>
            </>
            :
            <div></div>
          }
        </div>
        <div>
          <Typography className={classes.Text} >
            居住地
          </Typography>
          <Select
            className={classes.InputBackground}
            value={county}
            displayEmpty
            onChange={handleCountyChange}
          >
            <MenuItem value="" disabled> <Placeholder>請選擇</Placeholder></MenuItem>
            {countryCode.map((city, i) => (
              <MenuItem key={i} value={i + 1}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
          {countyError ?
            <>
              <Typography className={classes.errorInfo} >
                {"請輸入日期"}
              </Typography>
            </>
            :
            <div></div>
          }
          {serverState && (
            <div className={classes.errorInfo}>{serverState.msg}</div>
          )}
        </div>
        <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleErrorMessage}
          >
            同意並註冊
        </Button>
        </div>
      </form>
    </div>
  );
}