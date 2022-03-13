import React from "react";
import { Formik, Form, Field } from "formik";
import { FieldComp } from "./FieldComp";
import { useState, useReducer } from "react";
import * as Yup from "yup";
import TextareaFormik from "./TextareaFormik";
import "./css/POSTForm.css";
import MessageBox from "./MessageBox";
import axios from "axios";

function FilierePutForm({ fieldValues, cancelOp, handleClick }) {
  const msgReducer = (msgState, action) => {
    console.log("second");
    switch (action.type) {
      case "OK":
        return "OK";
      case "ERR":
        return "ERR";
      default:
    }
  };
  //Init States
  const api = axios.create({ baseURL: "https://localhost:7161/" });
  const [nbchars, setnbchars] = useState(300);
  const [desc, setDesc] = useState(fieldValues.description);
  const [combo, setCombo] = useState(fieldValues.typeDiplome);
  const [msgState, msgDispatch] = useReducer(msgReducer, null);
  if (msgState === "OK") {
    handleClick();
  }
  //Description Handler
  const descHandler = (e) => {
    setDesc(e.target.value);
  };
  //Display Error
  const displayMsg = (status) => {
    if (status <= 299 && status >= 200) {
      msgDispatch({ type: "OK" });
    }
    if (status > 299 || status < 200) {
      msgDispatch({ type: "ERR" });
    }
  };
  const validate = Yup.object({
    txt_idFilierePUT: Yup.string()
      .max(
        6,
        "Identifiant du filiere doit etre compromis entre 3 et 6 characters"
      )
      .required("Obligatoire"),
    txt_nomFilierePUT: Yup.string()
      .max(
        50,
        "Le nom du filiere doit etre compromis entre 10 et 50 characters"
      )
      .min(
        10,
        "Le nom du filiere doit etre compromis entre 10 et 50 characters"
      )
      .required("Obligatoire"),
  });
  const putFiliere = ({ ...values }) => {
    const obj = {
      filiereId: values.txt_idFilierePUT,
      nomFiliere: values.txt_nomFilierePUT,
      description: desc,
      typeDiplome: combo,
      filiereModules: [],
      groupes: [],
    };
    api
      .put(`/api/Filieres/${values.txt_idFilierePUT}`, obj)
      .then((e) => {
        displayMsg(e.status);
      })
      .catch((e) => {
        displayMsg(400);
      });
  };
  return (
    <>
      <Formik
        initialValues={{
          txt_idFilierePUT: fieldValues.filiereId,
          txt_nomFilierePUT: fieldValues.nomFiliere,
          DescriptionFilierePUT: fieldValues.description,
          combodiplomeTypePUT: combo,
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          putFiliere(values);
        }}
      >
        <Form>
          <div id="myModal" className="modal" style={{ display: "block" }}>
            <div className="modal-content">
              <div id="modalContainer">
                {/* MessageBoxes */}
                {msgState !== null ? (
                  <MessageBox
                    type={msgState}
                    message="Filiere has been updated"
                    id={fieldValues.filiereId + msgState}
                  />
                ) : (
                  ""
                )}
                {/* Fields */}
                <FieldComp
                  type="text"
                  name="txt_idFilierePUT"
                  className="form-control"
                  id="filiereIdPUT"
                  placeholder="ID filiere"
                  disabled
                />
                <FieldComp
                  type="text"
                  name="txt_nomFilierePUT"
                  className="form-control"
                  id="nomFiliere"
                  placeholder="Nom filiere"
                />
                <Field
                  as="select"
                  name="combodiplomeTypePUT"
                  id="diplomeTypePUT"
                  className="form-control mb-2"
                  onChange={(e) => {
                    setCombo(e.target.value);
                  }}
                >
                  <Field
                    as="option"
                    value="TS"
                    defaultValue="TS"
                    {...() => {
                      if (fieldValues.typeDiplome === "TS") return "selected";
                    }}
                  >
                    Technicien specialiser
                  </Field>
                  <Field
                    as="option"
                    value="T"
                    defaultValue="T"
                    {...() => {
                      if (fieldValues.typeDiplome === "T") return "selected";
                    }}
                  >
                    Technicien
                  </Field>
                  <Field
                    as="option"
                    value="FQ"
                    defaultValue="FQ"
                    {...() => {
                      if (fieldValues.typeDiplome === "FQ") return "selected";
                    }}
                  >
                    Diplome Qualifiante
                  </Field>
                </Field>
                <TextareaFormik
                  name="DescriptionFilierePUT"
                  id="DescriptionFilierePUT"
                  cols="30"
                  rows="4"
                  value={desc}
                  placeholder="Filiere Description"
                  className="form-control"
                  maxLength={300}
                  onChange={(e) => {
                    descHandler(e);
                    setnbchars(300 - e.target.value.length);
                  }}
                />
                {/* Buttons */}
                <label htmlFor="DescriptionFiliere" id="lblchar">
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
                  <button
                    id="modalPutBtn"
                    className="btn btnsubmit"
                    type="submit"
                  >
                    UPDATE
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

export default FilierePutForm;
