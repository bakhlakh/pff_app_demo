import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import "./css/GPManagement.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import PostGroupForm from "../forms/PostGroupForm";
import ConfirmDelete from "../components/ConfirmDelete";
import MessageBox from "../components/MessageBox";
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
  const handleDelete = (row) => {
    setConfirmDeleteVisible(true);
    setCurrentUpdated(row);
  };
  const deleteGroupe = () => {
    api
      .delete(
        `/api/Groupes/${currentUpdated.anneScolaire}/${currentUpdated.groupId}`
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
  const columns = [
    { dataField: "groupKey", text: "bruh", hidden: true },
    {
      dataField: "groupId",
      text: "ID Groupe",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "anneScolaire", text: "Anne scolaire", sort: true },
    {
      dataField: "filiere.nomFiliere",
      text: "Nom Filiere",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "filiereId",
      text: "ID Filiere",
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
            <BootstrapTable
              columns={columns}
              data={groupes}
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
