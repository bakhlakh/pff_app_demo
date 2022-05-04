import React, { useState, useEffect } from "react";
import MessageBox from "../components/MessageBox";
import "./css/GestionModules.css";
import { useStoreState, useStoreActions } from "easy-peasy";
import ModulePostNewForm from "../forms/ModulePostNewForm";
import ConfirmDelete from "../components/ConfirmDelete";
import PutModuleForm from "../forms/PutModuleForm";
import authHeader from "../services/auth-header";
import NewSide from "../components/NewSide";
import { DataGrid } from "@mui/x-data-grid";

function GestionModules() {
  const modules = useStoreState((state) => state.modules);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState({
    type: "OK",
    Message: "Filiere has been deleted",
  });
  const [currentUpdated, setCurrentUpdated] = useState({});
  const [ajouteModuleFormVisible, setAjouteModuleFormVisible] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const api = useStoreState((store) => store.api);
  const getModules = useStoreActions((actions) => actions.getModules);
  const handleDelete = (data) => {
    setConfirmDeleteVisible(true);
    setCurrentUpdated(data.row);
  };
  const handleUpdate = (data) => {
    setCurrentUpdated(data.row);
    setUpdateFormVisible(true);
  };
  const deleteModule = () => {
    api
      .delete("/api/Modules/FD/" + currentUpdated.moduleId, {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setDeleteMessage({ type: "OK", message: "Module has been deleted" });
          setMessageVisible(true);
        }
      })
      .then(() => getModules())
      .catch(() => {
        setDeleteMessage({
          type: "ERR",
          message: "Module has not been deleted",
        });
        setMessageVisible(true);
      });
    setConfirmDeleteVisible(false);
  };
  useEffect(() => {
    getModules();
  }, [getModules]);
  const muiColumns = [
    { field: "moduleId", headerName: "ID Module", width: 90 },
    {
      field: "intitule",
      headerName: "Intitule",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width:
        window.screen.width > 1000
          ? window.screen.width - 700
          : window.screen.width - 800,
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
                handleUpdate(cell);
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
      <NewSide title="Gestion des modules" />
      {messageVisible && (
        <div className="messageContainer m-5 mt-0">
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
            {updateFormVisible && (
              <PutModuleForm
                cancelOp={() => {
                  setUpdateFormVisible(false);
                }}
                handleClick={() => {
                  getModules();
                }}
                fieldValues={currentUpdated}
              />
            )}
            {ajouteModuleFormVisible && (
              <ModulePostNewForm
                cancelOp={() => {
                  setAjouteModuleFormVisible(false);
                }}
                handleClick={() => {
                  getModules();
                }}
              />
            )}
            <button
              className="btn btn-success m-4"
              type="button"
              id="btnAjouter"
              onClick={() => {
                setAjouteModuleFormVisible(true);
              }}
            >
              Ajouter Module
            </button>
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={modules}
                columns={muiColumns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                getRowId={(row) => row.moduleId}
              />
            </div>
          </div>
        </div>
        {confirmDeleteVisible && (
          <ConfirmDelete
            handleDelete={() => {
              deleteModule();
              setConfirmDeleteVisible(false);
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

export default GestionModules;
