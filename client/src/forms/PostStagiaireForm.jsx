import React, { useEffect } from "react";
import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/formsStyles/PostStagiaireForm.css";
import { FieldComp } from "../components/FieldComp";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import MessageBox from "../components/MessageBox";
import { Button } from "@mui/material";

function PostStagiaireForm({ handleClick, cancelOp }) {
  const getFilieres = useStoreActions((actions) => actions.getFilieres);
  const postStagiaire = useStoreActions((actions) => actions.postStagiaire);
  const filieres = useStoreState((state) => state.filieres);
  const getGroupes = useStoreActions((actions) => actions.getGroupes);
  const groupes = useStoreState((state) => state.groupes);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [messageVisible, setMessageVisible] = useState(false);
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
  const initDataStores = async () => {
    getFilieres();
    getGroupes();
    filterGroupes();
  };
  useEffect(() => {
    initDataStores();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    filterGroupes();
    //eslint-disable-next-line
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
  const handleSubmit = async (values) => {
    let stgObj = {
      firstName: values.txt_Prenom,
      lastName: values.txt_Nom,
      phone: values.txt_Phone,
      anneScolaire: newStagiaire.anneScolaire,
      groupId: newStagiaire.groupId || null,
      email: values.txt_Email,
      cin: values.txt_CIN,
      birthDate: newStagiaire.birthDate,
      address: newStagiaire.address,
      nationalite: "Maroccain",
      statue: "Active",
    };
    const res = await postStagiaire(stgObj);
    if (res) {
      handleClick();
      cancelOp();
    } else setMessageVisible(true);
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
          handleSubmit(values);
        }}
      >
        <Form>
          <div id="myModal" className="modal" style={{ display: "block" }}>
            <div className="stagiairePost-Modal-content">
              <div id="modalContainer">
                {messageVisible && (
                  <MessageBox
                    type="ERR"
                    message="Valider tous les champs"
                    cancelOp={() => {
                      setMessageVisible(false);
                    }}
                  />
                )}
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

export default PostStagiaireForm;
