import React, { useReducer } from "react";
import { Formik, Form, Field } from "formik";
import { FieldComp } from "../components/FieldComp";
import { useState } from "react";
import * as Yup from "yup";
import "../styles/formsStyles/POSTForm.css";
import MessageBox from "../components/MessageBox";
import TextField from "@mui/material/TextField";
import { useStoreState } from "easy-peasy";
import "../styles/formsStyles/moduleForm.css";
import authHeader from "../services/auth-header";
import { Button } from "@mui/material";

const msgReducer = (_, action) => {
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
  const [desc, setDesc] = useState("");
  const api = useStoreState((store) => store.api);
  const descHandler = (e) => {
    setDesc(e.target.value);
  };
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
    txt_descriptionModule: Yup.string(),
  });
  const handleSubmit = async (values) => {
    const moduleObj = {
      moduleId: values.txt_idModule,
      intitule: values.txt_Intitule,
      description: desc,
      filiereModules: [],
      Seance: [],
      teachings: [],
    };
    await api
      .post("/api/Modules", moduleObj, { headers: authHeader() })
      .then((e) => {
        displayMsg(e.status);
      })
      .catch((e) => {
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
                  label="ID Module"
                />
                <FieldComp
                  type="text"
                  name="txt_Intitule"
                  id="intitule"
                  label="Intitule Module"
                />
                <TextField
                  name="txt_descriptionModule"
                  id="txt_descriptionModule"
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
                <label htmlFor="txt_descriptionModule" id="lblchar">
                  {nbchars + " characters restants"}
                </label>
                <div className="modal-footer">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      borderRadius: "0px",
                      marginRight: "20px",
                      backgroundColor: "Green",
                    }}
                  >
                    Enregistrer
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: "0px", backgroundColor: "gray" }}
                    onClick={cancelOp}
                  >
                    Annuler
                  </Button>
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
