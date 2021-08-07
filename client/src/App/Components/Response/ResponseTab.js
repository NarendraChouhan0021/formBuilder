import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FormActions } from "../../Actions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ResponseTab(props) {
  const classes = useStyles();
  const { resData } = props;
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const mounted = React.useRef();

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (resData) {
        console.log("formUserDadasdasta", resData);
        setResponseData(resData);
      }
    }
  }, [resData]);

  React.useEffect(async () => {
    if (props.formData) {
      setQuestions(props.formData.questions);

      setFormData(props.formData);
    }
    const formId = props.formId;
    if (formId !== undefined && formId !== "") {
      await props.getResponse(formId);
    }
  }, [props.formId, props.formData]);

  function getSelectedOption(qId, i, j) {
    const oneResData = responseData[j];
    const selectedOp = oneResData.response.filter(
      (qss) => qss.questionId === qId
    );
    console.log(selectedOp);

    if (selectedOp.length > 0) {
      const finalOption = questions[i].options.find(
        (oo) => oo._id === selectedOp[0].optionId
      );
      return finalOption.optionText;
    } else {
      return "not attempted";
    }
  }

  return (
    <div>
      <div className="container">
        <br />
        <p align="center"> Responses</p>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                {questions &&
                  questions.length &&
                  questions.map((ques, i) => (
                    <TableCell key={i} align="right">
                      {ques.questionText}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {responseData &&
                responseData.length &&
                responseData.map((rs, j) => (
                  <TableRow key={j}>
                    <TableCell component="th" scope="row">
                      {rs.userId}
                    </TableCell>
                    {questions.map((ques, i) => (
                      <TableCell key={i} align="right">
                        {getSelectedOption(ques._id, i, j)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

const mapStateToProps = ({ Forms }) => {
  return {
    resData: Forms.resData,
  };
};

const mapStateToDispatch = {
  getResponse: FormActions.getResponse,
};

export default connect(mapStateToProps, mapStateToDispatch)(ResponseTab);
