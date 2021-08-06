let router = require("express").Router();
const {
  createForm,
  formsGet,
  getFormById,
  deleteForm,
  editForm,
  getAllFormsOfUser,
  allResponses,
  submitResponse,
  getResponse,
} = require("../services/FormService");

router.post("/create", createForm);
router.get("/forms", formsGet);
router.put("/editform", editForm);
router.post("/addresponse", submitResponse);
router.get("/responses", allResponses);
router.get("/form/:formId", getFormById);
router.delete("/deleteform/:formId/:userId", deleteForm);
router.get("/getuserforms/:userId", getAllFormsOfUser);
router.get("/getresponse/:formId", getResponse);

module.exports = router;
