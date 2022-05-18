import { Button } from "@mui/material";
import React from "react";
import "../styles/componentStyles/confirmDelete.css";
function ConfirmDelete({ handleDelete, cancelOp }) {
  return (
    <div id="myModal" className="modal">
      <div className="deleteBoxContent">
        <div className="">
          <h5 style={{ color: "black" }}>
            Êtes-vous sûr de vouloir supprimer cet élément ?
          </h5>
          <h6 style={{ color: "red" }}>
            Toutes les données associées seront perdues
          </h6>
          <div className="modal-footer">
            <Button
              variant="contained"
              type="submit"
              sx={{
                borderRadius: "0px",
                marginRight: "20px",
                backgroundColor: "Red",
              }}
              onClick={handleDelete}
            >
              Supprimer
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
  );
}

export default ConfirmDelete;
