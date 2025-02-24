import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import TuneIcon from "@material-ui/icons/Tune";
import { IconButton } from "@material-ui/core";
import Item from "./Item.js";
import "./sidebar.scoped.scss";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  iconButton: {
    padding: 0,
    minHeight: 0,
    minWidth: 0,
    margin: 0
  }
});
const axios = window.axios;
export default function Sidebar(props) {
  const classes = useStyles();
  const { kw, searchApi } = props;
  const [theme, setTheme] = useState("");
  const [difficulty, setDifficulty] = useState();
  const [evaluation, setEvaluation] = useState();
  const [altitude1, setAltitude1] = useState();
  const [altitude2, setAltitude2] = useState();
  const [county, setCounty] = useState("");
  const [state, setState] = useState(false);
  const [anchor] = useState("right");
  const [reset, setReset] = useState(false);
  const [themeArray, setThemeArray] = useState();
  const [countiesArray] = useState([
    { value: "1", title: "台北" },
    { value: "2", title: "新北" },
    { value: "3", title: "台中" },
    { value: "4", title: "高雄" },
    { value: "5", title: "新竹" },
    { value: "6", title: "南投" },
    { value: "7", title: "嘉義" },
    { value: "8", title: "台南" },
    { value: "9", title: "台東" },
    { value: "10", title: "宜蘭" }
  ]);
  const [marksOneChoose] = useState({
    defaultVal: 3,
    marks: [
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
    ]
  });
  const [marksTwoChoose] = useState({
    defaultVal: [0, 2000],
    marks: [
      {
        value: 0,
        label: ""
      },
      {
        value: 1000,
        label: "1000"
      },
      {
        value: 2000,
        label: "2000"
      },
      {
        value: 3000,
        label: "3000"
      },
      {
        value: 4000,
        label: ""
      }
    ]
  });
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("api/collection");
      console.log(data, 1);
      setThemeArray(
        data.map(item => {
          return { value: item.id, title: item.name };
        })
      );
    })();
  }, []);

  const search = () => {
    //改成組成篩選url後回傳至SearchResult內的funtcion再做ajax
    let filters = `/api/trail?filters=title:${kw},difficulty:${
      difficulty.value
    },evaluation:${evaluation},altitude1:${altitude1},altitude2:${altitude2}`;
    county.title !== undefined
      ? (filters += `,county:${county.title}`)
      : (filters += "");
    theme.value !== undefined
      ? (filters += `,collection:${theme.value}`)
      : (filters += "");
    searchApi(filters);
    //恢復預設值
    setCounty(() => "");
    setTheme(() => "");
    setDifficulty({ value: 3, title: "覺得還好" });
    setEvaluation(3);
    setAltitude1(0);
    setAltitude2(1000);
  };

  const toggleDrawer = open => event => {
    if (event.type === "keydown") return;
    setState(open);
  };
  const getTheme = theme => {
    if (theme === "") {
      setTheme("");
    } else {
      setTheme(() => themeArray.find(item => item.value === theme));
    }
  };
  const changeDifficulty = num => {
    switch (num) {
      case 1:
        setDifficulty({
          value: num,
          title: "非常簡單"
        });
        break;
      case 2:
        setDifficulty({
          value: num,
          title: "簡單"
        });
        break;
      case 3:
        setDifficulty({
          value: num,
          title: "覺得還好"
        });
        break;
      case 4:
        setDifficulty({
          value: num,
          title: "困難"
        });
        break;
      case 5:
        setDifficulty({
          value: num,
          title: "非常困難"
        });
        break;
      default:
        break;
    }
  };
  const changeEvaluation = num => {
    switch (num) {
      case 1:
        setEvaluation(num);
        break;
      case 2:
        setEvaluation(num);
        break;
      case 3:
        setEvaluation(num);
        break;
      case 4:
        setEvaluation(num);
        break;
      case 5:
        setEvaluation(num);
        break;
      default:
        break;
    }
  };
  const changeAltitude = numArray => {
    setAltitude1(numArray[0]);
    setAltitude2(numArray[1]);
  };
  const getCounty = county => {
    if (county === "") {
      setCounty("");
    } else {
      setCounty(() => countiesArray.find(item => item.value === county));
    }
  };
  const resetData = () => {
    setReset(() => true);
    setTimeout(() => {
      setReset(false);
    }, 0);
  };
  const content = () => (
    <>
      <Item
        titleL="主題"
        btns={themeArray}
        btns_num={4}
        reset={reset}
        getChild={theme => getTheme(theme)}
      />
      <hr />
      <Item
        titleL="難易度"
        titleR={
          difficulty
            ? difficulty.title
            : "" || changeDifficulty(marksOneChoose.defaultVal)
        }
        reset={reset}
        marks={marksOneChoose}
        getChild={num => changeDifficulty(num)}
      />
      <hr />
      <Item
        titleL="評價"
        titleR={`${evaluation ||
          changeEvaluation(marksOneChoose.defaultVal)}顆星`}
        reset={reset}
        marks={marksOneChoose}
        getChild={num => changeEvaluation(num)}
      />
      <hr />
      <Item
        titleL="海拔"
        titleR={`
      ${altitude1}至${altitude2 || changeAltitude(marksTwoChoose.defaultVal)}M
    `}
        reset={reset}
        marks={marksTwoChoose}
        getChild={numArray => changeAltitude(numArray)}
      />
      <hr />
      <Item
        titleL="縣市"
        btns={countiesArray}
        btns_num={6}
        reset={reset}
        getChild={county => getCounty(county)}
      />
    </>
  );
  return (
    <>
      <IconButton className={classes.iconButton} onClick={toggleDrawer(true)}>
        <TuneIcon style={{ color: "#00d04c" }} />
      </IconButton>
      <Drawer className="page" anchor={anchor} open={state} onClose={toggleDrawer(false)}>
        <div className={classes.list} role="presentation">
          <div className="sidebar">
            <div className="sidebar__header">
              <span>篩選搜尋</span>
            </div>
            <div className="sidebar__content">{content()}</div>
            <div className="sidebar__footer">
              <span className="btn-outline-success">
                <Button onClick={() => resetData()}>重設</Button>
              </span>
              <span className="btn-success">
                <Button
                  onClick={() => {
                    search();
                    setState(false);
                  }}
                >
                  使用
                </Button>
              </span>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
