import t from "./types";
import axios from "axios";
const API_URL = "http://localhost:5000/api/form/";

export const getForms = (userId) => async (dispatch) => {
  const { data } = await axios.get(API_URL + "getuserforms/" + userId);
  if (data) {
    await dispatch({ type: t.GET_FORMS, payload: data });
  }
};

export const createNewForm = (body) => async (dispatch) => {
  const { data } = await axios.post(API_URL + "create", body);
  if (data) {
    await dispatch({ type: t.CREATE_FORMS, payload: data });
  }
};

export const getForm = (formId) => async (dispatch) => {
  const { data } = await axios.get(API_URL + "form/" + formId);
  if (data) {
    await dispatch({ type: t.GET_FORM, payload: data });
  }
};

export const submitResponse = (body) => async (dispatch) => {
  const { data } = await axios.post(API_URL + "addresponse", body);
  if (data) {
    await dispatch({ type: t.SUBMIT_RESPONSE, payload: data });
  }
};

export const getResponse = (formId) => async (dispatch) => {
  const { data } = await axios.get(API_URL + "getresponse/" + formId);
  if (data) {
    await dispatch({ type: t.GET_RESPONSE, payload: data });
  }
};
