import React, { useEffect } from "react";
import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import "./css/moduleForm.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { TextField } from "@mui/material";
function PostGroupForm({ handleClick, cancelOp }) {
  const api = useStoreState((store) => store.api);
  const getFilieres = useStoreActions((actions) => actions.getFilieres);
  const groupes = useStoreState((state) => state.groupes);
  const [filiereId, setFiliereId] = useState("TDI");
  const [niveau, setNiveau] = useState(1);
  const [groupId, setGroupId] = useState("");
  var newId;
  const anneScolaire =
    new Date().getMonth() < 8
      ? `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`
      : `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
  function idExists(id) {
    let exists = false;
    groupes.forEach((element) => {
      if (element.groupId === id) {
        exists = true;
      }
    });
    return exists;
  }
  const handleSubmit = () => {
    api
      .post("/api/Groupes", {
        anneScolaire: anneScolaire,
        groupId: groupId,
        filiereId: filiereId,
        niveau: niveau,
      })
      .then((e) => {
        handleClick(e.status);
      });
  };
  const generateGroupId = () => {
    if (filiereId !== "") {
      for (let i = 1; i < 99; i++) {
        newId = `${filiereId}${niveau}${i < 9 ? "0" + i : i}`;
        if (!idExists(newId)) break;
      }
    }
    setGroupId(newId);
  };
  useEffect(() => {
    generateGroupId();
  });
  useEffect(() => {
    getFilieres();
    //eslint-disable-next-line
  }, []);
  const filieres = useStoreState((store) => store.filieres);
  return (
    <>
      <div id="myModal" className="modal" style={{ display: "block" }}>
        <div className="modal-content">
          <div id="modalContainer">
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="Filiere">Filiere</InputLabel>
              <Select
                labelId="Filiere"
                value={filiereId}
                label=" Niveau Diplome"
                onChange={(e) => {
                  setFiliereId(e.target.value);
                }}
              >
                {filieres.map((item) => (
                  <MenuItem key={item.filiereId} value={item.filiereId}>
                    {item.nomFiliere}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mb: 2, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="GroupId">Group ID</InputLabel>
              <OutlinedInput
                type="text"
                name="GroupId"
                disabled
                value={groupId}
              />
            </FormControl>
            <FormControl sx={{ mb: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="AnneScolaire">Anne Scolaire</InputLabel>
              <OutlinedInput
                type="text"
                name="AnneScolaire"
                disabled
                value={anneScolaire}
              />
            </FormControl>
            <InputLabel>Niveau</InputLabel>
            <input
              type="number"
              className="form-control mt-2"
              min={1}
              max={3}
              defaultValue={1}
              onChange={(e) => {
                setNiveau(e.target.value);
              }}
            />
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
                onClick={() => {
                  handleSubmit();
                }}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostGroupForm;
