import React, { useState, useEffect } from "react";
import "../styles/formsStyles/POSTForm.css";
import axios from "axios";
import MessageBox from "../components/MessageBox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button } from "@mui/material";
const api = axios.create({ baseURL: "https://localhost:7161/" });

function GMF({ fieldValues, cancelOp, handleClick, f }) {
  const filiereModules = useStoreState((state) => state.filteredModules);
  const [notInModules, setNotInModules] = useState([]);
  const [newModule, setNewModule] = useState("default");
  const [newMassHorraire, setNewMassHorraire] = useState(0);
  const [updateMassHorraire, setUpdateMassHorraire] = useState(false);
  const [currentUpdated, setCurrentUpdated] = useState([]);
  const [newMassHorraireField, setNewMassHorraireField] = useState(0);
  const [messageVisible, setMessageVisible] = useState(false);
  const putFiliereModules = useStoreActions(
    (actions) => actions.putFiliereModules
  );
  const ajouterFiliereModule = useStoreActions(
    (actions) => actions.ajouterFiliereModule
  );
  const getNonIncludedModules = useStoreActions(
    (actions) => actions.getNonIncludedModules
  );
  const getFiliereModules = useStoreActions(
    (actions) => actions.getFiliereModules
  );
  const [messageInfo, setMessageInfo] = useState({
    type: "OK",
    Message: "Filiere has been updated",
  });

  useEffect(() => {
    console.log("notIn", notInModules);
    console.log("notIn", filiereModules);
  });
  useEffect(() => {
    getModulesWC();
    getFiliereModules(fieldValues.filiereId);
  }, []);
  useEffect(() => {
    getFiliereModules(fieldValues.filiereId);
  }, [notInModules]);
  const handleAjoutModule = async () => {
    const obj = {
      _ModuleId: newModule,
      _FiliereId: fieldValues.filiereId,
      _MassHorraire: newMassHorraire,
    };
    await ajouterFiliereModule(obj);
    getModulesWC();
    setNewModule("default");
    getFiliereModules(fieldValues.filiereId);
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
    setNewModule("default");
  };
  const putModuleFiliere = async () => {
    if (Number(newMassHorraireField) >= 0) {
      const obj = {
        _ModuleId: currentUpdated.module.moduleId,
        _FiliereId: fieldValues.filiereId,
        _MassHorraire: newMassHorraireField,
      };
      const res = await putFiliereModules(obj);
      if (res) {
        displayMsg(201);
        handleClick();
        getModulesWC();
      } else displayMsg(400);
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
        getModulesWC();
      })
      .catch((e) => {
        displayMsg(400);
      });
  };
  const getModulesWC = async () => {
    const res = await getNonIncludedModules(fieldValues.filiereId);
    setNotInModules(res);
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
              {filiereModules?.length === 0 ? (
                <h2 style={{ color: "Blue" }}>
                  Pas de modules pour cette filiere
                </h2>
              ) : (
                <div>
                  {filiereModules?.map((item) => {
                    return (
                      <li
                        key={item.module.moduleId}
                        className="list-group-item list-group-item-action d-flex ModuleInfos"
                      >
                        <div className="elementDetails">
                          <div className="d-flex w-100 ">
                            <h5 className="mb-1">
                              {item.module.moduleId +
                                "  -  " +
                                item.module.intitule}
                            </h5>
                          </div>
                          <p className="m-2">{item.module.description}</p>
                          <small>
                            Mass Horraire : {item.module.massHorraire} Heures
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
                value={newModule}
                name="ModulesList"
                label="ModuleListlabel"
                onChange={(e) => {
                  setNewModule(e.target.value);
                }}
              >
                <MenuItem value="default">--Choisissez un module--</MenuItem>
                {notInModules.length > 0
                  ? notInModules.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.moduleId}>
                          {item.moduleId} - {item.intitule}
                        </MenuItem>
                      );
                    })
                  : null}
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
          <div className="modal-footer">
            <Button
              variant="contained"
              sx={{ borderRadius: "0px", backgroundColor: "gray" }}
              onClick={cancelOp}
            >
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GMF;
