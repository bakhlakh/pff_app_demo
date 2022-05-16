import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Formik, Form, ErrorMessage } from "formik";
import { FieldComp } from "../components/FieldComp";
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

function PostSeance({ handleClick, cancelOp }) {
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
  const postSeance = useStoreActions((actions) => actions.postSeance);
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const availableStartTime = useStoreState((state) => state.availableStartTime);
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
  });
  useEffect(() => {
    if (filteredGroupes.length > 0) {
      setNewSeance({
        ...newSeance,
        anneScolaire: filteredGroupes[0].anneScolaire,
      });
    }
  }, [filteredGroupes]);
  useEffect(() => {
    getFilieres();
    getRooms();
    getFormateurs();
    getFiliereModules("TDI");
    getFiliereGroupes("TDI");
  }, []);
  useEffect(() => {
    handleDateGroupeChange();
  }, [newSeance]);
  const validate = Yup.object({
    title: Yup.string().required("Le titre est obligatoire").min(3),
    dateSeance: Yup.date().required("La date est obligatoire"),
  });
  const handleSubmit = async (values) => {
    const scObj = {
      title: values.title,
      roomId: newSeance.roomId,
      moduleId: newSeance.moduleId,
      objectives: newSeance.objectives,
      dateSeance: newSeance.dateSeance,
      startTime: newSeance.startTime,
      formateurId: newSeance.formateurId,
      commentaires: newSeance.commentaires,
      groupId: newSeance.groupId,
      anneScolaire: newSeance.anneScolaire,
    };
    let res = await postSeance(scObj);
    if (res?.seanceId) {
      cancelOp();
    } else {
      console.log("error");
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
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="filieres">Filiere</InputLabel>
                    <Select
                      labelId="filieres"
                      name="filiereId"
                      required
                      value={filieres ? selectedFiliere : null}
                      label="Filieres"
                      onChange={(e) => {
                        setSelectedFiliere(e.target.value);
                        getFiliereModules(e.target.value);
                        getFiliereGroupes(e.target.value);
                        setNewSeance({
                          ...newSeance,
                          moduleId: "",
                          groupId: "",
                        });
                      }}
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
                  <FieldComp
                    type="text"
                    name="title"
                    id="txt_Title"
                    label="Titre"
                    required
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
                    />
                    <ErrorMessage
                      name="dateSeance"
                      className="error"
                      component="div"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}></Grid>
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
                    >
                      {availableStartTime.map((item) => (
                        <MenuItem key={item + "heure"} value={item}>
                          {item}
                        </MenuItem>
                      ))}
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
                    inputProps={{ maxLength: 300 }}
                    helperText={nbchars + " characters restants, 300 max"}
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
                <Grid item xs={12}>
                  <div className="modal-footer">
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      sx={{
                        borderRadius: "0px",
                        marginRight: "20px",
                      }}
                    >
                      Enregistrer
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ borderRadius: "0px", backgroundColor: "gray" }}
                      onClick={() => {
                        cancelOp();
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default PostSeance;
