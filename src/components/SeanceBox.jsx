import React from "react";

function SeanceBox(props) {
  return (
    <div className="seance-box">
      <div className="seance-box-header">
        <div className="seance-box-header-module">{props.seance.moduleId}</div>
      </div>
      <div className="seance-box-body">
        <div className="seance-box-body-intitule">{props.seance.intitule}</div>
        <div className="seance-box-body-formateur">
          {props.seance.formateur.firstName +
            " " +
            props.seance.formateur.lastName}
        </div>
      </div>
    </div>
  );
}

export default SeanceBox;