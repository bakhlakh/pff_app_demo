import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageBox from "../components/MessageBox";
import Searchbar from "../components/Searchbar";
import "./css/GestionModules.css";
import { useStoreState, useStoreActions } from "easy-peasy";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ModulePostNewForm from "../components/ModulePostNewForm";
import ConfirmDelete from "../components/ConfirmDelete";
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
  const api = useStoreState((store) => store.api);
  const handleDelete = (row) => {
    setConfirmDeleteVisible(true);
    setCurrentUpdated(row);
  };
  const handleUpdate = (row) => {
    console.log("row", row);
  };
  const deleteModule = () => {
    api
      .delete("api/Modules/FD/" + currentUpdated.moduleId)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setDeleteMessage({ type: "OK", message: "Filiere has been deleted" });
          setMessageVisible(true);
        }
      })
      .then(() => getModules())
      .catch(() => {
        setDeleteMessage({
          type: "ERR",
          message: "Filiere has not been deleted",
        });
        setMessageVisible(true);
      });
    setConfirmDeleteVisible(false);
  };
  const getModules = useStoreActions((actions) => actions.getModules);
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
    { dataField: "description", text: "Description", filter: textFilter() },
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
            <div className="recherche d-flex justify-content-between">
              <button
                className="btn btn-success"
                type="button"
                id="btnAjouter"
                onClick={() => {
                  setAjouteModuleFormVisible(true);
                }}
              >
                Ajouter Module
              </button>
            </div>
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
            />
          </div>
        </div>
        {confirmDeleteVisible ? (
          <ConfirmDelete
            handleDelete={() => {
              deleteModule();
              setConfirmDeleteVisible(false);
            }}
            cancelOp={() => {
              setConfirmDeleteVisible(false);
            }}
          />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default GestionModules;
