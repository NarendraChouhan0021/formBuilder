import React from "react";
import formService from "../../services/formService";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ResponseTab(props) {
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    if (props.formData) {
      setQuestions(props.formData.questions);

      setFormData(props.formData);
    }
    const formId = props.formId;
    if (formId !== undefined && formId !== "") {
      formService.getResponse(formId).then(
        (data) => {
          //      console.log(data);
          setResponseData(data);
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
  }, [props.formId, props.formData]);

  function getSelectedOption(qId, i, j) {
    const oneResData = responseData[j];
    // console.log(oneResData);

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

    // return selectedOp[0].optionId;
    // this.students.filter(stud => stud.Class==className);
  }

  // function getOptionTextById(optionId, questionId, i){
  // const finalOption = questions[i].options.find(oo => oo._id === optionId);
  // return finalOption.optionText
  // }

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
              {/* <TableRow>
                      <TableCell component="th" scope="row">
                        aanounfdv
                      </TableCell>
                      <TableCell align="right">2</TableCell>
                      <TableCell align="right">no</TableCell>
                      <TableCell align="right">yes</TableCell>
                    </TableRow> */}
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
export default ResponseTab;