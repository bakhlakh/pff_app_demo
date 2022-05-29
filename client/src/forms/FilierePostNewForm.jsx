import React, { useReducer } from "react";
import { Formik, Form } from "formik";
import { FieldComp } from "../components/FieldComp";
import { useState } from "react";
import * as Yup from "yup";
import "../styles/formsStyles/POSTForm.css";
import MessageBox from "../components/MessageBox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useStoreActions } from "easy-peasy";
const FilierePostNewForm = ({ handleClick, cancelOp }) => {
  const msgReducer = (_, action) => {
    switch (action.type) {
      case "OK":
        return "OK";
      case "ERR":
        return "ERR";
      default:
    }
  };
  //Init States
  const postFiliere = useStoreActions((actions) => actions.postFiliere);
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
  const PostFiliere = async ({ ...values }) => {
    const obj = {
      filiereId: values.txt_idFiliere,
      nomFiliere: values.txt_nomFiliere,
      description: desc,
      typeDiplome: comboNiveauValue,
      filiereModules: [],
      groupes: [],
      stagiaires: [],
    };
    const res = await postFiliere(obj);
    if (res) {
      displayMsg(201);
      handleClick();
      cancelOp();
    } else displayMsg(402);
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
                    message="Filiere Ajouter avec succes"
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
                <div className="modal-footer">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      borderRadius: "0px",
                      marginRight: "20px",
                      backgroundColor: "Green",
                    }}
                    onClick={handleClick.handleClick}
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
};

export default FilierePostNewForm;
