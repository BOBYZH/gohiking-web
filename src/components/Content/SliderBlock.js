import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Slider,
  Typography,
  withStyles
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import Rating from "@material-ui/lab/Rating";
import { CommentContext } from "contexts/CommentContext";
import { Controller } from "react-hook-form";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 16,
    fontWeight: 500,
    margin: 16
  },
  label: {
    fontSize: 16,
    margin: 16,
    float: "right"
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
  }
}));

const primaryColor = [
  "#00d04c",
  "rgba(0, 208, 76, 0.05)",
  "#009839",
  "rgba(0, 208, 76, 0.1)",
  "#3c5754",
  "#ffeddc",
  "rgba(35, 35, 35, 0.1)",
  "#e4f9e7"
];

const StyledRating = withStyles({
  label: { padding: "0 5vw" }
})(Rating);

const FilterSlider = withStyles({
  root: {
    padding: 0,
    margin: 0,
    minHeight: 48
  },
  thumb: {
    boxShadow:
      "0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14)",
    height: 20,
    width: 20,
    backgroundColor: "#FFF",
    border: "solid 4px currentColor",
    marginTop: -8,
    marginLeft: -10
  },
  track: {
    height: 6,
    borderRadius: 3
  },
  rail: {
    height: 6,
    borderRadius: 3
  },
  markLabelActive: {
    color: primaryColor[0]
  },
  mark: {
    height: 4,
    width: 4,
    borderRadius: 2,
    top: 1
  }
})(Slider);

const SliderBlock = props => {
  const classes = useStyles();
  const { register, control, setValue, getValues } = useContext(CommentContext);
  const [sliderValue, setSliderValue] = useState(3);
  const sliderName = props.name;
  const handleSlider = (e, newValue) => {
    setSliderValue(newValue);
  };
  const marks = [
    {
      value: 1,
      label: "1"
    },
    {
      value: 2,
      label: "2"
    },
    {
      value: 3,
      label: "3"
    },
    {
      value: 4,
      label: "4"
    },
    {
      value: 5,
      label: "5"
    }
  ];
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Grid container direction="column" xs={12}>
          <Grid item xs={12} container direction="row">
            <Grid item xs={6}>
              <Typography className={classes.title}>{props.title}</Typography>
            </Grid>
            <Grid item xs={6} className={classes.textAlignRight}>
              <Typography className={classes.label}>
                {props.label[sliderValue - 1]}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ padding: 16 }}>
            <Controller
              control={control}
              name={sliderName}
              value={sliderValue}
              defaultValue={sliderValue}
              render={({}) => (
                <FilterSlider
                  name={sliderName}
                  value={sliderValue}
                  defaultValue={sliderValue}
                  min={1}
                  max={5}
                  onChange={(e, value) => {
                    setValue(sliderName, value);
                    handleSlider(e, value);
                  }}
                  style={{ color: "#00d04c" }}
                  marks={marks}
                />
              )}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default SliderBlock;
