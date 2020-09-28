import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from "@material-ui/core/Switch";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router } from "react-router-dom";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";

// For Switch Theming
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBoard from "./components/AppBoard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItemsred: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "light" : "dark";
  const mainPrimaryColor = darkState ? lightBlue[600] : orange[500];
  const mainSecondaryColor = darkState ? deepPurple[500] : deepOrange[900];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });
  const classes = useStyles();
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Typography
                component="p"
                variant="h6"
                noWrap
                className={classes.title}
              >
                KeywordBin
              </Typography>
              <Switch checked={darkState} onChange={handleThemeChange} />
            </Toolbar>
          </AppBar>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <AppBoard />
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}
