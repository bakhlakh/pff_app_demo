import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../styles/pagesStyles/GestionFilieres.css";
import axios from "axios";
import FilierePostNewForm from "../forms/FilierePostNewForm";
import FilierePutForm from "../forms/FilierePutForm";
import GMF from "../forms/GMF";
import ConfirmDelete from "../components/ConfirmDelete";
import MessageBox from "../components/MessageBox";
import authHeader from "../services/auth-header";
import NewSide from "../components/NewSide";
import TextField from "@mui/material/TextField";
import { useStoreActions } from "easy-peasy";
import FiliereCard from "../components/FiliereCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//AXIOS SETUP
const api = axios.create({ baseURL: "https://localhost:7161/" });
////----------------------------------------------------------------////
function GestionFilieres() {
  //INIT STATES
  const [filieres, setFileres] = useState([]);
  const [newFormVisible, setNewFormVisible] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [modulesFormVisible, setModulesFormVisible] = useState(false);
  const [currentUpdated, setCurrentUpdated] = useState();
  const [filteredFilieres, setFilteredFilieres] = useState([]);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const deleteFiliere = useStoreActions((actions) => actions.deleteFiliere);
  const [deleteMessage, setDeleteMessage] = useState({
    type: "OK",
    Message: "Filiere has been deleted",
  });
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilieres, setCurrentFilieres] = useState([]);
  const [filieresPerPage, setFilieresPerPage] = useState(5);
  const hand = (state) => {
    setCurrentUpdated(state);
  };
  //GET FILIERES
  const getFilieres = async () => {
    const data = await api.get("/api/Filieres", { headers: authHeader() });
    setFileres(data.data);
    setFilteredFilieres(data.data);
  };
  //GET FILIERES RECHERCHE
  const filterFilieres = async (str) => {
    let obj = [];
    if (str !== "") {
      filieres.forEach((item) => {
        if (
          JSON.stringify(item.filiereId)
            .toLocaleLowerCase()
            .includes(String(str).toLocaleLowerCase())
        ) {
          obj.push(item);
        }
      });
      setFilteredFilieres(obj);
    } else setFilteredFilieres(filieres);
  };
  //DELETE FILIERE CODE
  const handleDelete = async () => {
    const res = await deleteFiliere(currentUpdated.filiereId);
    if (res) {
      setDeleteMessage({ type: "OK", Message: "Filiere has been deleted" });
      setConfirmDeleteVisible(false);
      setMessageVisible(true);
      getFilieres();
    } else {
      setDeleteMessage({
        type: "ERROR",
        Message: "Filiere has not been deleted",
      });
      setConfirmDeleteVisible(false);
      setMessageVisible(true);
    }
  };
  //FIRST TIME LOADING
  useEffect(() => {
    getFilieres();
    setCurrentPage(1);
  }, []);
  useEffect(() => {
    if (filieres.length > 0)
      setPagesCount(Math.ceil(filteredFilieres.length / 5));
  }, [filieres, filteredFilieres]);
  useEffect(() => {
    const indexOfLastFiliere = currentPage * filieresPerPage;
    const indexOfFirstFiliere = indexOfLastFiliere - filieresPerPage;
    setCurrentFilieres(
      filteredFilieres.slice(indexOfFirstFiliere, indexOfLastFiliere)
    );
  }, [filteredFilieres, currentPage, pagesCount]);
  return (
    <>
      <NewSide title="Gestion des filieres" />
      {messageVisible ? (
        <div className="messageContainer m-5">
          <MessageBox
            type={deleteMessage.type}
            message={deleteMessage.message}
            cancelOp={() => {
              setMessageVisible(false);
            }}
          />
        </div>
      ) : (
        <div></div>
      )}
      <div className="searchbr">
        <div className="recherche d-flex justify-content-center">
          <TextField
            label="Filiere"
            onChange={(str) => {
              filterFilieres(str.target.value);
            }}
            sx={{ borderRadius: 0 }}
          />
          <button
            className="btn btn-success"
            type="button"
            id="btnAjouter"
            style={{ borderRadius: 0 }}
            onClick={() => {
              setNewFormVisible(true);
            }}
          >
            <FaPlus /> Ajouter Filiere
          </button>
        </div>
      </div>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={pagesCount}
            onChange={(e, v) => {
              setCurrentPage(v);
            }}
            color="primary"
          />
        </Stack>
      </div>
      <FiliereCard
        data={currentFilieres}
        setCurrentUpdated={(val) => {
          setCurrentUpdated(val);
        }}
        setUpdateFormVisible={(val) => {
          setUpdateFormVisible(val);
        }}
        setConfirmDeleteVisible={(val) => {
          setConfirmDeleteVisible(val);
        }}
        setModulesFormVisible={(val) => {
          setModulesFormVisible(val);
        }}
      />
      <div className="POSTFORM">
        {newFormVisible ? (
          <FilierePostNewForm
            handleClick={getFilieres}
            cancelOp={() => {
              setNewFormVisible(false);
            }}
          ></FilierePostNewForm>
        ) : (
          <div></div>
        )}
        {updateFormVisible ? (
          <FilierePutForm
            fieldValues={currentUpdated}
            handleClick={() => {
              getFilieres();
              setDeleteMessage({
                type: "OK",
                Message: "Filiere has been updated",
              });
              setMessageVisible(true);
            }}
            cancelOp={() => {
              setUpdateFormVisible(false);
            }}
          />
        ) : (
          <div></div>
        )}
        {modulesFormVisible ? (
          <GMF
            fieldValues={currentUpdated}
            handleClick={() => {
              getFilieres();
            }}
            cancelOp={() => {
              setModulesFormVisible(false);
            }}
            handler={hand}
            f={filieres}
          />
        ) : (
          <div></div>
        )}
      </div>
      {confirmDeleteVisible ? (
        <ConfirmDelete
          handleDelete={() => {
            handleDelete();
            setConfirmDeleteVisible(false);
          }}
          cancelOp={() => {
            setConfirmDeleteVisible(false);
          }}
        />
      ) : (
        <div></div>
      )}
      {/*
      <div className="container">
        <div className="searchbr">
          <div className="recherche d-flex justify-content-between">
            <TextField
              label="Filiere"
              onChange={(str) => {
                filterFilieres(str.target.value);
              }}
            />
            <button
              className="btn btn-success"
              type="button"
              id="btnAjouter"
              onClick={() => {
                setNewFormVisible(true);
              }}
            >
              <FaPlus /> Ajouter Filiere
            </button>
          </div>
        </div>
        <div className="POSTFORM">
          {newFormVisible ? (
            <FilierePostNewForm
              handleClick={getFilieres}
              cancelOp={() => {
                setNewFormVisible(false);
              }}
            ></FilierePostNewForm>
          ) : (
            <div></div>
          )}
          {updateFormVisible ? (
            <FilierePutForm
              fieldValues={currentUpdated}
              handleClick={() => {
                getFilieres();
              }}
              cancelOp={() => {
                setUpdateFormVisible(false);
              }}
            />
          ) : (
            <div></div>
          )}
          {modulesFormVisible ? (
            <GMF
              fieldValues={currentUpdated}
              handleClick={() => {
                getFilieres();
              }}
              cancelOp={() => {
                setModulesFormVisible(false);
              }}
              handler={hand}
              f={filieres}
            />
          ) : (
            <div></div>
          )}
        </div>
        <ul className="list-group">
          {filteredFilieres.map((item) => (
            <li
              key={item.filiereId}
              className="list-group-item d-flex FiliereInfos"
            >
              <div className="elementDetails">
                <div className="d-flex w-100 ">
                  <h5 className="mb-1">
                    {item.nomFiliere + "  -  " + item.filiereId}
                  </h5>
                </div>
                <p className="m-2">{item.description}</p>
                <small>{dipType(item.typeDiplome)}</small>
              </div>
              <div className=" d-flex btnControls">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    setCurrentUpdated(item);
                    setUpdateFormVisible(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger "
                  onClick={() => {
                    setConfirmDeleteVisible(true);
                    setCurrentUpdated(item);
                    //deleteFiliere(item.filiereId);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setCurrentUpdated(item);
                    setModulesFormVisible(true);
                  }}
                >
                  Modules
                </button>
              </div>
            </li>
          ))}
        </ul>
        {confirmDeleteVisible ? (
          <ConfirmDelete
            handleDelete={() => {
              handleDelete();
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
      */}
    </>
  );
}

export default GestionFilieres;
