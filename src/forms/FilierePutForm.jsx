import React, { useReducer } from "react";
import { Formik, Form } from "formik";
import { FieldComp } from "../components/FieldComp";
import { useState } from "react";
import * as Yup from "yup";
import "../styles/formsStyles/POSTForm.css";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import authHeader from "../services/auth-header";

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
      .min(
        3,
        "Identifiant du filiere doit etre compromis entre 3 et 6 characters"
      )
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
      stagiaires: [],
    };
    api
      .put(`/api/Filieres/${values.txt_idFilierePUT}`, obj, {
        headers: authHeader(),
      })
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
                  id="filiereIdPUT"
                  label="ID filiere"
                  disabled
                />
                <FieldComp
                  type="text"
                  name="txt_nomFilierePUT"
                  id="nomFiliere"
                  label="Nom filiere"
                />
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <InputLabel id="combodiplomeTypelabel">
                    Niveau Diplome
                  </InputLabel>
                  <Select
                    labelId="combodiplomeTypelabel"
                    id="diplomeTypePUT"
                    name="combodiplomeTypePUT"
                    value={combo}
                    label=" Niveau Diplome"
                    onChange={(e) => {
                      setCombo(e.target.value);
                    }}
                  >
                    <MenuItem value="TS">Technicien specialiser</MenuItem>
                    <MenuItem value="T">Technicien</MenuItem>
                    <MenuItem value="FQ">Diplome Qualifiante</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  name="DescriptionFilierePUT"
                  id="DescriptionFilierePUT"
                  label="Description"
                  multiline
                  maxRows={4}
                  value={desc}
                  className="form-control"
                  inputProps={{ maxLength: 300 }}
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
