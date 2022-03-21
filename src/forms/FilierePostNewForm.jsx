import React, { useReducer } from "react";
import { Formik, Form } from "formik";
import { FieldComp } from "../components/FieldComp";
import { useState } from "react";
import * as Yup from "yup";
import "./css/POSTForm.css";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const FilierePostNewForm = ({ handleClick, cancelOp }) => {
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
  //Init States
  const api = axios.create({ baseURL: "https://localhost:7161/" });
  const [nbchars, setnbchars] = useState(300);
  const [desc, setDesc] = useState("");
  const [msgState, msgDispatch] = useReducer(msgReducer, null);
  const [comboNiveauValue, setComboNiveauValue] = useState("TS");
  if (msgState === "OK") {
    handleClick();
  }
  //Display Error
  const displayMsg = (status) => {
    if (status <= 299 && status >= 200) {
      msgDispatch({ type: "OK" });
    }
    if (status > 299 || status < 200) {
      msgDispatch({ type: "ERR" });
    }
  };
  //Description Handler
  const descHandler = (e) => {
    setDesc(e.target.value);
  };
  //Validator
  const validate = Yup.object({
    txt_idFiliere: Yup.string()
      .min(
        3,
        "Identifiant du filiere doit etre compromis entre 3 et 6 characters"
      )
      .max(
        6,
        "Identifiant du filiere doit etre compromis entre 3 et 6 characters"
      )
      .required("Obligatoire"),
    txt_nomFiliere: Yup.string()
      .max(
        50,
        "Le nom du filiere doit etre compromis entre 10 et 50 characters"
      )
      .min(
        10,
        "Le nom du filiere doit etre compromis entre 10 et 50 characters"
      )
      .required("Obligatoire"),
    DescriptionFiliere: Yup.string(),
  });
  //POST FILIERE
  const PostFiliere = ({ ...values }) => {
    const obj = {
      filiereId: values.txt_idFiliere,
      nomFiliere: values.txt_nomFiliere,
      description: desc,
      typeDiplome: comboNiveauValue,
      filiereModules: [],
      groupes: [],
      stagiaires: [],
    };
    api
      .post("/api/Filieres/", obj)
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
          txt_idFiliere: "",
          txt_nomFiliere: "",
          combodiplomeType: "",
          DescriptionFiliere: desc,
        }}
        defaultValue={{ DescriptionFiliere: desc }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log("values", values);
          PostFiliere(values);
        }}
      >
        <Form>
          <div id="myModal" className="modal" style={{ display: "block" }}>
            <div className="modal-content">
              <div id="modalContainer">
                {msgState !== null ? (
                  <MessageBox
                    type={msgState}
                    message="Filiere has been added"
                  />
                ) : (
                  ""
                )}
                <FieldComp
                  type="text"
                  name="txt_idFiliere"
                  id="filiereId"
                  label="ID filiere"
                ></FieldComp>
                <FieldComp
                  type="text"
                  name="txt_nomFiliere"
                  id="nomFiliere"
                  label="Nom filiere"
                ></FieldComp>
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <InputLabel id="combodiplomeTypelabel">
                    Niveau Diplome
                  </InputLabel>
                  <Select
                    labelId="combodiplomeTypelabel"
                    id="combodiplomeType"
                    name="combodiplomeType"
                    value={comboNiveauValue}
                    label=" Niveau Diplome"
                    onChange={(e) => {
                      setComboNiveauValue(e.target.value);
                    }}
                  >
                    <MenuItem value="TS">Technicien specialiser</MenuItem>
                    <MenuItem value="T">Technicien</MenuItem>
                    <MenuItem value="FQ">Diplome Qualifiante</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  name="DescriptionFiliere"
                  id="DescriptionFiliere"
                  label="Description"
                  multiline
                  maxRows={4}
                  className="form-control"
                  inputProps={{ maxLength: 300 }}
                  onChange={(e) => {
                    descHandler(e);
                    setnbchars(300 - e.target.value.length);
                  }}
                />
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
                    id="modalAjouterBtn"
                    className="btn"
                    type="submit"
                    onClick={handleClick.handleClick}
                  >
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
};

export default FilierePostNewForm;
