import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import "../styles/pagesStyles/GPManagement.css";
import PostGroupForm from "../forms/PostGroupForm";
import ConfirmDelete from "../components/ConfirmDelete";
import MessageBox from "../components/MessageBox";
import authHeader from "../services/auth-header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function GPManagement() {
  const groupes = useStoreState((state) => state.groupes);
  console.log("groupes", groupes);
  const api = useStoreState((state) => state.api);
  const getGroupes = useStoreActions((actions) => actions.getGroupes);
  const [postNewFormVisible, setPostNewFormVisible] = useState(false);
  const [currentUpdated, setCurrentUpdated] = useState();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState({
    type: "OK",
    Message: "Groupe has been deleted",
  });
  useEffect(() => {
    getGroupes();
  }, [getGroupes]);
  const handleDelete = (data) => {
    setConfirmDeleteVisible(true);
    setCurrentUpdated(data.row);
  };
  const deleteGroupe = () => {
    api
      .delete(
        `/api/Groupes/${currentUpdated.anneScolaire}/${currentUpdated.groupId}`,
        { headers: authHeader() }
      )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setDeleteMessage({ type: "OK", message: "Groupe has been deleted" });
          setMessageVisible(true);
        }
      })
      .then(() => getGroupes())
      .catch(() => {
        setDeleteMessage({
          type: "ERR",
          message: "Groupe has not been deleted",
        });
        setMessageVisible(true);
      });
  };
  groupes.forEach((element) => {
    element.groupKey = element.groupId + element.anneScolaire + element.niveau;
  });
  const muiColumns = [
    { field: "groupId", headerName: "ID Groupe", width: 90 },
    {
      field: "anneScolaire",
      headerName: "Anne Scolaire",
      width: 150,
    },
    {
      field: "",
      headerName: "Nom filiere",
      width: 400,
      renderCell: (cell) => {
        return cell.row.filiere.nomFiliere;
      },
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
              onClick={() => {}}
            >
              Modifier
            </Button>
            <Button
              variant="contained"
              sx={{ borderRadius: "0px" }}
              color="error"
              onClick={() => {
                handleDelete(cell);
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
        <div className="gestionModulesContent m-5 ">
          <div className="content">
            {postNewFormVisible && (
              <PostGroupForm
                cancelOp={() => {
                  setPostNewFormVisible(false);
                }}
                handleClick={() => {
                  setDeleteMessage({
                    type: "OK",
                    message: "Groupe has been Added",
                  });
                  setMessageVisible(true);
                  getGroupes();
                }}
              />
            )}
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success"
                onClick={() => {
                  setPostNewFormVisible(true);
                }}
              >
                Ajouter un groupe
              </button>
            </div>
            <div style={{ height: 800, width: "100%" }}>
              <DataGrid
                rows={groupes}
                columns={muiColumns}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                getRowId={(row) => row.groupId}
                components={{ Toolbar: GridToolbar }}
              />
            </div>
          </div>
        </div>
        {confirmDeleteVisible && (
          <ConfirmDelete
            handleDelete={() => {
              deleteGroupe();
              setConfirmDeleteVisible(false);
              getGroupes();
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

export default GPManagement;
