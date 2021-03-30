import {
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { CommentContext } from "contexts/CommentContext";

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
    marginTop: 9
  },
  hour: {
    paddingRight: 8
  },
  minute: {
    paddingLeft: 8
  },
  textField: {
    borderColor: "#000"
  },
  commentGrid: {
    marginTop: 16
  },
  reminder: {
    marginTop: 16,
    color: "#979797"
  },
  error: {
    color: "red"
  }
}));
const CommentBlock = () => {
  const classes = useStyles();
  const { register, control, setValue, getValue, errors } = useContext(
    CommentContext
  );

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Grid direction="column">
            <Grid item xs={12}>
              <Typography className={classes.title}>耗時</Typography>
            </Grid>
            <Grid container item xs={12} direction="row">
              <Grid
                container
                direction="column"
                item
                xs={6}
                className={classes.hour}
              >
                <Grid item xs={12}>
                  <TextField
                    inputRef={register}
                    name="timeSpentH"
                    fullWidth
                    placeholder="小時"
                    InputProps={{
                      style: { fontFamily: "Arial", color: "#979797" }
                    }}
                  />
                </Grid>
                <Grid item xs={12} className={classes.error}>
                  <p>{errors.timeSpentH?.message}</p>
                </Grid>
              </Grid>
              <Grid
                container
                direction="column"
                item
                xs={6}
                className={classes.minute}
              >
                <Grid item xs={12}>
                  <TextField
                    inputRef={register}
                    name="timeSpentM"
                    className={classes.textField}
                    fullWidth
                    placeholder="分鐘"
                    InputProps={{
                      style: {
                        fontFamily: "Arial",
                        color: "#979797"
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} className={classes.error}>
                  <p>{errors.timeSpentM?.message}</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.commentGrid}>
              <Typography className={classes.title}>評論</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                name="comment"
                className={classes.textField}
                fullWidth
                placeholder="說點什麼吧......"
                multiline
                rows={6}
                InputProps={{
                  style: {
                    fontFamily: "Arial",
                    color: "#979797"
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} className={classes.error}>
              <p>{errors.comment?.message}</p>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.reminder}>
                照片上傳限制為15張以內
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.commentGrid}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                style={{
                  padding: 8,
                  color: "#00d04c",
                  borderColor: "#00d04c"
                }}
              >
                上傳照片
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentBlock;
