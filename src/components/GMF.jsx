import React, { useState, useEffect } from "react";
import "./css/POSTForm.css";
import axios from "axios";
import MessageBox from "./MessageBox";
const api = axios.create({ baseURL: "https://localhost:7161/" });

function GMF({ fieldValues, cancelOp, handleClick, f }) {
  const [modules, setModules] = useState(fieldValues.filiereModules);
  const [notInModules, setNotInModules] = useState([]);
  const [newModule, setNewModule] = useState("");
  const [newMassHorraire, setNewMassHorraire] = useState(0);
  const [updateMassHorraire, setUpdateMassHorraire] = useState(false);
  const [currentUpdated, setCurrentUpdated] = useState([]);
  const [newMassHorraireField, setNewMassHorraireField] = useState(0);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageInfo, setMessageInfo] = useState({
    type: "OK",
    Message: "Filiere has been updated",
  });
  useEffect(() => {
    const doubleUpdated = f.find((e) => {
      return e.filiereId === fieldValues.filiereId;
    });
    setModules(doubleUpdated.filiereModules);
    getModulesWC();
    //eslint-disable-next-line
  }, [f]);

  const handleAjoutModule = async () => {
    console.log("first");
    const obj = {
      _ModuleId: newModule,
      _FiliereId: fieldValues.filiereId,
      _MassHorraire: newMassHorraire,
    };
    await api
      .post("/api/v1/FiliereModules/", obj)
      .then((e) => {
        displayMsg(e.status);
        handleClick();
      })
      .then(() => {
        getModulesWC();
      })
      .catch((e) => {
        console.log("e", e);
        displayMsg(400);
      });
  };
  const displayMsg = (status) => {
    if (status <= 299 && status >= 200)
      setMessageInfo({
        type: "OK",
        Message: "Filiere has been updated",
      });
    else
      setMessageInfo({
        type: "ERR",
        Message: "Filiere has not been updated",
      });
    setMessageVisible(true);
  };
  const putModuleFiliere = () => {
    if (Number(newMassHorraireField) >= 0) {
      const obj = {
        _ModuleId: currentUpdated.moduleId,
        _FiliereId: fieldValues.filiereId,
        _MassHorraire: newMassHorraireField,
      };
      api
        .put(
          "/api/v1/FiliereModules/" +
            fieldValues.filiereId +
            "/" +
            currentUpdated.moduleId,
          obj
        )
        .then((e) => {
          displayMsg(e.status);
          handleClick();
        })
        .then(() => {
          setModules(fieldValues.filiereModules);
          getModulesWC();
        })
        .catch((e) => {
          displayMsg(400);
        });
    }
  };
  const deleteModuleFiliere = async (item) => {
    await api
      .delete("/api/v1/FiliereModules/" + item.filiereId + "/" + item.moduleId)
      .then((e) => {
        displayMsg(e.status);
        handleClick();
      })
      .then(() => {
        setModules(fieldValues.filiereModules);
        getModulesWC();
      })
      .catch((e) => {
        displayMsg(400);
      });
  };
  const getModulesWC = () => {
    api
      .get("/api/Modules/GetXModulesFiliere/" + fieldValues.filiereId)
      .then(({ data }) => {
        setNotInModules(data);
      });
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="ModulesFormContainer">
          {messageVisible && (
            <MessageBox
              type={messageInfo.type}
              message={messageInfo.Message}
              cancelOp={() => {
                setMessageVisible(false);
              }}
            />
          )}
          <div className="modulesContainer">
            <ul className="list-group">
              {modules.length === 0 ? (
                <h2 style={{ color: "white" }}>
                  There is no modules in this filiere
                </h2>
              ) : (
                <div>
                  {modules.map((item) => {
                    return (
                      <li
                        key={item.moduleId}
                        className="list-group-item list-group-item-action d-flex FiliereInfos"
                      >
                        <div className="elementDetails">
                          <div className="d-flex w-100 ">
                            <h5 className="mb-1">
                              {item.moduleId + "  -  " + item.module.intitule}
                            </h5>
                          </div>
                          <p className="m-2">{item.module.description}</p>
                          <small>
                            Mass Horraire : {item.massHorraire} Heures
                          </small>
                        </div>
                        <div className=" d-flex btnControls">
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteModuleFiliere(item);
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              setCurrentUpdated(item);
                              setUpdateMassHorraire(true);
                            }}
                          >
                            MAH
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </div>
              )}
            </ul>
          </div>
          <section className="d-grid justify-content-center align content center">
            <select
              name="ModulesList"
              id="ModulesList"
              className="form-select "
              onChange={(e) => {
                setNewModule(e.target.value);
              }}
            >
              <option value="none">-- PLEASE SELECT AN OPTION --</option>
              {notInModules.map((item, index) => {
                return (
                  <option key={index} value={item.moduleId}>
                    {item.moduleId} - {item.intitule}
                  </option>
                );
              })}
            </select>
            <div className="input-group mt-2">
              <input
                type="text"
                className="form-control shadow-none"
                placeholder="Mass Horraire"
                onChange={(e) => {
                  setNewMassHorraire(e.target.value);
                }}
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleAjoutModule();
                }}
              >
                Ajouter Module
              </button>
            </div>
          </section>
          {updateMassHorraire ? (
            <section className="input-group mt-4">
              <input
                type="number"
                className="form-control shadow-none"
                placeholder="Mass Horraire"
                onChange={(e) => {
                  !isNaN(e.target.value)
                    ? setNewMassHorraireField(e.target.value)
                    : setNewMassHorraireField(0);
                }}
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              />
              <button
                className="btn btn-success"
                onClick={() => {
                  putModuleFiliere();
                }}
              >
                Save changes
              </button>
            </section>
          ) : (
            <div></div>
          )}
          <section className="button-group modalBtns mt-3">
            <button
              className="btn btn-secondary"
              onClick={() => {
                cancelOp();
              }}
            >
              Cancel
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default GMF;
