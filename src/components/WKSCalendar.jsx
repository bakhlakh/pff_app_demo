import React, { useState, useEffect } from "react";
import "./css/WKSCalendar.css";
function WKSCalendar({ data }) {
  const [seances, setSeances] = useState({
    lundi: { s8: null, s11: null, s13: null, s16: null },
    mardi: {
      s8: null,
      s11: null,
      s13: null,
      s16: null,
    },
    mercredi: {
      s8: null,
      s11: null,
      s13: null,
      s16: null,
    },
    jeudi: {
      s8: null,
      s11: null,
      s13: null,
      s16: null,
    },
    vendredi: {
      s8: null,
      s11: null,
      s13: null,
      s16: null,
    },
    samedi: {
      s8: null,
      s11: null,
      s13: null,
      s16: null,
    },
  });
  useEffect(() => {
    setSeances({
      lundi: { s8: null, s11: null, s13: null, s16: null },
      mardi: { s8: null, s11: null, s13: null, s16: null },
      mercredi: { s8: null, s11: null, s13: null, s16: null },
      jeudi: { s8: null, s11: null, s13: null, s16: null },
      vendredi: { s8: null, s11: null, s13: null, s16: null },
      samedi: { s8: null, s11: null, s13: null, s16: null },
    });
    if (data.length > 0) {
      setSeances({
        lundi: {
          s8: data.find(
            (seance) => seance.startTime === "08:30" && seance.day === "Monday"
          ),
          s11: data.find(
            (seance) => seance.startTime === "11:00" && seance.day === "Monday"
          ),
          s13: data.find(
            (seance) => seance.startTime === "13:30" && seance.day === "Monday"
          ),
          s16: data.find(
            (seance) => seance.startTime === "16:00" && seance.day === "Monday"
          ),
        },
        mardi: {
          s8: data.find(
            (seance) => seance.startTime === "08:30" && seance.day === "Tuesday"
          ),
          s11: data.find(
            (seance) => seance.startTime === "11:00" && seance.day === "Tuesday"
          ),
          s13: data.find(
            (seance) => seance.startTime === "13:30" && seance.day === "Tuesday"
          ),
          s16: data.find(
            (seance) => seance.startTime === "16:00" && seance.day === "Tuesday"
          ),
        },
        mercredi: {
          s8: data.find(
            (seance) =>
              seance.startTime === "08:30" && seance.day === "Wednesday"
          ),
          s11: data.find(
            (seance) =>
              seance.startTime === "11:00" && seance.day === "Wednesday"
          ),
          s13: data.find(
            (seance) =>
              seance.startTime === "13:30" && seance.day === "Wednesday"
          ),
          s16: data.find(
            (seance) =>
              seance.startTime === "16:00" && seance.day === "Wednesday"
          ),
        },
        jeudi: {
          s8: data.find(
            (seance) =>
              seance.startTime === "08:30" && seance.day === "Thursday"
          ),
          s11: data.find(
            (seance) =>
              seance.startTime === "11:00" && seance.day === "Thursday"
          ),
          s13: data.find(
            (seance) =>
              seance.startTime === "13:30" && seance.day === "Thursday"
          ),
          s16: data.find(
            (seance) =>
              seance.startTime === "16:00" && seance.day === "Thursday"
          ),
        },
        vendredi: {
          s8: data.find(
            (seance) => seance.startTime === "08:30" && seance.day === "Friday"
          ),
          s11: data.find(
            (seance) => seance.startTime === "11:00" && seance.day === "Friday"
          ),
          s13: data.find(
            (seance) => seance.startTime === "13:30" && seance.day === "Friday"
          ),
          s16: data.find(
            (seance) => seance.startTime === "16:00" && seance.day === "Friday"
          ),
        },
        samedi: {
          s8: data.find(
            (seance) =>
              seance.startTime === "08:30" && seance.day === "Saturday"
          ),
          s11: data.find(
            (seance) =>
              seance.startTime === "11:00" && seance.day === "Saturday"
          ),
          s13: data.find(
            (seance) =>
              seance.startTime === "13:30" && seance.day === "Saturday"
          ),
          s16: data.find(
            (seance) =>
              seance.startTime === "16:00" && seance.day === "Saturday"
          ),
        },
      });
    }
    console.log("data", data);
    console.log("obj", seances);
  }, [data]);

  return (
    <div className="WKSCalendar">
      <table className="table" style={{ height: "500px" }}>
        <thead>
          <tr>
            <th>
              <div className="d-flex justify-content-between w-75">
                <h6>Jours</h6>
                <h6>/</h6>
                <h6>Heures</h6>
              </div>
            </th>
            <th>
              <div className="d-flex justify-content-between">
                <h6>8:30</h6>
                <h6>11:00</h6>
              </div>
            </th>
            <th>
              <div className="d-flex justify-content-between">
                <h6></h6>
                <h6>13:30</h6>
              </div>
            </th>

            <th>
              <div className="d-flex justify-content-between">
                <h6></h6>
                <h6>16:00</h6>
              </div>
            </th>
            <th>
              <div className="d-flex justify-content-between">
                <h6></h6>
                <h6>18:30</h6>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="d-flex justify-content-center align-items-center   ">
                <h6>Lundi</h6>
              </div>
            </td>

            <td>
              {seances.lundi.s8 && (
                <div className="d-flex justify-content-center flex-column align-items-center ">
                  <h6>{seances.lundi.s8.moduleId}</h6>
                  <h6>
                    {seances.lundi.s8.formateur.firstName +
                      " " +
                      seances.lundi.s8.formateur.lastName}
                  </h6>
                  <h6>{seances.lundi.s8.intitule}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.lundi.s11 && (
                <div className="d-flex justify-content-center align-items-center   ">
                  <h6>{seances.lundi.s11.moduleId}</h6>
                </div>
              )}
            </td>

            <td>
              {seances.lundi.s13 && (
                <div className="d-flex justify-content-center align-items-center   ">
                  <h6>{seances.lundi.s13.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.lundi.s16 && (
                <div className="d-flex justify-content-center align-items-center   ">
                  <h6>{seances.lundi.s16.moduleId}</h6>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex justify-content-center align-items-center   ">
                <h6>Mardi</h6>
              </div>
            </td>
            <td>
              {seances.mardi.s8 && (
                <div className="d-flex justify-content-center align-items-center   ">
                  <h6>{seances.mardi.s8.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.mardi.s11 && (
                <div className="d-flex justify-content-center align-items-center   ">
                  <h6>{seances.mardi.s11.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.mardi.s13 && (
                <div className="d-flex justify-content-center align-items-center   ">
                  <h6>{seances.mardi.s13.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.mardi.s16 && (
                <div className="d-flex justify-content-center align-items-center   ">
                  <h6>{seances.mardi.s16.moduleId}</h6>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex justify-content-center align-items-center  ">
                <h6>Mercredi</h6>
              </div>
            </td>
            <td>
              {seances.mercredi.s8 && (
                <div className="d-flex justify-content-center align-items-center   ">
                  <h6>{seances.mercredi.s8.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.mercredi.s11 && (
                <div className="d-flex justify-content-center align-items-center   ">
                  <h6>{seances.mercredi.s11.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.mercredi.s13 && (
                <div className="d-flex justify-content-center align-items-center   ">
                  <h6>{seances.mercredi.s13.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.mercredi.s16 && (
                <div className="d-flex justify-content-center align-items-center   ">
                  <h6>{seances.mercredi.s16.moduleId}</h6>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex justify-content-center align-items-center h-100">
                <h6>Jeudi</h6>
              </div>
            </td>
            <td>
              {seances.jeudi.s8 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.jeudi.s8.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.jeudi.s11 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.jeudi.s11.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.jeudi.s13 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.jeudi.s13.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.jeudi.s16 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.jeudi.s16.moduleId}</h6>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex justify-content-center align-items-center h-100">
                <h6>Vendredi</h6>
              </div>
            </td>
            <td>
              {seances.vendredi.s8 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.vendredi.s8.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.vendredi.s11 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.vendredi.s11.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.vendredi.s13 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.vendredi.s13.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.vendredi.s16 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.vendredi.s16.moduleId}</h6>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex justify-content-center align-items-center h-100">
                <h6>Samedi</h6>
              </div>
            </td>
            <td>
              {seances.samedi.s8 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.samedi.s8.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.samedi.s11 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.samedi.s11.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.samedi.s13 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.samedi.s13.moduleId}</h6>
                </div>
              )}
            </td>
            <td>
              {seances.samedi.s16 && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <h6>{seances.samedi.s16.moduleId}</h6>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WKSCalendar;
