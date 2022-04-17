import React from "react";
import "./css/SeanceCalendar.css";
import { useState, useEffect } from "react";
function SeancesCalendar({ data }) {
  const [s8, setS8] = useState();
  const [s11, setS11] = useState();
  const [s13, setS13] = useState();
  const [s16, setS16] = useState();
  const [s18, setS18] = useState();
  useEffect(() => {
    if (data.length > 0) {
      setS8(data.filter((seance) => seance.StartTime === "8:30"));
      setS11(data.filter((seance) => seance.StartTime === "11:00"));
      setS13(data.filter((seance) => seance.StartTime === "13:30"));
      setS16(data.filter((seance) => seance.StartTime === "16:00"));
      setS18(data.filter((seance) => seance.StartTime === "18:30"));
    }
  }, []);
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
              {s8 && (
                <td>
                  <div className="SeanceAff">
                    <div className="SeanceAffHeader">{s8?.Title}</div>
                    <div className="SeanceAffContent">
                      {s8?.ModuleId + " - " + s8?.roomId}
                    </div>
                    <div className="SeanceAffFooter">
                      {s8?.Formateur.FirstName + " " + s8?.Formateur.LastName}
                    </div>
                  </div>
                </td>
              )}
            </tr>
            <tr>
              <td>11h00</td>
              {s11 && (
                <td>
                  <div className="SeanceAff">
                    <div className="SeanceAffHeader">{s11?.Title}</div>
                    <div className="SeanceAffContent">
                      {s11?.ModuleId + " - " + s11?.roomId}
                    </div>
                    <div className="SeanceAffFooter">
                      {s11?.Formateur.FirstName + " " + s11?.Formateur.LastName}
                    </div>
                  </div>
                </td>
              )}
            </tr>
            <tr>
              <td>13h30</td>
              {s13 && (
                <td>
                  <div className="SeanceAff">
                    <div className="SeanceAffHeader">{s13?.Title}</div>
                    <div className="SeanceAffContent">
                      {s13?.ModuleId + " - " + s13?.roomId}
                    </div>
                    <div className="SeanceAffFooter">
                      {s13?.Formateur.FirstName + " " + s13?.Formateur.LastName}
                    </div>
                  </div>
                </td>
              )}
            </tr>
            <tr>
              <td>16h00</td>
              {s16 && (
                <td>
                  <div className="SeanceAff">
                    <div className="SeanceAffHeader">{s16?.Title}</div>
                    <div className="SeanceAffContent">
                      {s16?.ModuleId + " - " + s16?.roomId}
                    </div>
                    <div className="SeanceAffFooter">
                      {s16?.Formateur.FirstName + " " + s16?.Formateur.LastName}
                    </div>
                  </div>
                </td>
              )}
            </tr>
            <tr>
              <td>18h30</td>
              {s18 && (
                <td>
                  <div className="SeanceAff">
                    <div className="SeanceAffHeader">{s18?.Title}</div>
                    <div className="SeanceAffContent">
                      {s18?.ModuleId + " - " + s18?.roomId}
                    </div>
                    <div className="SeanceAffFooter">
                      {s18?.Formateur.FirstName + " " + s18?.Formateur.LastName}
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
