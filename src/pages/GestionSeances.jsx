import React, { useState, useEffect } from "react";
import Side from "../components/Side";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Grid,
  Paper,
  styled,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  CssBaseline,
} from "@mui/material";
import SeancesCalendar from "../components/SeancesCalendar";
import { useStoreActions, useStoreState } from "easy-peasy";
import PostSeance from "../forms/PostSeance";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0, 0, 0, 0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function GestionSeances() {
  const getGroupes = useStoreActions((actions) => actions.getGroupes);
  const groupes = useStoreState((state) => state.groupes);
  const getSeances = useStoreActions((actions) => actions.getSeances);
  const seances = useStoreState((state) => state.seances);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGroupe, setSelectedGroupe] = useState("");
  const [selectedSeances, setSelectedSeances] = useState([]);
  const [postFormVisible, setPostFormVisible] = useState(false);
  useEffect(() => {
    getSeances();
    getGroupes();
    handleSelectedValuesChange();
  }, []);
  const handleSelectedValuesChange = () => {
    setSelectedSeances([]);
    setSelectedSeances(
      seances.filter((seance) => {
        return (
          seance.groupe === selectedGroupe &&
          seance.date === selectedDate.toISOString().slice(0, 10)
        );
      })
    );
  };
  return (
    <>
      <Side />
      <CssBaseline />
      {postFormVisible && (
        <PostSeance
          cancelOp={() => {
            setPostFormVisible(false);
          }}
        />
      )}
      <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
        <Grid container spacing={2}>
          <Grid item>
            <Item>
              <Button
                variant="contained"
                onClick={() => {
                  setPostFormVisible(!postFormVisible);
                }}
              >
                Ajouter Seance
              </Button>
            </Item>
          </Grid>
          <Grid item xs={4} md={4}>
            <Item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  minDate={new Date()}
                  label="Date seance"
                  inputformat="yyyy/mm/dd"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    handleSelectedValuesChange();
                  }}
                  renderInput={(params) => (
                    <TextField
                      name="dateNaissance"
                      inputformat="yyyy/mm/dd"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Item>
          </Grid>
          <Grid item xs={4} md={4}>
            <Item>
              <FormControl fullWidth>
                <InputLabel id="groupIdLabel">Groupe</InputLabel>
                <Select
                  labelId="groupIdLabel"
                  id="Groupe"
                  name="Groupe"
                  label="Groupe"
                  value={selectedGroupe}
                  onChange={(e) => {
                    setSelectedGroupe(e.target.value);
                    handleSelectedValuesChange();
                  }}
                >
                  {groupes.map((item) => (
                    <MenuItem
                      key={item.groupId + "groupe"}
                      value={item.groupId}
                    >
                      {item.groupId}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <SeancesCalendar data={selectedSeances}></SeancesCalendar>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default GestionSeances;
