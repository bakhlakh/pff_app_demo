import React, { useState, useEffect } from "react";
import "./css/POSTForm.css";
import axios from "axios";
import MessageBox from "../components/MessageBox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import authHeader from "../services/auth-header";

const api = axios.create({ baseURL: "https://localhost:7161/" });

function GMF({ fieldValues, cancelOp, handleClick, f }) {
  const [modules, setModules] = useState(fieldValues.filiereModules);
  const [notInModules, setNotInModules] = useState([{ moduleId: "M202" }]);
  const [newModule, setNewModule] = useState(
    notInModules[0].moduleId || "M202"
  );
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
      .post("/api/v1/FiliereModules/", obj, { headers: authHeader() })
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
                        className="list-group-item list-group-item-action d-flex ModuleInfos"
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
            <FormControl fullWidth sx={{ mb: 1, mt: 2 }}>
              <InputLabel id="ModulesListlabel">liste des modules</InputLabel>
              <Select
                labelId="ModulesListlabel"
                id="ModulesList"
                name="ModulesList"
                value={newModule}
                label=" Niveau Diplome"
                onChange={(e) => {
                  setNewModule(e.target.value);
                }}
              >
                {notInModules.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.moduleId}>
                      {item.moduleId} - {item.intitule}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <div className="input-group mt-2">
              <TextField
                label="Mass Horraire"
                className="form-control"
                inputProps={{ maxLength: 300 }}
                value={newMassHorraire}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;

                  // if value is not blank, then test the regex

                  if (
                    e.target.value === "" ||
                    (re.test(e.target.value) && e.target.value < 1000)
                  ) {
                    setNewMassHorraire(e.target.value);
                  }
                }}
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (newMassHorraire > 0) {
                    handleAjoutModule();
                  } else {
                    displayMsg(500);
                  }
                }}
              >
                Ajouter Module
              </button>
            </div>
          </section>
          {updateMassHorraire ? (
            <section className="input-group mt-4">
              <TextField
                label=" New Mass Horraire"
                className="form-control"
                inputProps={{ maxLength: 300 }}
                value={newMassHorraireField}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;

                  // if value is not blank, then test the regex

                  if (
                    e.target.value === "" ||
                    (re.test(e.target.value) && e.target.value < 1000)
                  ) {
                    setNewMassHorraireField(e.target.value);
                  }
                }}
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
