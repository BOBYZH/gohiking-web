import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  withStyles
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { CommentContext } from "contexts/CommentContext";
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
    marginTop: 9
  },
  rating: {
    marginTop: 16
  },
  error: {
    paddingTop: 16,
    color: "red"
  }
}));

const StyledRating = withStyles({
  label: { padding: "0 5vw" }
})(Rating);

const RatingBlock = () => {
  const classes = useStyles();
  const { register, control, errors } = useContext(CommentContext);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Grid direction="column">
            <Grid item xs={12}>
              <Typography className={classes.title}>評價</Typography>
            </Grid>
            <Grid item xs={12} className={classes.date}>
              <Controller
                control={control}
                name="ratingStar"
                defaultValue={0}
                render={({ onChange }) => (
                  <StyledRating
                    defaultValue={0}
                    className={classes.rating}
                    name="ratingStar"
                    onChange={e => onChange(e)}
                    size="large"
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} className={classes.error}>
              <Typography variant="h8">{errors.ratingStar?.message}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default RatingBlock;
