import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { Checkbox } from "@material-ui/core";
import demoapi from "axios/api";
import { useHistory } from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  gridCell: {
    marginBottom: 14
  },
  title: {
    fontSize: 16,
    fontWeight: 500
  },
  location: {
    fontSize: 14,
    color: "#979797"
  },
  distance: {
    fontSize: 12,
    color: "#979797"
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  background: {
    height: "1px",
    backgroundColor: "rgba(0, 0, 0, 0.12)"
  },
  favorite: {
    color: "#FFF",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  mediaAvatar: {
    position: "relative",
    marginRight: 16,
    float: "right",
    "& img": {
      borderRadius: "4px",
      width: "100%",
      height: "72px",
      maxWidth: "180px",
      minWidth: "100px",
      objectFit: "cover"
    }
  },
  buttonbase: {
    // margin: 0,
    marginBottom: 14
  }
}));

const TrailCard = props => {
  const history = useHistory();
  const classes = useStyles();
  //api回傳資料
  const data = props.data;
  const [checked, setChecked] = useState(data.favorite);
  useEffect(() => {
    setChecked(data.favorite);
  }, [props]);
  const handleChange = id => {
    let uid = 0;
    if (localStorage.getItem("userId")) {
      uid = localStorage.getItem("userId");
    } else {
      alert("請先登入");
      history.push({ pathname: "/signin" });
    }
    setChecked(!checked);
    demoapi.post("/api/favorite/?user_id=" + uid + "&trail_id=" + id);
  };
  return (
    <div className={classes.root}>
      <>
        <Grid
          key={data.id}
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
          className={classes.gridCell}
          item
          xs={12}
        >
          <Grid item xs={4}>
            <div className={classes.mediaAvatar}>
              <img src={data.coverImage} alt={data.title} />
              <Checkbox
                checked={checked}
                onChange={() => {
                  handleChange(data.id);
                }}
                icon={<FavoriteBorder fontSize={"small"} />}
                checkedIcon={
                  <Favorite fontSize={"small"} style={{ color: "#FFF" }} />
                }
                className={classes.favorite}
                name="favorite"
              />
            </div>
          </Grid>
          <Grid
            item
            xs={8}
            container
            direction="column"
            alignItems="flex-start"
            onClick={() => {
              history.push({
                pathname: "/pathway",
                state: { trail_id: data.id }
              });
            }}
          >
            <Grid item xs={12} className={classes.title}>
              <div style={{ marginTop: 2 }}>{data.title}</div>
            </Grid>
            <Grid item xs={12} className={classes.location}>
              <div style={{ marginTop: 2 }}>
                {data.location ? data.location.county.name : ""}
                {data.location ? data.location.name : ""}
              </div>
            </Grid>
            <Grid item xs={12} className={classes.distance}>
              <div style={{ marginTop: 2 }}>全程約{data.distance}公里</div>
            </Grid>
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={8}>
            <Divider />
          </Grid>
        </Grid>
      </>
    </div>
  );
};
export default TrailCard;
