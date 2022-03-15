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
function GestionModules() {
  const modules = useStoreState((state) => state.modules);
  const [messageVisible, setMessageVisible] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState({
    type: "OK",
    Message: "Filiere has been deleted",
  });
  const [ajouteModuleFormVisible, setAjouteModuleFormVisible] = useState(false);
  const handleDelete = (row) => {
    console.log("first", row);
  };
  const handleUpdate = (row) => {
    console.log("row", row);
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
    onPageChange: (page, sizePerPage) => {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: (page, sizePerPage) => {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });
  return (
    <div className="GestionModules d-grid">
      <div className="gestionModulesContent">
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
        <div className="content">
          {ajouteModuleFormVisible && (
            <ModulePostNewForm
              cancelOp={() => {
                setAjouteModuleFormVisible(false);
              }}
            />
          )}
          <div className="recherche d-flex justify-content-between">
            <Searchbar searchItem="Module" handleChange={(str) => {}} />
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
    </div>
  );
}

export default GestionModules;
