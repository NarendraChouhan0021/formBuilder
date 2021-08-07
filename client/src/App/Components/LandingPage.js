import React from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ViewListIcon from "@material-ui/icons/ViewList";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },

  footer: {
    backgroundColor: "#DAE0E2",
    padding: theme.spacing(2),
    position: "relative",
    bottom: 0,
    right: 0,
    left: 0,
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage:
      "url(https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  buttongg: {
    backgroundColor: "teal",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function LangingPage() {
  const classes = useStyles();
  const history = useHistory();

  function loginClick() {
    history.push("/login");
  }

  return (
    <div>
      <CssBaseline />
      <div style={{ display: "flex", flexGrow: 1, textAlign: "start" }}>
        <AppBar position="relative" style={{ backgroundColor: "teal" }}>
          <Toolbar>
            <ViewListIcon className={classes.icon} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Form Builderss
            </Typography>
            <Button color="inherit" onClick={loginClick}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
