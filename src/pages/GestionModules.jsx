import React, { useState, useEffect } from "react";
import MessageBox from "../components/MessageBox";
import "./css/GestionModules.css";
import { useStoreState, useStoreActions } from "easy-peasy";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ModulePostNewForm from "../forms/ModulePostNewForm";
import ConfirmDelete from "../components/ConfirmDelete";
import PutModuleForm from "../forms/PutModuleForm";
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
  const handleDelete = (row) => {
    setConfirmDeleteVisible(true);
    setCurrentUpdated(row);
  };
  const handleUpdate = (row) => {
    setCurrentUpdated(row);
    setUpdateFormVisible(true);
  };
  const deleteModule = () => {
    api
      .delete("api/Modules/FD/" + currentUpdated.moduleId)
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
  const columns = [
    { dataField: "moduleId", text: "ID Module", filter: textFilter() },
    {
      dataField: "intitule",
      text: "Intitule module",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "description",
      text: "Description",
      filter: textFilter(),
      style: { maxWidth: "400px", overflow: "auto" },
    },
    // columns follow dataField and text structure
    {
      dataField: "update",
      text: "Update",
      formatter: (cellContent, row) => {
        return (
          <button className="btn btn-warning" onClick={() => handleUpdate(row)}>
            Update
          </button>
        );
      },
    },
    {
      dataField: "remove",
      text: "Delete",
      formatter: (cellContent, row) => {
        return (
          <button className="btn btn-danger" onClick={() => handleDelete(row)}>
            Delete
          </button>
        );
      },
    },
  ];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });
  return (
    <>
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
        <div className="gestionModulesContent">
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
            <BootstrapTable
              columns={columns}
              keyField="moduleId"
              data={modules || []}
              bordered={false}
              rowStyle={{ color: "gainsboro" }}
              headerClasses="text-secondary"
              pagination={pagination}
              filter={filterFactory()}
              filterPosition="bottom"
              classes="BTtable m-2"
              wrapperClasses="BTwrapper"
            />
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
