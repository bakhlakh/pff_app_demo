import React, { useReducer } from "react";
import { Formik, Form, Field } from "formik";
import { FieldComp } from "./FieldComp";
import { useState } from "react";
import * as Yup from "yup";
import MessageBox from "./MessageBox";
import { useStoreActions, useStoreState } from "easy-peasy";
import "./css/moduleForm.css";
const msgReducer = (_, action) => {
  console.log("action.type", action.type);
  switch (action.type) {
    case "OK":
      return "OK";
    case "ERR":
      return "ERR";
    default:
  }
};
function ModulePostNewForm({ handleClick, cancelOp }) {
  const [nbchars, setnbchars] = useState(300);
  const [msgState, msgDispatch] = useReducer(msgReducer, null);
  const api = useStoreState((store) => store.api);
  const displayMsg = (status) => {
    if (status <= 299 && status >= 200) {
      msgDispatch({ type: "OK" });
    }
    if (status > 299 || status < 200) {
      msgDispatch({ type: "ERR" });
    }
  };
  const validate = Yup.object({
    txt_idModule: Yup.string()
      .max(
        10,
        "Identifiant du module doit etre compromis entre 3 et 10 characters"
      )
      .min(
        3,
        "Identifiant du module doit etre compromis entre 3 et 10 characters"
      )
      .required("Obligatoire"),
    txt_Intitule: Yup.string()
      .max(50, "L'intitule doit etre compromis entre 10 et 50 characters")
      .min(10, "L'intitule doit etre compromis entre 10 et 50 characters")
      .required("Obligatoire"),
    txt_descriptionModule: Yup.string()
      .min(10, "La description doit avoir au moins 10 characters")
      .required(),
  });
  const handleSubmit = async (values) => {
    const moduleObj = {
      moduleId: values.txt_idModule,
      intitule: values.txt_Intitule,
      description: values.txt_descriptionModule,
      filiereModules: [],
      Seance: [],
    };
    await api
      .post("/api/Modules", moduleObj)
      .then((e) => {
        displayMsg(e.status);
      })
      .catch((e) => {
        console.log("catch.status", e);
        displayMsg(e.status);
      });
    handleClick();
  };
  return (
    <>
      <Formik
        initialValues={{
          txt_idModule: "",
          txt_Intitule: "",
          txt_descriptionModule: "",
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          handleSubmit(values);
        }}
      >
        <Form>
          <div id="myModal" className="modal" style={{ display: "block" }}>
            <div className="modal-content">
              <div id="modalContainer">
                {msgState !== null ? (
                  <MessageBox type={msgState} message="Module has been added" />
                ) : (
                  ""
                )}
                <FieldComp
                  type="text"
                  name="txt_idModule"
                  id="idModule"
                  placeholder="ID Module"
                ></FieldComp>
                <FieldComp
                  type="text"
                  name="txt_Intitule"
                  id="intitule"
                  placeholder="Intitule Module"
                ></FieldComp>
                <Field
                  name="txt_descriptionModule"
                  id="txt_descriptionModule"
                  component="textarea"
                  cols="30"
                  rows="4"
                  placeholder="Description module"
                  className="form-control"
                  maxLength={300}
                  onInput={(e) => {
                    setnbchars(300 - e.target.value.length);
                  }}
                />
                <label htmlFor="txt_descriptionModule" id="lblchar">
                  {nbchars + " characters restants"}
                </label>
                <div className="modalBtns">
                  <button
                    id="modalCancelBtn"
                    className="btn btn-secondary"
                    type="reset"
                    onClick={cancelOp}
                  >
                    Cancel
                  </button>
                  <button id="modalAjouterBtn" className="btn" type="submit">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default ModulePostNewForm;
