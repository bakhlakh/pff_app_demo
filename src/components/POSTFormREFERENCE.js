import React, { useState } from "react";
import "./css/POSTForm.css";
function POSTForm() {
  const [nbchars, setnbchars] = useState(300);
  return (
    <>
      <form action="#">
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div id="modalContainer">
              <table className="modalTable">
                <tbody>
                  <tr>
                    <td className="tableLabel">
                      <label htmlFor="filiereId">Filiere ID:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="txt_idFiliere"
                        className="form-control"
                        id="filiereId"
                        placeholder="ID filiere"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableLabel">
                      <label htmlFor="nomFiliere">Nom Filiere:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="txt_nomFiliere"
                        className="form-control"
                        id="nomFiliere"
                        placeholder="Nom filiere"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableLabel">
                      <label htmlFor="diplomeType">Diplome Type:</label>
                    </td>
                    <td>
                      <select
                        name="combodiplomeType"
                        id="diplomeType"
                        className="form-control mb-2"
                      >
                        <option value="TS" defaultValue="TS">
                          Technicien Specialiser
                        </option>
                        <option value="T" defaultValue="T">
                          Technicien
                        </option>
                        <option value="QF" defaultValue="QF">
                          Formation Qualifiante
                        </option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <textarea
                name="DescriptionFiliere"
                id="DescriptionFiliere"
                cols="30"
                rows="4"
                placeholder="Filiere Description"
                className="form-control mt-2"
                maxLength={300}
                onChange={(e) => {
                  setnbchars(300 - e.target.value.length);
                }}
              ></textarea>
              <label htmlFor="DescriptionFiliere" id="lblchar">
                {nbchars + " characters restants"}
              </label>
              <div className="modalBtns">
                <button id="modalCancelBtn" className="btn btn-secondary">
                  Cancel
                </button>
                <button id="modalAjouterBtn" className="btn">
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default POSTForm;
