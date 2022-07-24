import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SearchBar from "../../components/SearchBar/SearchBar";
import TitleBar from "../../components/TopBar/TitleBar";
import CollectionList from "../../components/Lists/CollectionList";
import Navigation from "../../components/Bottom/Navigation";
import Container from "@material-ui/core/Container";
import demoapi from "axios/api";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#00d04c"
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  quitSearchText: {
    fontFamily: "NotoSansCJKtc",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    lineHeight: "56px"
  },
  footer: {
    boxShadow: " 0 0 3px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    fontFamily: "NotoSansCJKtc"
  }
}));

function SearchPage() {
  const classes = useStyles();
  const [collection, setCollection] = useState([]);
  const collectionData = async () => {
    const Data = await demoapi.get("api/collection");
    setCollection(Data.data);
  };
  useEffect(() => {
    collectionData();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <ThemeProvider theme={lightTheme}>
          <TitleBar title="步道搜尋" />
          <Container maxWidth="sm">
            <SearchBar />
            <div className={classes.quitSearchText}>快速搜尋</div>
            <Grid container spacing={2}>
              <CollectionList data={collection} />
            </Grid>
          </Container>
          <Navigation dfValue={1} />
        </ThemeProvider>
      </div>
    </>
  );
}

export default SearchPage;
