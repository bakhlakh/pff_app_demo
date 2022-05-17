import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Grid,
  TextField,
  Button,
  Container,
  CssBaseline,
  colors,
} from "@mui/material";
import { useStoreState, useStoreActions } from "easy-peasy";
import ConfirmDelete from "../components/ConfirmDelete";
import NewSide from "../components/NewSide";

function GestionSalles() {
  const getRooms = useStoreActions((actions) => actions.getRooms);
  const rooms = useStoreState((state) => state.rooms);
  const postRoom = useStoreActions((actions) => actions.postRoom);
  const deleteRoom = useStoreActions((actions) => actions.deleteRoom);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [currentUpdated, setCurrentUpdated] = useState({});
  const [newRoom, setNewRoom] = useState({
    roomId: "",
    intitule: "",
    floorId: 0,
  });
  const handleSubmit = () => {
    if (
      rooms.filter((room) => room.roomId === parseInt(newRoom.roomId)).length >
      0
    ) {
      alert("Salle existe déjà");
      return false;
    }
    postRoom(newRoom);
    setNewRoom({
      roomId: "",
      intitule: "",
      floorId: 1,
    });
    getRooms();
  };
  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = [
    { field: "roomId", headerName: "Salle ID", width: 70 },
    { field: "intitule", headerName: "Intitule salle", width: 130 },
    { field: "floorId", headerName: "Floor", width: 60 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.orange[500],
                color: "white",
                marginRight: "10px",
              }}
              size="small"
            >
              Modifier
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.red[500],
                color: "white",
                marginRight: "10px",
              }}
              onClick={() => {
                setCurrentUpdated(params.row);
                setConfirmDeleteVisible(true);
              }}
              size="small"
            >
              Supprimer
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
        {confirmDeleteVisible && (
          <ConfirmDelete
            cancelOp={() => {
              setConfirmDeleteVisible(false);
            }}
            handleDelete={() => {
              deleteRoom(currentUpdated.roomId);
              setConfirmDeleteVisible(false);
              getRooms();
              window.location.reload();
            }}
          />
        )}
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <form
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <fieldset>
                <legend>Ajouter une salle</legend>
                <TextField
                  inputMode="numeric"
                  id="txt_idRoom"
                  label="Salle ID"
                  value={newRoom.roomId}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, roomId: e.target.value })
                  }
                  required
                  sx={{ mt: 1, mb: 1 }}
                ></TextField>
                <TextField
                  inputMode="text"
                  id="txt_Intitule"
                  label="Intitule Salle"
                  value={newRoom.intitule}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, intitule: e.target.value })
                  }
                  required
                  sx={{ mt: 1, mb: 1 }}
                ></TextField>
                <TextField
                  inputMode="numeric"
                  id="txt_roomLevel"
                  label="Etage"
                  value={newRoom.floorId}
                  required
                  onChange={(e) => {
                    setNewRoom({ ...newRoom, floorId: e.target.value });
                  }}
                  sx={{ mt: 1, mb: 1 }}
                ></TextField>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                  >
                    Ajouter salle
                  </Button>
                </div>
              </fieldset>
            </form>
          </Grid>
          <Grid item xs={8}>
            <DataGrid
              rows={rooms ? rooms : JSON.parse(rooms)}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 15, 20]}
              getRowId={(row) => row.roomId}
              autoHeight={true}
              components={{ Toolbar: GridToolbar }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default GestionSalles;
