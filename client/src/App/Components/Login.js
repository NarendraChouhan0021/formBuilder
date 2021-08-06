import authService from "../services/authService";
import { useHistory } from "react-router-dom";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ViewListIcon from "@material-ui/icons/ViewList";
import { UserProfileActions } from "../Actions";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
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

function Login(props) {
  console.log("props.............", props);
  const classes = useStyles();
  const history = useHistory();
  const [isLogined, setIsLogined] = React.useState(false);
  const { from } = props.location.state || { from: { pathname: "/" } };

  React.useEffect(() => {
    setIsLogined(authService.isAuthenticated());
  }, []);

  const loginGoogle = async (response) => {
    await props.loginWithGoogle(response);
    if (from.pathname === "/login") {
      history.push("/");
    } else {
      history.push(from.pathname);
    }
    // console.log(response);
    // authService.loginWithGoogle(response).then(
    //   () => {
    //     console.log(from.pathname);

    //     if (from.pathname === "/login") {
    //       history.push("/");
    //     } else {
    //       history.push(from.pathname);
    //     }
    //   },
    //   (error) => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //     console.log(resMessage);
    //   }
    // );
  };

  const logout = (response) => {
    localStorage.removeItem("userTicket");
    setIsLogined(false);
  };

  return (
    <div>
      <CssBaseline />
      <div style={{ display: "flex", flexGrow: 1, textAlign: "start" }}>
        <AppBar position="relative" style={{ backgroundColor: "teal" }}>
          <Toolbar>
            <ViewListIcon
              className={classes.icon}
              onClick={() => {
                history.push("/");
              }}
            />

            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Form Builder
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <br></br>
      <main>
        <div align="center">
          {isLogined ? (
            <div>
              <p>Already logged in. Want to logout?</p>
              <button onClick={logout}>Logout </button>
            </div>
          ) : (
            <Button
              onClick={loginGoogle}
              variant="contained"
              style={{ textTransform: "none" }}
            >
              Login as Guest
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = ({ UserProfileDetails }) => {
  return {
    UserProfileDetails,
  };
};

const mapStateToDispatch = {
  loginWithGoogle: UserProfileActions.loginWithGoogle,
};

export default connect(mapStateToProps, mapStateToDispatch)(Login);

// export default Login;
