import React from "react";
import "../styles/componentStyles/SeanceCalendar.css";
import { useState, useEffect } from "react";
function SeancesCalendar({ data }) {
  const [seances, setSeances] = useState({
    s8: null,
    s11: null,
    s13: null,
    s16: null,
  });
  useEffect(() => {
    setSeances({ s8: null, s11: null, s13: null, s16: null });
    if (data.length > 0) {
      setSeances({
        s8: data.find((seance) => seance.startTime === "08:30"),
        s11: data.find((seance) => seance.startTime === "11:00"),
        s13: data.find((seance) => seance.startTime === "13:30"),
        s16: data.find((seance) => seance.startTime === "16:00"),
      });
    }
  }, [data]);
  return (
    <>
      <div className="calendar-container">
        <table className="table">
          <thead>
            <tr>
              <th>Heures</th>
              <th>Seances</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>8h30</td>
              {seances.s8 && (
                <td>
                  <div className="SeanceAff">
                    <div className="SeanceAffHeader">{seances.s8?.title}</div>
                    <div className="SeanceAffContent">
                      {seances.s8?.moduleId + " - " + seances.s8?.room.intitule}
                    </div>
                    <div className="SeanceAffFooter">
                      {seances.s8?.formateur.firstName +
                        " " +
                        seances.s8?.formateur.lastName}
                    </div>
                  </div>
                </td>
              )}
            </tr>
            <tr>
              <td>11h00</td>
              {seances.s11 && (
                <td>
                  <div className="SeanceAff">
                    <div className="SeanceAffHeader">{seances.s11?.title}</div>
                    <div className="SeanceAffContent">
                      {seances.s11?.moduleId +
                        " - " +
                        seances.s11?.room.intitule}
                    </div>
                    <div className="SeanceAffFooter">
                      {seances.s11?.formateur.firstName +
                        "-" +
                        seances.s11?.formateur.lastName}
                    </div>
                  </div>
                </td>
              )}
            </tr>
            <tr>
              <td>13h30</td>
              {seances.s13 && (
                <td>
                  <div className="SeanceAff">
                    <div className="SeanceAffHeader">{seances.s13?.title}</div>
                    <div className="SeanceAffContent">
                      {seances.s13?.moduleId +
                        " - " +
                        seances.s13?.room.intitule}
                    </div>
                    <div className="SeanceAffFooter">
                      {seances.s13?.formateur.firstName +
                        " " +
                        seances.s13?.formateur.lastName}
                    </div>
                  </div>
                </td>
              )}
            </tr>
            <tr>
              <td>16h00</td>
              {seances.s16 && (
                <td>
                  <div className="SeanceAff">
                    <div className="SeanceAffHeader">{seances.s16?.title}</div>
                    <div className="SeanceAffContent">
                      {seances.s16?.moduleId +
                        " - " +
                        seances.s16?.room.intitule}
                    </div>
                    <div className="SeanceAffFooter">
                      {seances.s16?.formateur.firstName +
                        " " +
                        seances.s16?.formateur.lastName}
                    </div>
                  </div>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SeancesCalendar;
