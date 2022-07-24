import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardActionArea } from "@material-ui/core";
import { Link } from "react-router-dom";

import family from "../../asset/img/icon-family.svg";
import mapple from "../../asset/img/icon-mapple.svg";
import chellenge from "../../asset/img/icon-chellenge.svg";
import hotSpring from "../../asset/img/icon-hot-spring.svg";
import forest from "../../asset/img/icon-forest.svg";
import sakura from "../../asset/img/icon-sakura.svg";
const useStyles = makeStyles((theme) => ({
  linkstlye: {
    color: "#000",
    textDecoration: "none",
  },
  quitSearchText: {
    fontFamily: "NotoSansCJKtc",
    width: "100%",
    textAlign: "left",
    lineHeight: "56px",
  },
  quickSearchDiv: {
    fontFamily: "NotoSansCJKtc",
    width: "100%",
    backgroundColor: "#ffecdc",
    position: "relative",
    height: "72px",
  },
  iconImg: {
    position: "absolute",
    right: 0,
    bottom: -7,
  },
  span: {
    fontFamily: "NotoSansCJKtc",
    fontWeight: "bold",
    position: "absolute",
    top: 20,
    left: 20,
  },
}));

const obj = {
  "mapple.png": mapple,
  "chellenge.png": chellenge,
  "hotSpring.png": hotSpring,
  "family.png": family,
  "forest.png": forest,
  "sakura.png": sakura,
};

const CollectionList = (props) => {
  const classes = useStyles();
  //api回傳資料
  const data = props.data;
  return data.map((collection) => (
    <Grid item xs={6} key={collection.id}>
      <Link to={`/searchQuick/${collection.id}`} className={classes.linkstlye}>
        <CardActionArea>
          <div className={classes.quickSearchDiv}>
            <span className={classes.span}>{collection.name}</span>
            <img
              src={obj[collection.iconImage]}
              className={classes.iconImg}
              alt={collection.iconImg}
            />
          </div>
        </CardActionArea>
      </Link>
    </Grid>
  ));
};

export default CollectionList;
