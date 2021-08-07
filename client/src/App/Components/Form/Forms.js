import React from "react";
import formService from "../../services/formService";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import OneForm from "./OneForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function Forms(props) {
  const { UserProfileDetails } = props;
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = React.useState([]);
  const [forms, setForms] = React.useState([]);
  const [loadingForms, setLoadingForms] = React.useState(true);

  React.useEffect(() => {
    setUser(jwtDecode(UserProfileDetails.accessToken));
  }, [UserProfileDetails]);

  React.useEffect(() => {
    if (props.userId === undefined) {
      // console.log("this userId is undefined");
    } else {
      formService.getForms(props.userId).then(
        (forms2) => {
          setForms(forms2);
          setLoadingForms(false);
        },

        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
        }
      );
    }
  }, [props.userId]);

  return (
    <div>
      <CssBaseline />
      {loadingForms ? <CircularProgress /> : ""}
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={6}>
          {forms && forms.length
            ? forms.map((form, i) => <OneForm formData={form} key={i} />)
            : "CLICK ON THE + ICON TO CREATE FORM"}
        </Grid>
      </Container>
    </div>
  );
}

const mapStateToProps = ({ UserProfileDetails }) => {
  return {
    UserProfileDetails,
  };
};

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(Forms);
