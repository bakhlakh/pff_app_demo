import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import "../styles/pagesStyles/GPManagement.css";
import PostStagiaireForm from "../forms/PostStagiaireForm";
import ConfirmDelete from "../components/ConfirmDelete";
import MessageBox from "../components/MessageBox";
import PutStagiereForm from "../forms/PutStagiereForm";
import authHeader from "../services/auth-header";
import NewSide from "../components/NewSide";
import { DataGrid } from "@mui/x-data-grid";

function STManagement() {
  const getStagiaires = useStoreActions((actions) => actions.getStagiaires);
  const stagiaires = useStoreState((state) => state.stagiaires);
  const api = useStoreState((state) => state.api);
  const [postNewFormVisible, setPostNewFormVisible] = useState(false);
  const [currentUpdated, setCurrentUpdated] = useState();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState({
    type: "OK",
    Message: "Stagiaire has been deleted",
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
  const handleDelete = () => {
    api
      .delete(`/api/Stagiaires/${currentUpdated.stagiaireId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setDeleteMessage({
            type: "OK",
            message: "Stagiaire has been deleted",
          });
          setMessageVisible(true);
        }
      })
      .then(() => getStagiaires())
      .catch(() => {
        setDeleteMessage({
          type: "ERR",
          message: "Stagiaire has not been deleted",
        });
        setMessageVisible(true);
      });
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
          <div className="btn-group">
            <button
              className="btn btn-warning"
              onClick={() => {
                setCurrentUpdatedToObject(cell.row);
                setUpdateStagiaireFormVisible(true);
              }}
            >
              Update
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDeleteClick(cell.row);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <NewSide title="Gestion des stagieres" />
      {messageVisible && (
        <div className="messageContainer m-5">
          <MessageBox
            type={deleteMessage.type}
            message={deleteMessage.message}
            cancelOp={() => {
              setMessageVisible(false);
              console.log("bruh", messageVisible);
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
              <button
                className="btn btn-success mb-2"
                onClick={() => {
                  setPostNewFormVisible(true);
                }}
              >
                Ajouter un stagiaire
              </button>
            </div>
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={stagiaires}
                columns={muiColumns}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                getRowId={(row) => row.stagiaireId}
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
              handleDelete();
              setConfirmDeleteVisible(false);
            }}
          />
        )}
      </div>
    </>
  );
}

export default STManagement;
