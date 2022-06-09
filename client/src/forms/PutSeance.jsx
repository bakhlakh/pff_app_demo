import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CssBaseline,
} from "@mui/material";
import "../styles/formsStyles/PostSeance.css";
import RegisterAbsence from "./RegisterAbsence";

function PutSeance({ handleClick, cancelOp, updatedSeance, handleUpdate }) {
  const [nbchars, setnbchars] = useState(300);
  const getRooms = useStoreActions((actions) => actions.getRooms);
  const rooms = useStoreState((state) => state.rooms);
  const filteredModules = useStoreState((state) => state.filteredModules);
  const getFiliereModules = useStoreActions(
    (actions) => actions.getFiliereModules
  );
  const getFiliereGroupes = useStoreActions(
    (actions) => actions.getFiliereGroupes
  );
  const filteredGroupes = useStoreState((state) => state.filteredGroupes);
  const getFormateurs = useStoreActions((actions) => actions.getFormateurs);
  const formateurs = useStoreState((state) => state.formateurs);
  const getFilieres = useStoreActions((actions) => actions.getFilieres);
  const filieres = useStoreState((state) => state.filieres);
  const putSeance = useStoreActions((actions) => actions.putSeance);
  const availableStartTime = useStoreState((state) => state.availableStartTime);
  const deleteSeance = useStoreActions((actions) => actions.deleteSeance);

  console.log(updatedSeance);
  const getAvailableStartTime = useStoreActions(
    (actions) => actions.getAvailableStartTime
  );
  const [newSeance, setNewSeance] = useState({
    title: "",
    roomId: "",
    moduleId: "",
    objectives: "",
    dateSeance: new Date(),
    startTime: "",
    formateurId: "",
    commentaires: "",
    groupId: "",
    anneScolaire: "",
    filiereId: "",
    typeSeance: "",
  });
  const dockValues = () => {
    setNewSeance({
      title: updatedSeance.title,
      roomId: updatedSeance.room.roomId,
      moduleId: updatedSeance.moduleId,
      objectives: updatedSeance.objectives,
      dateSeance: updatedSeance.dateSeance,
      startTime: updatedSeance.startTime,
      formateurId: updatedSeance.formateur.formateurId,
      commentaires: updatedSeance.commentaires,
      groupId: updatedSeance.groupId,
      anneScolaire: updatedSeance.anneScolaire,
      filiereId: updatedSeance.groupe.filiereId,
      typeSeance: updatedSeance.typeSeance,
    });
  };
  useEffect(() => {
    if (filteredGroupes.length > 0) {
      setNewSeance({
        ...newSeance,
        anneScolaire: filteredGroupes[0].anneScolaire,
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredGroupes]);
  useEffect(() => {
    getFilieres();
    getRooms();
    getFormateurs();
    if (newSeance.filiereId !== "") {
      getFiliereModules(newSeance.filiereId);
      getFiliereGroupes(newSeance.filiereId);
    } else {
      getFiliereModules(updatedSeance.groupe.filiereId);
      getFiliereGroupes(updatedSeance.groupe.filiereId);
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (
      filieres.length > 0 &&
      filteredGroupes.length > 0 &&
      rooms.length > 0 &&
      formateurs.length > 0 &&
      newSeance.filiereId === ""
    ) {
      dockValues();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filieres, filteredGroupes, rooms, formateurs]);
  useEffect(() => {
    handleDateGroupeChange();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSeance]);
  const validate = Yup.object({
    title: Yup.string().min(3),
    dateSeance: Yup.date().required("La date est obligatoire"),
  });
  const handleSubmit = async () => {
    let date = new Date(newSeance.dateSeance);
    const scObj = {
      seanceId: updatedSeance.seanceId,
      title: newSeance.title,
      roomId: newSeance.roomId,
      moduleId: newSeance.moduleId,
      objectives: newSeance.objectives,
      dateSeance: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      startTime: newSeance.startTime,
      formateurId: newSeance.formateurId,
      commentaires: newSeance.commentaires,
      groupId: newSeance.groupId,
      anneScolaire: newSeance.anneScolaire,
      typeSeance: newSeance.typeSeance,
    };
    let res = await putSeance(scObj);
    if (res?.seanceId) {
      handleUpdate();
      cancelOp();
    } else {
      //catch error
    }
  };
  const handleDateGroupeChange = () => {
    if (newSeance.groupId !== "" && newSeance.dateSeance !== "") {
      getAvailableStartTime({
        dateSeance: newSeance.dateSeance,
        groupId: newSeance.groupId,
      });
    }
  };
  const [listeVisible, setListeVisible] = useState(false);

  return (
    <>
      <Formik
        initialValues={newSeance}
        validationSchema={validate}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form>
          <div className="myFormContainer">
            <div className="formContent">
              <CssBaseline />
              <Grid container spacing={3}>
                <Grid item xs={12} flexDirection="end">
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ borderRadius: "0px" }}
                    onClick={() => {
                      deleteSeance(updatedSeance.seanceId);
                      handleUpdate();
                      cancelOp();
                    }}
                  >
                    SUPPRIMER
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="filieres">Filiere</InputLabel>
                    <Select
                      labelId="filieres"
                      name="filiereId"
                      required
                      value={newSeance.filiereId}
                      label="Filieres"
                      onChange={(e) => {
                        setNewSeance({
                          ...newSeance,
                          filiereId: e.target.value,
                          moduleId: "",
                          groupId: "",
                        });
                        getFiliereModules(e.target.value);
                        getFiliereGroupes(e.target.value);
                      }}
                      disabled={new Date() > new Date(newSeance.dateSeance)}
                    >
                      {filieres.map((item) => (
                        <MenuItem
                          key={item.filiereId + "filiere"}
                          value={item.filiereId}
                          selected={item.filiereId === newSeance.filiereId}
                        >
                          {item.filiereId}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    name="title"
                    id="title"
                    label="Titre"
                    required
                    fullWidth
                    value={newSeance.title}
                    onChange={(e) => {
                      setNewSeance({
                        ...newSeance,
                        title: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="rooms">Salle</InputLabel>
                    <Select
                      labelId="rooms"
                      name="roomId"
                      required
                      value={rooms && newSeance.roomId}
                      label="Salles"
                      onChange={(e) => {
                        setNewSeance({ ...newSeance, roomId: e.target.value });
                      }}
                      disabled={new Date() > new Date(newSeance.dateSeance)}
                    >
                      {rooms.map((item) => (
                        <MenuItem
                          key={item.roomId + "room"}
                          value={item.roomId}
                          selected={item.roomId === newSeance.roomId}
                        >
                          {item.intitule}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="modules">Module</InputLabel>
                    <Select
                      labelId="modules"
                      id="modules"
                      required
                      name="moduleId"
                      value={filteredModules && newSeance.moduleId}
                      label="modules"
                      onChange={(e) => {
                        setNewSeance({
                          ...newSeance,
                          moduleId: e.target.value,
                        });
                      }}
                      disabled={new Date() > new Date(newSeance.dateSeance)}
                    >
                      {filteredModules.map((item) => (
                        <MenuItem
                          key={item.module.moduleId + "module"}
                          value={item.module.moduleId}
                          selected={item.module.moduleId === newSeance.moduleId}
                        >
                          {item.module.intitule}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="groupes">Groupe</InputLabel>
                    <Select
                      labelId="groupes"
                      id="groupes"
                      name="groupId"
                      value={filteredGroupes && newSeance.groupId}
                      label="groupes"
                      required
                      onChange={(e) => {
                        setNewSeance({
                          ...newSeance,
                          groupId: e.target.value,
                        });
                      }}
                      disabled={new Date() > new Date(newSeance.dateSeance)}
                    >
                      {filteredGroupes.map((item) => (
                        <MenuItem
                          key={item.groupId + "groupe"}
                          value={item.groupId}
                          selected={item.groupId === newSeance.groupId}
                        >
                          {item.groupId}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      minDate={new Date()}
                      label="Date Seance"
                      inputformat="yyyy/mm/dd"
                      required
                      value={newSeance.dateSeance}
                      onChange={(e) => {
                        setNewSeance({ ...newSeance, dateSeance: e });
                      }}
                      renderInput={(params) => (
                        <TextField
                          name="dateSeance"
                          inputformat="yyyy/mm/dd"
                          {...params}
                        />
                      )}
                      disabled={new Date() > new Date(newSeance.dateSeance)}
                    />
                    <ErrorMessage
                      name="dateSeance"
                      className="error"
                      component="div"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="TF">Type Seance</InputLabel>
                    <Select
                      labelId="TF"
                      id="typeSeance"
                      name="typeSeance"
                      label="Type Seance"
                      required
                      value={newSeance.typeSeance}
                      onChange={(e) => {
                        setNewSeance({
                          ...newSeance,
                          typeSeance: e.target.value,
                        });
                      }}
                      disabled={new Date() > new Date(newSeance.dateSeance)}
                    >
                      <MenuItem value="Presentiel">Presentiel</MenuItem>

                      <MenuItem value="Distance">A Distance</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="Heure">Heure</InputLabel>
                    <Select
                      labelId="Heure"
                      id="Heure"
                      name="startTime"
                      label="Heure"
                      required
                      value={newSeance.startTime}
                      onChange={(e) => {
                        setNewSeance({
                          ...newSeance,
                          startTime: e.target.value,
                        });
                      }}
                      disabled={new Date() > new Date(newSeance.dateSeance)}
                    >
                      {availableStartTime.map((item) => (
                        <MenuItem key={item + "heure"} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                      <MenuItem value={newSeance.startTime}>
                        {newSeance.startTime}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="objectives"
                    label="Objectives"
                    multiline
                    maxRows={7}
                    fullWidth
                    value={newSeance.objectives}
                    inputProps={{ maxLength: 300 }}
                    helperText={nbchars + " characters restants, 300 max"}
                    disabled={new Date() > new Date(newSeance.dateSeance)}
                    onChange={(e) => {
                      setNewSeance({
                        ...newSeance,
                        objectives: e.target.value,
                      });
                      setnbchars(300 - e.target.value.length);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="formateurs">Formateur</InputLabel>
                    <Select
                      labelId="formateurs"
                      id="formateurs"
                      name="formateurId"
                      value={formateurs && newSeance.formateurId}
                      label="Formateurs"
                      required
                      onChange={(e) => {
                        setNewSeance({
                          ...newSeance,
                          formateurId: e.target.value,
                        });
                      }}
                      disabled={new Date() > new Date(newSeance.dateSeance)}
                    >
                      {formateurs.map((item) => (
                        <MenuItem
                          key={item.formateurId + "formateur"}
                          value={item.formateurId}
                        >
                          {item.firstName + " " + item.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="commentaires"
                    name="commentaires"
                    label="Commentaires"
                    value={newSeance.commentaires}
                    inputProps={{ maxLength: 300 }}
                    fullWidth
                    multiline
                    maxRows={10}
                    helperText="Commentaires sur la séance"
                    onChange={(e) => {
                      setNewSeance({
                        ...newSeance,
                        commentaires: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "0px",
                      marginRight: "20px",
                      backgroundColor: "blue",
                    }}
                    onClick={() => {
                      setListeVisible(true);
                    }}
                  >
                    Liste des absences
                  </Button>
                </Grid>
                <Grid item xs={8}>
                  <div className="modal-footer">
                    <Button
                      variant="contained"
                      type="submit"
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
                      onClick={() => {
                        cancelOp();
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  {listeVisible && (
                    <RegisterAbsence
                      groupId={newSeance.groupId}
                      seanceId={updatedSeance.seanceId}
                      cancelOp={() => {
                        setListeVisible(false);
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default PutSeance;
