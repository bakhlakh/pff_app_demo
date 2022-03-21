import React, { useEffect } from "react";
import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./css/PostStagiaireForm.css";
import { FieldComp } from "../components/FieldComp";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
function PostStagiaireForm({ handleClick, cancelOp }) {
  const api = useStoreState((store) => store.api);
  const getFilieres = useStoreActions((actions) => actions.getFilieres);
  const getGroupes = useStoreActions((actions) => actions.getGroupes);
  const filieres = useStoreState((state) => state.filieres);
  const groupes = useStoreState((state) => state.groupes);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const minDate = new Date();
  const maxDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 30);
  maxDate.setFullYear(maxDate.getFullYear() - 17);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [newStagiaire, setNewStagiaire] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    filiereId: "",
    anneScolaire: "",
    groupId: "",
    email: "",
    cin: "",
    birthDate: minDate,
    address: "",
    nationalite: "Maroccain",
  });
  const filterGroupes = () => {
    let obj = [];
    if (newStagiaire.filiereId !== "") {
      groupes.forEach((item) => {
        if (
          JSON.stringify(item.filiereId)
            .toLocaleLowerCase()
            .includes(String(newStagiaire.filiereId).toLocaleLowerCase())
        ) {
          obj.push(item);
        }
      });
      setFilteredGroups(obj);
    } else setFilteredGroups([]);
  };
  useEffect(() => {
    getFilieres();
    getGroupes();
    filterGroupes();
  }, []);
  useEffect(() => {
    filterGroupes();
  }, [newStagiaire]);

  const validate = Yup.object({
    txt_CIN: Yup.string()
      .min(
        6,
        "Le CIN du stagiaire doit etre compromis entre 6 et 10 characters"
      )
      .max(
        10,
        "Le CIN du stagiaire doit etre compromis entre 6 et 10 characters"
      )
      .required("Obligatoire"),
    txt_Nom: Yup.string()
      .max(
        100,
        "Le nom du stagiaire doit etre compromis entre 2 et 50 characters"
      )
      .min(
        2,
        "Le nom du stagiaire  doit etre compromis entre 2 et 50 characters"
      )
      .required("Obligatoire"),
    txt_Prenom: Yup.string()
      .required("Obligatoire")
      .max(
        100,
        "Le prenom du stagiaire doit etre compromis entre 2 et 50 characters"
      )
      .min(
        2,
        "Le prenom du stagiaire  doit etre compromis entre 2 et 50 characters"
      ),
    txt_Email: Yup.string()
      .email("Entrer un Email valide")
      .max(255)
      .required("l'email est obligatoire"),
    txt_Phone: Yup.string().matches(
      phoneRegExp,
      "Numero de telephone pas valide"
    ),
    dateNaissance: Yup.date().nullable(),
    txt_Address: Yup.string(),
  });
  const handleSubmit = (values) => {
    let stgObj = {
      firstName: values.txt_Prenom,
      lastName: values.txt_Nom,
      phone: values.txt_Phone,
      filiereId: newStagiaire.filiereId,
      anneScolaire: newStagiaire.anneScolaire,
      groupId: newStagiaire.groupId,
      email: values.txt_Email,
      cin: values.txt_CIN,
      birthDate: newStagiaire.birthDate,
      address: newStagiaire.address,
      nationalite: "Maroccain",
    };
    console.log("stgObj", stgObj);
    api
      .post("/api/Stagiaires", stgObj)
      .then((res) => {
        console.log("res", res);
        handleClick();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <>
      <Formik
        initialValues={{
          txt_CIN: "",
          txt_Nom: "",
          txt_Prenom: "",
          txt_Email: "",
          txt_Phone: "",
          dateNaissance: null,
          txt_Address: "",
          nationalite: "Maroccain",
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          if (newStagiaire.groupId !== "" && newStagiaire.filiereId !== "") {
            handleSubmit(values);
          }
        }}
      >
        <Form>
          <div id="myModal" className="modal" style={{ display: "block" }}>
            <div className="stagiairePost-Modal-content">
              <div id="modalContainer">
                <FieldComp
                  type="text"
                  name="txt_CIN"
                  id="txt_CIN"
                  label="CIN"
                />
                <FieldComp
                  type="text"
                  name="txt_Nom"
                  id="txt_Nom"
                  label="Nom"
                />
                <FieldComp
                  type="text"
                  name="txt_Prenom"
                  id="txt_Prenom"
                  label="Prenom"
                />
                <FieldComp
                  type="Email"
                  name="txt_Email"
                  id="txt_Email"
                  label="Email"
                />
                <FieldComp
                  type="text"
                  name="txt_Phone"
                  id="txt_Phone"
                  label="Telephone"
                />
                <div className="mb-2">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      minDate={minDate}
                      maxDate={maxDate}
                      label="Date Naissance"
                      inputformat="yyyy/mm/dd"
                      value={newStagiaire.birthDate}
                      onChange={(e) => {
                        setNewStagiaire({ ...newStagiaire, birthDate: e });
                      }}
                      renderInput={(params) => (
                        <TextField
                          name="dateNaissance"
                          inputformat="yyyy/mm/dd"
                          {...params}
                        />
                      )}
                    />
                    <ErrorMessage
                      name="dateNaissance"
                      className="error"
                      component="div"
                    />
                  </LocalizationProvider>
                </div>
                <TextField
                  sx={{ bgcolor: "#e0e0e0" }}
                  name="txt_Address"
                  id="txt_Address"
                  label="Address"
                  multiline
                  maxRows={4}
                  value={newStagiaire.address}
                  className="form-control mb-2"
                  inputProps={{ maxLength: 200 }}
                  onChange={(e) => {
                    setNewStagiaire({
                      ...newStagiaire,
                      address: e.target.value,
                    });
                  }}
                />
                <TextField
                  type="text"
                  name="txt_Nationalite"
                  value={newStagiaire.nationalite}
                  id="txt_Nationalite"
                  label="Nationalite"
                  disabled
                  className="mb-2"
                />
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <InputLabel id="filiereIdLabel">Filiere</InputLabel>
                  <Select
                    labelId="filiereIdLabel"
                    id="filiere"
                    name="filiere"
                    value={newStagiaire.filiereId}
                    label="Filiere"
                    onChange={(e) => {
                      setNewStagiaire({
                        ...newStagiaire,
                        filiereId: e.target.value,
                      });
                    }}
                  >
                    {filieres.map((item, index) => (
                      <MenuItem
                        key={item.filiereId + "Filiere"}
                        value={item.filiereId}
                      >
                        {item.nomFiliere}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {filteredGroups.length > 0 && (
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="groupIdLabel">Groupe</InputLabel>
                    <Select
                      labelId="groupIdLabel"
                      id="Groupe"
                      name="Groupe"
                      value={newStagiaire.groupId}
                      label="Groupe"
                      onChange={(e) => {
                        console.log("e", e);
                        setNewStagiaire({
                          ...newStagiaire,
                          groupId: e.target.value,
                          anneScolaire: filteredGroups.find(
                            (x) => x.groupId === e.target.value
                          ).anneScolaire,
                        });
                      }}
                    >
                      {filteredGroups.map((item, index) => (
                        <MenuItem
                          key={item.groupId + "groupe"}
                          value={item.groupId}
                        >
                          {item.groupId}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <div className="modalBtns mt-2">
                  <button
                    id="modalCancelBtn"
                    className="btn btn-secondary"
                    onClick={cancelOp}
                  >
                    Cancel
                  </button>
                  <button
                    id="modalAjouterBtn"
                    className="btn"
                    type="submit"
                    onClick={() => {}}
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
}

export default PostStagiaireForm;
