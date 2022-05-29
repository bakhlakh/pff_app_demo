import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import "../styles/pagesStyles/GPManagement.css";
import PostStagiaireForm from "../forms/PostStagiaireForm";
import ConfirmDelete from "../components/ConfirmDelete";
import MessageBox from "../components/MessageBox";
import PutStagiereForm from "../forms/PutStagiereForm";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function STManagement() {
  const getStagiaires = useStoreActions((actions) => actions.getStagiaires);
  const deleteStagiaire = useStoreActions((actions) => actions.deleteStagiaire);
  const stagiaires = useStoreState((state) => state.stagiaires);
  const [postNewFormVisible, setPostNewFormVisible] = useState(false);
  const [currentUpdated, setCurrentUpdated] = useState();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState({
    type: "OK",
    Message: "Stagiaires has been deleted",
  });
  const [updateStagiaireFormVisible, setUpdateStagiaireFormVisible] =
    useState(false);
  useEffect(() => {
    getStagiaires();
  }, [getStagiaires]);
  const handleDeleteClick = (row) => {
    setConfirmDeleteVisible(true);
    setCurrentUpdated(row);
  };
  const handleDelete = async () => {
    const res = await deleteStagiaire(currentUpdated.stagiaireId);
    if (res) {
      setDeleteMessage({
        type: "OK",
        message: "Le stagiaire a été supprimé",
      });
      setMessageVisible(true);
    } else {
      setDeleteMessage({
        type: "ERR",
        message: "Operation Echec",
      });
      setMessageVisible(true);
    }
  };
  const setCurrentUpdatedToObject = (row) => {
    let stgObj = stagiaires.find((x) => x.stagiaireId === row.stagiaireId);
    setCurrentUpdated(stgObj);
  };
  const muiColumns = [
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
    {
      field: "groupId",
      headerName: "Groupe",
      width: 150,
      sortable: false,
      filter: true,
      operatorValue: "contains",
    },
    {
      field: "birthDate",
      headerName: "Date Naissance",
      width: 150,
      sortable: false,
      filter: true,
    },
    {
      field: "statue",
      headerName: "Statue",
      width: 150,
      sortable: false,
    },
    {
      field: "update",
      headerName: "Operations",
      width: 300,
      renderCell: (cell) => {
        return (
          <div className="modal-footer">
            <Button
              variant="contained"
              type="submit"
              sx={{
                borderRadius: "0px",
                marginRight: "20px",
                backgroundColor: "orange",
              }}
              color="warning"
              onClick={() => {
                setCurrentUpdatedToObject(cell.row);
                setUpdateStagiaireFormVisible(true);
              }}
            >
              Modifier
            </Button>
            <Button
              variant="contained"
              sx={{ borderRadius: "0px" }}
              color="error"
              onClick={() => {
                handleDeleteClick(cell.row);
              }}
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
      {messageVisible && (
        <div className="messageContainer m-5">
          <MessageBox
            type={deleteMessage.type}
            message={deleteMessage.message}
            cancelOp={() => {
              setMessageVisible(false);
            }}
          />
        </div>
      )}
      <div className="GestionModules d-grid">
        <div className="gestionModulesContent m-5">
          <div className="content">
            {updateStagiaireFormVisible && (
              <PutStagiereForm
                cancelOp={() => {
                  setUpdateStagiaireFormVisible(false);
                }}
                handleClick={() => {
                  setDeleteMessage({
                    type: "OK",
                    message: "Les informations du stagiaire ont été modifiées",
                  });
                  setMessageVisible(true);
                  getStagiaires();
                }}
                fieldValues={currentUpdated}
              />
            )}
            {postNewFormVisible && (
              <PostStagiaireForm
                cancelOp={() => {
                  setPostNewFormVisible(false);
                }}
                handleClick={() => {
                  setMessageVisible(true);
                  getStagiaires();
                }}
              />
            )}
            <div className="d-flex justify-content-end">
              <Button
                color="success"
                variant="contained"
                sx={{ borderRadius: "0px", marginBottom: "10px" }}
                onClick={() => {
                  setPostNewFormVisible(true);
                }}
              >
                Ajouter un stagiaire
              </Button>
            </div>
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={stagiaires}
                columns={muiColumns}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                getRowId={(row) => row.stagiaireId}
                components={{ Toolbar: GridToolbar }}
              />
            </div>
          </div>
        </div>
        {confirmDeleteVisible && (
          <ConfirmDelete
            handleDelete={() => {
              setConfirmDeleteVisible(false);
              handleDelete();
            }}
            cancelOp={() => {
              setConfirmDeleteVisible(false);
            }}
          />
        )}
      </div>
    </>
  );
}

export default STManagement;
