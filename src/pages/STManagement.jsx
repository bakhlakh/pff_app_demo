import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import "./css/GPManagement.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import PostStagiaireForm from "../components/PostStagiaireForm";
import ConfirmDelete from "../components/ConfirmDelete";
import MessageBox from "../components/MessageBox";
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
  useEffect(() => {
    getStagiaires();
    console.log("stagiaires", stagiaires);
  }, [getStagiaires]);
  const handleDelete = (row) => {
    setConfirmDeleteVisible(true);
    setCurrentUpdated(row);
  };
  const columns = [
    {
      dataField: "stagiaireId",
      text: "ID Stagiaire",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "firstName",
      text: "Prenom",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "lastName", text: "Nom", sort: true, filter: textFilter() },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "cin",
      text: "CIN",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "birthDate",
      text: "Date Naissance",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "Operations",
      text: "Operations",
      formatter: (cellContent, row) => {
        return (
          <div className="d-flex">
            <button
              className="btn btn-danger m-1"
              onClick={() => handleDelete(row)}
            >
              Delete
            </button>
            <button className="btn btn-primary m-1">stagiaires</button>
          </div>
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
                className="btn btn-success"
                onClick={() => {
                  setPostNewFormVisible(true);
                }}
              >
                Ajouter un stagiaire
              </button>
            </div>
            <BootstrapTable
              columns={columns}
              data={stagiaires}
              keyField="groupKey"
              bordered={false}
              rowStyle={{ color: "gainsboro" }}
              headerClasses="text-white bg-dark"
              filterPosition="bottom"
              classes="BTtable m-2"
              wrapperClasses="BTwrapper"
              pagination={pagination}
              filter={filterFactory()}
            />
          </div>
        </div>
        {confirmDeleteVisible && (
          <ConfirmDelete
            handleDelete={() => {
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

export default STManagement;
