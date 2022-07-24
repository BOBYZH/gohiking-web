import {
  Drawer,
  Grid,
  makeStyles,
  MenuItem,
  Typography,
  Select
} from "@material-ui/core";
import { imageLabel } from "data/imageLabel";
import CustomAppBar from "components/TopBar/AppBar";
import React, { useState, useEffect, useRef } from "react";
import Swiper from "react-id-swiper";
import SwiperCore, { Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "./ImageDrawer.scoped.scss";
import { useForm } from "react-hook-form";

SwiperCore.use([Pagination]);
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "16px"
  },
  gridContainer: {
    marginTop: 69
  },
  swiperContainer: {
    position: "relative",
    maxWidth: "450px",
    "& img": {
      width: "100%",
      height: "280px",
      objectFit: "cover",
      maxWidth: "450px"
    }
  },
  tip: {
    fontSize: 16,
    color: "#979797"
  },
  tipGrid: {
    marginTop: 22,
    paddingRight: 100
  },
  inputBox: {
    padding: 10,
    width: "100%"
  },
  mainTextWeight: {
    fontWeight: 500,
    marginBottom: 9
  },
  errorGrid: {
    paddingRight: 340
  },
  error: {
    color: "#ff3b30"
  }
}));

export default function ImageDrawer(props) {
  const classes = useStyles();
  const swiperRef = useRef(null);
  const openDrawer = props.openDrawer;
  const toggleDrawer = props.toggleDrawer;
  const setTag = props.setTag;
  const files = props.selectedImages;
  const [selectors, setSelectors] = useState([]); //紀錄標籤陣列
  const [images, setImages] = useState([]); //顯示圖片陣列
  const [error, setError] = useState(false);
  const { handleSubmit } = useForm(); //react hook form
  const onSubmit = data => {
    //送出表單
    //檢查是否有未選擇標籤的圖片
    if (selectors.includes(0)) {
      setError(true);
      return;
    } else {
      setError(false);
      setTag(selectors);
      console.log(selectors);
      toggleDrawer(false);
    }
  };
  const handleBack = () => {
    //返回按鈕
    if (selectors.includes(0)) {
      setError(true);
      return;
    } else {
      setError(false);
      setTag(selectors);
      console.log(selectors);
      toggleDrawer(false);
    }
  };

  //目前圖片index
  const [currentIndex, updateCurrentIndex] = useState(0);

  //輪播器設定
  const params = {
    initialSlide: 3,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    spaceBetween: 30,
    on: {
      slideChange: () => {
        updateCurrentIndex(swiperRef.current.swiper.realIndex);
      }
    }
  };

  const handleTag = (index, value) => {
    //選擇完標籤將標籤id記錄到陣列中
    let newArr = [...selectors];
    newArr[index] = value;
    setSelectors(newArr);
  };

  useEffect(() => {
    //檢查是否有圖片被選擇
    if (files.length < 1) {
      return;
    } else {
      for (let i = 0; i < files.length; i++) {
        // setTagSelectors(e => [...e, <TagSelector index={i} img={files} />]);
        setImages(e => [...e, URL.createObjectURL(files[i])]);
        setSelectors(e => [...e, 0]);
      }
    }
  }, [files]);

  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={() => toggleDrawer(false)}
    >
      <div style={{ width: "100vw" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomAppBar
            title="選擇標籤"
            back={true}
            handleBack={handleBack}
            next="完成"
          />
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.gridContainer}
          >
            <Grid item xs={12}>
              <div className={classes.swiperContainer}>
                <div className="customSwiper">
                  <Swiper {...params} ref={swiperRef}>
                    {images.map(image => (
                      <img src={image} alt="" />
                    ))}
                  </Swiper>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} className={classes.tipGrid}>
              <Typography className={classes.tip}>
                您已經選擇了{images.length}張照片，請將全部照片放上標籤。
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.inputBox}>
              <Typography className={classes.mainTextWeight}>標籤</Typography>
              <div>
                {/* 下拉選單 */}
                <Select
                  fullWidth
                  value={selectors[currentIndex]}
                  onChange={e => handleTag(currentIndex, e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={0} disabled>
                    請選擇{currentIndex}
                  </MenuItem>
                  {imageLabel.map((item, i) => (
                    <MenuItem value={item.value} key={i}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </Grid>
            <Grid className={classes.errorGrid} item xs={12}>
              {error ? (
                <Typography className={classes.error}>
                  請完成照片選擇
                </Typography>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    </Drawer>
  );
}
