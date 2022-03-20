import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./css/GestionFilieres.css";
import Searchbar from "../components/Searchbar";
import axios from "axios";
import FilierePostNewForm from "../forms/FilierePostNewForm";
import FilierePutForm from "../forms/FilierePutForm";
import GMF from "../components/GMF";
import ConfirmDelete from "../components/ConfirmDelete";
import MessageBox from "../components/MessageBox";
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
  const [deleteMessage, setDeleteMessage] = useState({
    type: "OK",
    Message: "Filiere has been deleted",
  });
  const hand = (state) => {
    setCurrentUpdated(state);
  };
  //GET FILIERES
  const getFilieres = async () => {
    const data = await api.get("/api/Filieres");
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
  const deleteFiliere = () => {
    api
      .delete("/api/Filieres/" + currentUpdated.filiereId)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setDeleteMessage({ type: "OK", message: "Filiere has been deleted" });
          setMessageVisible(true);
        }
      })
      .then(() => getFilieres())
      .catch(() => {
        setDeleteMessage({
          type: "ERR",
          message: "Filiere has not been deleted",
        });
        setMessageVisible(true);
      });
  };
  //FIRST TIME LOADING
  useEffect(() => {
    getFilieres();
  }, []);
  //
  const dipType = (prefix) => {
    if (prefix === "TS") return "Technicien Specialiser";
    if (prefix === "T") return "Technicien";
    if (prefix === "FQ") return "Qualifiante";
  };

  return (
    <>
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
      <div className="container">
        <div className="searchbr">
          <div className="recherche d-flex justify-content-between">
            <Searchbar
              searchItem="Filiere"
              handleChange={(str) => {
                filterFilieres(str);
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
              deleteFiliere();
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

export default GestionFilieres;
