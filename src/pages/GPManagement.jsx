import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import "./css/GPManagement.css";
function GPManagement() {
  const groupes = useStoreState((state) => state.groupes);
  const getGroupes = useStoreActions((actions) => actions.getGroupes);
  useEffect(() => {
    getGroupes();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="GroupesContainer mt-5">
          {groupes.map((item) => (
            <div
              key={item.groupId + item.anneScolaire}
              className="GroupElement p-4 "
            >
              <header className="d-flex justify-content-between ">
                <h5>{item.groupId}</h5>
                <h3 style={{ color: "#c59d5f" }}>{item.filiereId}</h3>
              </header>
              <h5>{item.filiere.nomFiliere}</h5>
              <p className="item-text">{item.filiere.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GPManagement;
