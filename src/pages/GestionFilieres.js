import React, { useEffect, useState } from "react";
import "./css/GestionFilieres.css";
import Searchbar from "../components/Searchbar";
import axios from "axios";
import FilierePostNewForm from "../components/FilierePostNewForm";
import FilierePutForm from "../components/FilierePutForm.js";
import GMF from "../components/GMF";
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
  //GET FILIERES
  const getFilieres = async () => {
    await api.get("/api/Filieres").then(({ data }) => {
      setFileres(data);
      setFilteredFilieres(data);
    });
    console.log("currentUpdated", currentUpdated);
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
          console.log("first", String(str));
          obj.push(item);
        }
      });
      setFilteredFilieres(obj);
    } else setFilteredFilieres(filieres);
  };
  //DELETE FILIERE CODE
  const deleteFiliere = (id) => {
    api.delete("/api/Filieres/" + id).then(() => getFilieres());
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
      <div className="container">
        <div className="searchbr">
          <div className="input-group mb-3 recherche">
            <Searchbar
              searchItem="Filiere"
              handleChange={(str) => {
                filterFilieres(str);
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="btnAjouter"
              onClick={() => {
                setNewFormVisible(true);
              }}
            >
              Ajouter Filiere
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
                    deleteFiliere(item.filiereId);
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
      </div>
    </>
  );
}

export default GestionFilieres;
