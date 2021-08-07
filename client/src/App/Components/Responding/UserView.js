import React from "react";
import { Paper, Typography, Grid } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
import auth from "../../services/authService";
import { FormActions } from "../../Actions";
function UserView(props) {
  const { UserProfileDetails, editform, submitRes } = props;
  console.log("allllllllllllllllllllllllllll");
  const [userId, setUserId] = React.useState("");
  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (auth.isAuthenticated()) {
      const userr = jwtDecode(UserProfileDetails.accessToken);
      console.log(userr.id);
      setUserId(userr.id);
    } else {
      const anonymousUserId =
        "anonymous" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      console.log(anonymousUserId);
      setUserId(anonymousUserId);
    }
  }, []);

  const handleRadioChange = (j, i) => {
    const questionId = questions[i]._id;
    const optionId = questions[i].options[j]._id;

    const data = {
      questionId,
      optionId,
    };

    setValue(j);

    const fakeRData = [...responseData];

    const indexOfResponse = fakeRData.findIndex(
      (x) => x.questionId === questionId
    );
    if (indexOfResponse === -1) {
      setResponseData((responseData) => [...responseData, data]);
    } else {
      fakeRData[indexOfResponse].questionId = questionId;
      setResponseData(fakeRData);
    }
  };
  const mounted = React.useRef();

  React.useEffect(
    () => {
      if (!mounted.current) {
        mounted.current = true;
      } else {
        if (editform) {
          console.log("formUserDadasdasta", editform);
          setFormData(editform);
          setQuestions(editform.questions);
        }
      }
    },
    [editform],
    [submitRes]
  );

  React.useEffect(async () => {
    const formId = props.match.params.formId;
    console.log(formId);
    await props.getForm(formId);
  }, [props.match.params.formId]);

  const submitResponse = async () => {
    const submissionData = {
      formId: formData._id,
      userId: userId,
      response: responseData,
    };
    console.log("submissionData", submissionData);
    await props.submitResponse(submissionData);
    setIsSubmitted(true);
  };

  function reloadForAnotherResponse() {
    window.location.reload(true);
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <AppBar position="static" style={{ backgroundColor: "teal" }}>
          <Toolbar>
            <IconButton
              edge="start"
              style={{ marginRight: "10px", marginBottom: "5px" }}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{}}>
              Form Builder
            </Typography>
          </Toolbar>
        </AppBar>
        <br></br>

        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12} sm={5} style={{ width: "100%" }}>
            <Grid style={{ borderTop: "10px solid teal", borderRadius: 10 }}>
              <div>
                <div>
                  <Paper elevation={2} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "15px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          fontFamily: "sans-serif Roboto",
                          marginBottom: "15px",
                        }}
                      >
                        {formData.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        {formData.description}
                      </Typography>
                    </div>
                  </Paper>
                </div>
              </div>
            </Grid>

            {!isSubmitted ? (
              <div>
                <Grid>
                  {questions.map((ques, i) => (
                    <div key={i}>
                      <br></br>
                      <Paper>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginLeft: "6px",
                              paddingTop: "15px",
                              paddingBottom: "15px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              style={{ marginLeft: "10px" }}
                            >
                              {i + 1}. {ques.questionText}
                            </Typography>

                            {ques.questionImage !== "" ? (
                              <div>
                                <img
                                  src={ques.questionImage}
                                  width="80%"
                                  height="auto"
                                />
                                <br></br>
                                <br></br>
                              </div>
                            ) : (
                              ""
                            )}

                            <div>
                              <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                value={value}
                                onChange={(e) => {
                                  handleRadioChange(e.target.value, i);
                                }}
                              >
                                {ques.options.map((op, j) => (
                                  <div key={j}>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "7px",
                                      }}
                                    >
                                      <FormControlLabel
                                        value={j}
                                        control={<Radio />}
                                        label={op.optionText}
                                      />
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {op.optionImage !== "" ? (
                                        <img
                                          src={op.optionImage}
                                          width="64%"
                                          height="auto"
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <Divider />
                                    </div>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  ))}
                </Grid>
                <Grid>
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitResponse}
                    >
                      Submit
                    </Button>
                  </div>
                  <br></br>

                  <br></br>
                </Grid>
              </div>
            ) : (
              <div>
                <Typography variant="body1">Form submitted</Typography>
                <Typography variant="body2">
                  Thanks for submiting form
                </Typography>

                <Button onClick={reloadForAnotherResponse}>
                  Submit another response
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const mapStateToProps = ({ UserProfileDetails, Forms }) => {
  return {
    UserProfileDetails,
    editform: Forms.editform,
    submitRes: Forms.submitRes,
  };
};

const mapStateToDispatch = {
  getForm: FormActions.getForm,
  submitResponse: FormActions.submitResponse,
};

export default connect(mapStateToProps, mapStateToDispatch)(UserView);
