import React, { useState, useEffect, useReducer } from "react";
import "./css/POSTForm.css";
import axios from "axios";
import MessageBox from "./MessageBox";
const api = axios.create({ baseURL: "https://localhost:7161/" });
const msgReducer = (_, action) => {
  switch (action.type) {
    case "OK":
      return "OK";
    case "ERR":
      return "ERR";
    default:
  }
};

function GMF({ fieldValues, cancelOp, handleClick, f }) {
  const [modules, setModules] = useState(fieldValues.filiereModules);
  const [msgState, msgDispatch] = useReducer(msgReducer, null);
  const [notInModules, setNotInModules] = useState([]);
  const [newModule, setNewModule] = useState("");
  const [newMassHorraire, setNewMassHorraire] = useState(0);
  const [updateMassHorraire, setUpdateMassHorraire] = useState(false);
  const [currentUpdated, setCurrentUpdated] = useState([]);
  const [newMassHorraireField, setNewMassHorraireField] = useState(0);
  useEffect(() => {
    const doubleUpdated = f.find((e) => {
      return e.filiereId === fieldValues.filiereId;
    });
    setModules(doubleUpdated.filiereModules);
    getModulesWC();
  }, [f]);
  const handleAjoutModule = async () => {
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
        setModules(handleClick().filiereModules);
      })
      .then(() => {
        getModulesWC();
      })
      .catch((e) => {
        displayMsg(400);
      });
  };
  const displayMsg = (status) => {
    if (status <= 299 && status >= 200) {
      msgDispatch({ type: "OK" });
    }
    if (status > 299 || status < 200) {
      msgDispatch({ type: "ERR" });
    }
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

  useEffect(() => {
    setModules(fieldValues.filiereModules);
    getModulesWC();
  }, []);
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modulesContainer">
          {msgState !== null ? (
            <MessageBox type={msgState} message="Filiere has been updated" />
          ) : (
            ""
          )}{" "}
          <div className="FiliereInfos"></div>
          <ul className="list-group">
            {modules.length === 0 ? (
              <h2 style={{ color: "white" }}>
                There is no modules in this filiere
              </h2>
            ) : (
              <div>
                {" "}
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
                Save change
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
