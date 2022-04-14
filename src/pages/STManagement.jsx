import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import "./css/GPManagement.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import PostStagiaireForm from "../forms/PostStagiaireForm";
import ConfirmDelete from "../components/ConfirmDelete";
import MessageBox from "../components/MessageBox";
import PutStagiereForm from "../forms/PutStagiereForm";
import Side from "../components/Side";
import authHeader from "../services/auth-header";

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
  const columns = [
    {
      dataField: "stagiaireId",
      text: "ID Stagiaire",
      hidden: true,
    },
    {
      dataField: "cin",
      text: "CIN",
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
      dataField: "groupId",
      text: "Groupe",
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
      dataField: "statue",
      text: "Statue",
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
              className="btn btn-warning m-1"
              onClick={() => {
                setCurrentUpdatedToObject(row);
                setUpdateStagiaireFormVisible(true);
              }}
            >
              Update
            </button>
            <button
              className="btn btn-danger m-1"
              onClick={() => handleDeleteClick(row)}
            >
              Delete
            </button>
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
      <Side />
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
              keyField="stagiaireId"
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
