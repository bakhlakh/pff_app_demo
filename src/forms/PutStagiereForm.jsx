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

function PutStagiereForm({ fieldValues, cancelOp, handleClick }) {
  console.log(fieldValues);
  const getFilieres = useStoreActions((actions) => actions.getFilieres);
  const getGroupes = useStoreActions((actions) => actions.getGroupes);
  const putStagiaire = useStoreActions((actions) => actions.putStagiaire);
  const filieres = useStoreState((state) => state.filieres);
  const groupes = useStoreState((state) => state.groupes);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [messageVisible, setMessageVisible] = useState(false);
  const [changeStatue, setChangeStatue] = useState(false);
  const [statusColor, setStatusColor] = useState("green");
  const minDate = new Date();
  const maxDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 30);
  maxDate.setFullYear(maxDate.getFullYear() - 17);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [newStagiaire, setNewStagiaire] = useState({
    firstName: fieldValues.firstName,
    lastName: fieldValues.lastName,
    phone: fieldValues.phone,
    filiereId:
      fieldValues.groupId && groupes.length > 0
        ? groupes.find((x) => x.groupId === fieldValues.groupId).filiereId
        : null,
    anneScolaire: fieldValues.anneScolaire,
    groupId: fieldValues.groupId && null,
    email: "",
    cin: "",
    birthDate: fieldValues.birthDate,
    address: fieldValues.address,
    nationalite: fieldValues.nationalite,
    statue: fieldValues.statue,
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
  const initDataStores = () => {
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
    if (newStagiaire.statue === "Suspended") setStatusColor("orange");
    if (newStagiaire.statue === "Banned") setStatusColor("red");
    if (newStagiaire.statue === "Active") setStatusColor("green");
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
      stagiaireId: fieldValues.stagiaireId,
      firstName: values.txt_Prenom,
      lastName: values.txt_Nom,
      phone: values.txt_Phone,
      anneScolaire: newStagiaire.anneScolaire,
      groupId: newStagiaire.groupId,
      email: values.txt_Email,
      cin: values.txt_CIN,
      birthDate: newStagiaire.birthDate,
      address: newStagiaire.address,
      nationalite: "Maroccain",
      statue: newStagiaire.statue,
    };
    const res = await putStagiaire(stgObj);
    if (res) {
      handleClick();
      cancelOp();
    } else setMessageVisible(true);
  };
  return (
    <>
      <Formik
        initialValues={{
          txt_CIN: fieldValues.cin,
          txt_Nom: fieldValues.lastName,
          txt_Prenom: fieldValues.firstName,
          txt_Email: fieldValues.email,
          txt_Phone: fieldValues.phone,
          dateNaissance: fieldValues.birthDate,
          txt_Address: fieldValues.address,
          txt_Nationalite: fieldValues.nationalite,
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
                {changeStatue ? (
                  <div className="d-flex justify-content-between">
                    <FormControl sx={{ mb: 1, width: "200px" }}>
                      <InputLabel id="statueLabel">Filiere</InputLabel>
                      <Select
                        labelId="statueLabel"
                        id="statuePicker"
                        name="statuePicker"
                        value={newStagiaire.statue}
                        label="Statue"
                        onChange={(e) => {
                          setNewStagiaire({
                            ...newStagiaire,
                            statue: e.target.value,
                          });
                        }}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Suspended">Suspendu</MenuItem>
                        <MenuItem value="Banned">exclue</MenuItem>
                      </Select>
                    </FormControl>
                    <button
                      className="btn btn-success"
                      type="button"
                      style={{ height: "50px", borderRadius: "0px" }}
                      onClick={() => {
                        setChangeStatue(false);
                      }}
                    >
                      Save statue
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex m-3 mt-0 mb-0">
                      <h5 className="m-4 mt-0 mb-0">Statue : </h5>
                      <h5 className={statusColor}>{newStagiaire.statue}</h5>
                    </div>
                    <button
                      className="btn btn-warning mb-2"
                      type="button"
                      onClick={() => {
                        setChangeStatue(true);
                      }}
                    >
                      Change status
                    </button>
                  </div>
                )}
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
                  id="txt_Nationalite"
                  value={newStagiaire.nationalite}
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
                    <MenuItem value={null}>Choisir une filiere ...</MenuItem>
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
                      <MenuItem value={null}>Choisir un groupe ...</MenuItem>
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
                    color="warning"
                    sx={{
                      borderRadius: "0px",
                      marginRight: "20px",
                      backgroundColor: "orange",
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

export default PutStagiereForm;
