import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import MessageBox from "./MessageBox";
import { useStoreActions, useStoreState } from "easy-peasy";
import "./css/moduleForm.css";
function PostGroupForm({ handleClick, cancelOp }) {
  const api = useStoreState((store) => store.api);
  const getFilieres = useStoreActions((actions) => actions.getFilieres);
  const groupes = useStoreState((state) => state.groupes);
  const [filiereId, setFiliereId] = useState("TDI");
  const [niveau, setNiveau] = useState(1);
  const [groupId, setGroupId] = useState("");
  var newId;
  const anneScolaire =
    new Date().getMonth() < 8
      ? `${new Date().getFullYear() - 1}/${new Date().getFullYear()}`
      : `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`;
  function idExists(id) {
    let exists = false;
    groupes.forEach((element) => {
      if (element.groupId == id) {
        exists = true;
      }
    });
    return exists;
  }
  const handleSubmit = () => {
    api
      .post("/api/Groupes", {
        anneScolaire: anneScolaire,
        groupId: groupId,
        filiereId: filiereId,
        niveau: niveau,
      })
      .then((e) => {
        handleClick(e.status);
      });
  };
  const generateGroupId = () => {
    if (filiereId !== "") {
      for (let i = 1; i < 99; i++) {
        newId = `${filiereId}${niveau}${i < 9 ? "0" + i : i}`;
        if (!idExists(newId)) break;
      }
    }
    setGroupId(newId);
  };
  useEffect(() => {
    generateGroupId();
  });
  useEffect(() => {
    getFilieres();
  }, []);
  const filieres = useStoreState((store) => store.filieres);
  return (
    <>
      <div id="myModal" className="modal" style={{ display: "block" }}>
        <div className="modal-content">
          <div id="modalContainer">
            <form>
              <select
                className="form-select mb-2"
                style={{ width: "500px" }}
                onChange={(e) => {
                  setFiliereId(e.target.value);
                }}
              >
                {filieres.map((item) => (
                  <option key={item.filiereId} value={item.filiereId}>
                    {item.nomFiliere}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="form-control"
                disabled
                value={groupId}
              />
              <input
                type="text"
                className="form-control mt-2"
                disabled
                value={anneScolaire}
              />
              <input
                type="number"
                className="form-control mt-2"
                min={1}
                max={3}
                defaultValue={1}
                onChange={(e) => {
                  setNiveau(e.target.value);
                }}
              />
              <div className="modalBtns mt-2">
                <button
                  id="modalCancelBtn"
                  className="btn btn-secondary"
                  onClick={cancelOp}
                >
                  Cancel
                </button>
                <button
                  id="modalAjouterBtn"
                  className="btn"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostGroupForm;
