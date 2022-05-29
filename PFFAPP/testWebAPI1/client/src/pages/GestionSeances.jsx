import React, { useState, useEffect, useRef } from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import WKSCalendar from "../components/WKSCalendar";
import { useReactToPrint } from "react-to-print";
import {
  Grid,
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
import PrintEmploiForAll from "../components/PrintEmploiForAll";

const testDate = (selectedDate, date) => {
  if (
    selectedDate.getFullYear() === date.getFullYear() &&
    selectedDate.getMonth() === date.getMonth() &&
    selectedDate.getDate() === date.getDate()
  ) {
    return true;
  } else return false;
};
function GestionSeances() {
  const WKSRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => WKSRef.current,
  });
  const getGroupes = useStoreActions((actions) => actions.getGroupes);
  const groupes = useStoreState((state) => state.groupes);
  const getSeances = useStoreActions((actions) => actions.getSeances);
  const seances = useStoreState((state) => state.seances);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGroupe, setSelectedGroupe] = useState("");
  const [selectedSeances, setSelectedSeances] = useState([]);
  const [postFormVisible, setPostFormVisible] = useState(false);
  const [printFormVisible, setPrintFormVisible] = useState(false);
  const [calType, setCalType] = useState("WKS");
  const weekSeances = useStoreState((state) => state.weekSeances);
  const getWeekSeances = useStoreActions((actions) => actions.getWeekSeances);
  useEffect(() => {
    getSeances();
    getGroupes();
    handleSelectedValuesChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedGroupe, postFormVisible]);
  const handleSelectedValuesChange = async () => {
    if (calType === "WKS") {
      getWeekSeances({ selectedDate, selectedGroupe });
    } else {
      await getSeances();
      if (seances.length) {
        setSelectedSeances([]);
        setSelectedSeances(
          seances.filter((seance) => {
            return (
              seance.groupId === selectedGroupe &&
              testDate(new Date(selectedDate), new Date(seance.dateSeance))
            );
          })
        );
      }
    }
  };
  const handlePrintAll = () => {
    setPrintFormVisible(true);
  };
  return (
    <>
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
          <Grid item xs={2}>
            <Button
              color="warning"
              type="button"
              variant="outlined"
              onClick={() => {
                setPostFormVisible(!postFormVisible);
              }}
            >
              Ajouter Seance
            </Button>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date seance"
                inputformat="yyyy/mm/dd"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e);
                  handleSelectedValuesChange();
                }}
                renderInput={(params) => (
                  <TextField
                    name="dateSeance"
                    inputformat="yyyy/mm/dd"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
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
                  <MenuItem key={item.groupId + "groupe"} value={item.groupId}>
                    {item.groupId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setCalType(calType === "WKS" ? "JOUR" : "WKS");
              }}
            >
              {calType === "WKS" ? "Voir par jour" : "Voir par semaine"}
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button color="success" variant="outlined" onClick={handlePrint}>
              Imprimer
            </Button>
            <Button color="success" variant="outlined" onClick={handlePrintAll}>
              Imprimer pour tous les groupes
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: "100px" }}>
            {calType === "WKS" ? (
              <WKSCalendar
                data={weekSeances}
                handleSeanceUpdated={async () => {
                  await getSeances();
                  await getGroupes();
                  handleSelectedValuesChange();
                }}
                ref={WKSRef}
              />
            ) : (
              <SeancesCalendar data={selectedSeances}></SeancesCalendar>
            )}
          </Grid>
        </Grid>
      </Container>
      {printFormVisible && (
        <PrintEmploiForAll
          handleDelete={() => {
            setPrintFormVisible(false);
          }}
          cancelOp={() => {
            setPrintFormVisible(false);
          }}
          date={selectedDate}
        />
      )}
    </>
  );
}

export default GestionSeances;
