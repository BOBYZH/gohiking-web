import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { CommentContext } from "contexts/CommentContext";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { Controller } from "react-hook-form";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 16,
    fontWeight: 500
  },
  titleDiv: {
    padding: "0 5%",
    color: "white",
    fontFamily: "PingFangTC",
    fontSize: "18px"
  },
  root: {
    flexGrow: 1
  },
  finishButton: {
    padding: 0,
    paddingLeft: 40
  },
  date: {
    color: "#979797",
    fontSize: 14,
    marginTop: 9
  },
  card: {
    marginTop: 69
  }
}));

const DateBlock = () => {
  const classes = useStyles();
  const [date, setDate] = useState(null);
  const { register, control, setValue, getValues, errors } = useContext(
    CommentContext
  );
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Grid direction="column">
            <Grid item xs={12}>
              <Typography className={classes.title}>日期</Typography>
            </Grid>
            <Grid item xs={12} className={classes.date}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Controller
                  control={control}
                  name="hikingDate"
                  defaultValue={moment().format("YYYY-MM-DD")}
                  render={({ onBlur, value }) => (
                    <KeyboardDatePicker
                      maxDateMessage="請勿超過目前日期"
                      invalidDateMessage="請輸入正確日期格式"
                      margin="normal"
                      disableFuture
                      fullWidth
                      format="yyyy-MM-dd"
                      value={getValues().hikingDate}
                      onChange={date => setValue("hikingDate", date)}
                      InputProps={{
                        disableUnderline: true
                      }}
                    />
                  )}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default DateBlock;
