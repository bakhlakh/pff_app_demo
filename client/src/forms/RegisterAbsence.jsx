import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useStoreActions } from "easy-peasy";
import "../styles/formsStyles/absence.css";
import { Button } from "@mui/material";

function RegisterAbsence(props) {
  const [selectedRow, setSelectedRow] = useState([]);
  const [stagiaires, setStagiaires] = useState([]);
  const postAbsences = useStoreActions((actions) => actions.postAbsences);
  const getAbsences = useStoreActions((actions) => actions.getAbsences);
  const columns = [
    {
      field: "cin",
      headerName: "CIN",
      width: 150,
    },
    {
      field: "NomComplet",
      headerName: "Nom Complet",
      width: 200,
      sortable: false,
      filter: true,
      operatorValue: "contains",
      valueGetter: (params) => {
        return `${params.row.firstName} ${params.row.lastName}`;
      },
    },
  ];
  const getStagiairesByGroup = useStoreActions(
    (actions) => actions.getStagiairesByGroup
  );

  const getData = async () => {
    const resStagiaires = await getStagiairesByGroup(props.groupId);
    const resAbsences = await getAbsences(props.seanceId);
    setStagiaires(resStagiaires);
    setSelectedRow(resAbsences);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = async () => {
    await postAbsences({
      seanceId: props.seanceId,
      stagiaires: selectedRow,
    });
    props.cancelOp();
  };
  return (
    <div id="myModal" className="modal">
      <div className="absenceFormContainer">
        <DataGrid
          columns={columns}
          rows={stagiaires}
          getRowId={(row) => row.stagiaireId}
          selectionModel={selectedRow}
          rowHeightMode="fixed"
          checkboxSelection={true}
          onSelectionModelChange={(newSelection) => {
            setSelectedRow(newSelection);
          }}
        />
        <div className="modal-footer" style={{ backgroundColor: "white" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "0px",
              marginRight: "20px",
              backgroundColor: "orange",
            }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Enregistrer
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: "0px", backgroundColor: "gray" }}
            onClick={() => {
              props.cancelOp();
            }}
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterAbsence;
