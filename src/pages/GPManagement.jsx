import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import "./css/GPManagement.css";
import PostGroupForm from "../forms/PostGroupForm";
import ConfirmDelete from "../components/ConfirmDelete";
import MessageBox from "../components/MessageBox";
import authHeader from "../services/auth-header";
import NewSide from "../components/NewSide";
import { DataGrid } from "@mui/x-data-grid";

function GPManagement() {
  const groupes = useStoreState((state) => state.groupes);
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
          <div className="btn-group">
            <button
              className="btn btn-warning"
              onClick={() => {
                console.log(cell);
              }}
            >
              Update
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(cell);
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
      <NewSide title="Gestion des groupes" />
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
