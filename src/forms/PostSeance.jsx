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
import "./css/PostSeance.css";

function PostSeance({ handleClick, cancelOp }) {
  const [nbchars, setnbchars] = useState(300);
  const getRooms = useStoreActions((actions) => actions.getRooms);
  const rooms = useStoreState((state) => state.rooms);
  const getModules = useStoreActions((actions) => actions.getModules);
  const modules = useStoreState((state) => state.modules);
  const getGroupes = useStoreActions((actions) => actions.getGroupes);
  const groupes = useStoreState((state) => state.groupes);
  const getFormateurs = useStoreActions((actions) => actions.getFormateurs);
  const formateurs = useStoreState((state) => state.formateurs);
  const postSeance = useStoreActions((actions) => actions.postSeance);
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
    setNewSeance({
      ...newSeance,
      anneScolaire: groupes[0].anneScolaire,
    });
  }, [groupes]);
  useEffect(() => {
    getRooms();
    getModules();
    getGroupes();
    getFormateurs();
    console.log("formateurs", formateurs);
  }, []);
  const validate = Yup.object({
    title: Yup.string().required("Le titre est obligatoire").min(3),
    dateSeance: Yup.date().required("La date est obligatoire"),
  });
  const handleSubmit = (values) => {
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
    let res = postSeance(scObj);
    if (res >= 201 && res <= 299) {
      console.log("Ok");
      cancelOp();
    } else {
      console.log("error");
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
                <Grid item xs={12}>
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
                      value={modules && newSeance.moduleId}
                      label="modules"
                      onChange={(e) => {
                        setNewSeance({
                          ...newSeance,
                          moduleId: e.target.value,
                        });
                      }}
                    >
                      {modules.map((item) => (
                        <MenuItem
                          key={item.moduleId + "module"}
                          value={item.moduleId}
                          selected={item.moduleId === newSeance.moduleId}
                        >
                          {item.intitule}
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
                      value={groupes && newSeance.groupId}
                      label="groupes"
                      required
                      onChange={(e) => {
                        setNewSeance({
                          ...newSeance,
                          groupId: e.target.value,
                        });
                      }}
                    >
                      {groupes.map((item) => (
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
                      minDate={newSeance.dateSeance}
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
                      <MenuItem value={"8"}>8:30</MenuItem>
                      <MenuItem value={"11"}>11:00</MenuItem>
                      <MenuItem value={"13"}>13:30</MenuItem>
                      <MenuItem value={"16"}>16:00</MenuItem>
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
                    <Button variant="contained" color="primary" type="submit">
                      Enregistrer
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
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
