import React from "react";
import "./css/confirmDelete.css";
function ConfirmDelete({ handleDelete, cancelOp }) {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modulesContainer">
          <h5 style={{ color: "white" }}>
            Are you sure you would like to delete this item ?
          </h5>
          <h6 style={{ color: "red" }}>All related data will be lost</h6>
          <div className="modalBtns">
            <button className="btn btn-secondary" onClick={cancelOp}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
