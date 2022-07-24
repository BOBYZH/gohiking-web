import React, {  useState, useEffect } from "react";
import {
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {  Grid, GridList } from "@material-ui/core";
import TrailCard from "../../components/Lists/TrailCard";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import demoapi from "../../axios/api"; //引入api
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    fontFamily: "NotoSansCJKtc",
  },

  backArrow: {
    position: "absolute",
    top: "0",
    left: "0",
    margin:"5px",
    display: "block",
    width: "40px",
    height: "40px",
   
  },
  link:{
    color:"#ffffff",
  },
  favoriteIcon: {
    width: "40px",
    height: "40px",
    position: "absolute",
    top: "0",
    margin:"5px",
    right: "20%",
    display: "block",
    color: "#ffffff",
  },
  shareIcon: {
    width: "40px",
    height: "40px",
    position: "absolute",
    top: "0",
    right: "0",
    margin:"5px",
    display: "block",
    color: "#ffffff",
  },
  bar: {
    height: "56px",
    backgroundColor: "transparent",
  },
  Img: {
    width: "100%",
    height: "179px",
  },
  title: {
    height: "36px",
    textIndent: "5%",
    fontSize: "20px",
    fontWeight: "bold",
    lineHeight: "1.5",
    letterSpacing: "0.46px",

    color: "#232323",
  },
  text: {
    height: "84px",
    margin: "16px 16px 24px",
    fontSize: "14px",

    lineHeight: "1.5",
    letterSpacing: "0.5px",
    color: "#232323",
  },
  background: {
    margin: "24px 16px",
    height: "1px",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  textlist: {
    width: "74px",
    height: "27px",
    width: "100%",
    textIndent: "5%",
    fontSize: "18px",
    fontWeight: "bold",
  },
  trailList: {
    padding: " 5%",
  },
  arrow: {
    width: "24px",
    height: "24px",
    margin: "1px 32px 2px 0",
    objectFit: "contain",
  },
  back:{
    textDecoration:"none",
    color:"#0000FF",
  },
 

}));

function Column(props) {
  const classes = useStyles();
  const [trail, setTrail] = useState([]);
  const [article, setArticle] = useState([]);
  const id = props.match.params.id;

  console.log(id);
  var uid = 0;
  if(localStorage.getItem('userId')){
     uid= localStorage.getItem('userId'); //取得localstorage ussrId
   }else{
     uid = null;  //取不到user Id
   }

  const articleApi = async (id) => {
    //搜尋文章頁面api
    await demoapi.get("/api/article/" + id + "?uuid="+uid).then((res) => {
      setArticle(res.data);
      setTrail(res.data.trails);
    });
  };
 const handleShare = () => {
            if (navigator.share) {
                console.log("Congrats! Your browser supports Web Share API");
                navigator
                    .share({
                        url: `https://share.toogoodtogo.com/store/1006/milestones/meals-saved/`
                    })
                    .then(() => {
                        console.log("Sharing successfull");
                    })
                    .catch(() => {
                        console.log("Sharing failed");
                    }); 
            } else {
                console.log("Sorry! Your browser does not support Web Share API");
            }
        };
  useEffect(() => {
    articleApi(id);
  }, [id]);
  console.log(article);

  localStorage.setItem("previous_pathname", "/columnPage/" + id);

  return (
    <>
      <div className={classes.root}>
        <ThemeProvider>
          <img src={article.image} className={classes.Img} />

          <Grid item xs={12} className={classes.backArrow}>
          <Link to="/home" className={classes.link}> 
          <ArrowBackIcon />
          </Link>
        
          </Grid>
          <Grid className={classes.favoriteIcon}>
            <FavoriteIcon />
          </Grid>
          <Grid className={classes.shareIcon}>
            <ShareIcon  onClick={handleShare} />
          </Grid>
          <div className={classes.title}>{article.title}</div>
          <Grid item xs={12}>
            <div className={classes.text}>{article.content}</div>
          </Grid>

          <Grid item xs={12}>
            <div className={classes.background} />
          </Grid>
          <Grid item xs={12} container>
            <div className={classes.textlist}>步道推薦</div>
            <div className={classes.trailList}>
              <GridList cellHeight={72} cols={1}>
                {trail.map((trail) => (
                  <TrailCard data={trail} />
                ))}
              </GridList>
            </div>
          </Grid>
        </ThemeProvider>
      </div>
    </>
  );
}

export default Column;
