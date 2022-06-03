import React, { useState, useEffect } from "react";
import "../styles/componentStyles/WKSCalendar.css";
import SeanceBox from "./SeanceBox";
import PutSeance from "../forms/PutSeance";
const WKSCalendar = React.forwardRef(({ data, handleSeanceUpdated }, ref) => {
  const [putSeanceVisible, setPostSeanceVisible] = useState(false);
  const [updatedSeance, setUpdatedSeance] = useState({});
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
    if (data?.emploi?.length > 0) {
      setSeances({
        lundi: {
          s8: data.emploi.find(
            (seance) => seance.startTime === "08:30" && seance.day === "Monday"
          ),
          s11: data.emploi.find(
            (seance) => seance.startTime === "11:00" && seance.day === "Monday"
          ),
          s13: data.emploi.find(
            (seance) => seance.startTime === "13:30" && seance.day === "Monday"
          ),
          s16: data.emploi.find(
            (seance) => seance.startTime === "16:00" && seance.day === "Monday"
          ),
        },
        mardi: {
          s8: data.emploi.find(
            (seance) => seance.startTime === "08:30" && seance.day === "Tuesday"
          ),
          s11: data.emploi.find(
            (seance) => seance.startTime === "11:00" && seance.day === "Tuesday"
          ),
          s13: data.emploi.find(
            (seance) => seance.startTime === "13:30" && seance.day === "Tuesday"
          ),
          s16: data.emploi.find(
            (seance) => seance.startTime === "16:00" && seance.day === "Tuesday"
          ),
        },
        mercredi: {
          s8: data.emploi.find(
            (seance) =>
              seance.startTime === "08:30" && seance.day === "Wednesday"
          ),
          s11: data.emploi.find(
            (seance) =>
              seance.startTime === "11:00" && seance.day === "Wednesday"
          ),
          s13: data.emploi.find(
            (seance) =>
              seance.startTime === "13:30" && seance.day === "Wednesday"
          ),
          s16: data.emploi.find(
            (seance) =>
              seance.startTime === "16:00" && seance.day === "Wednesday"
          ),
        },
        jeudi: {
          s8: data.emploi.find(
            (seance) =>
              seance.startTime === "08:30" && seance.day === "Thursday"
          ),
          s11: data.emploi.find(
            (seance) =>
              seance.startTime === "11:00" && seance.day === "Thursday"
          ),
          s13: data.emploi.find(
            (seance) =>
              seance.startTime === "13:30" && seance.day === "Thursday"
          ),
          s16: data.emploi.find(
            (seance) =>
              seance.startTime === "16:00" && seance.day === "Thursday"
          ),
        },
        vendredi: {
          s8: data.emploi.find(
            (seance) => seance.startTime === "08:30" && seance.day === "Friday"
          ),
          s11: data.emploi.find(
            (seance) => seance.startTime === "11:00" && seance.day === "Friday"
          ),
          s13: data.emploi.find(
            (seance) => seance.startTime === "13:30" && seance.day === "Friday"
          ),
          s16: data.emploi.find(
            (seance) => seance.startTime === "16:00" && seance.day === "Friday"
          ),
        },
        samedi: {
          s8: data.emploi.find(
            (seance) =>
              seance.startTime === "08:30" && seance.day === "Saturday"
          ),
          s11: data.emploi.find(
            (seance) =>
              seance.startTime === "11:00" && seance.day === "Saturday"
          ),
          s13: data.emploi.find(
            (seance) =>
              seance.startTime === "13:30" && seance.day === "Saturday"
          ),
          s16: data.emploi.find(
            (seance) =>
              seance.startTime === "16:00" && seance.day === "Saturday"
          ),
        },
      });
    }
  }, [data]);
  const handleUpdate = (props) => {
    setUpdatedSeance(props);
    setPostSeanceVisible(true);
  };
  return (
    <>
      {putSeanceVisible && (
        <PutSeance
          handleUpdate={() => {
            handleSeanceUpdated();
          }}
          cancelOp={() => {
            setPostSeanceVisible(false);
          }}
          updatedSeance={updatedSeance}
        />
      )}
      <div className="WKSCalendar" ref={ref}>
        {data?.info && (
          <div className="WKSCalendar__header">
            <div className="d-flex justify-content-center">
              <h4>EMPLOIS DU TEMPS PAR GROUPE</h4>
            </div>
            <div className="d-flex justify-content-center">
              <p>
                Semaine :{" "}
                {data?.dateEmploie.day +
                  "-" +
                  data?.dateEmploie.month +
                  "-" +
                  data?.dateEmploie.year}
              </p>
            </div>
            <div className="WKSCalendar-header-body d-flex justify-content-between ">
              <div className="WKSCalendar-header-body-left">
                <h5>
                  Anne de formation : {data && data.info._Groupe.anneScolaire}
                </h5>
                <h5>Groupe : {data && data.info._Groupe.groupId}</h5>
                <h5>Mode de formation : Residentiel</h5>
              </div>
              <div className="WKSCalendar-header-body-right">
                <h5>Niveau : {data && data.info._Filiere.typeDiplome}</h5>
                <h5>Mass Horraire /Semaine : {data.mh}</h5>
                <h5>
                  {data && data.info._Groupe.niveau === 1
                    ? " " + data.info._Groupe.niveau + " ère Année"
                    : " " + data.info._Groupe.niveau + " ème Année"}
                </h5>
              </div>
            </div>
          </div>
        )}
        <table className=" WKSCalendarTable">
          <thead>
            <tr style={{ height: "70px" }}>
              <th style={{ paddingLeft: "20px", width: "250px" }}>
                <div className="d-flex justify-content-between w-75">
                  <h6>Jours</h6>
                  <h6>/</h6>
                  <h6>Heures</h6>
                </div>
              </th>
              <th style={{ width: "250px" }}>
                <div className="d-flex justify-content-between">
                  <h6>8:30</h6>
                  <h6>11:00</h6>
                </div>
              </th>
              <th style={{ width: "250px" }}>
                <div className="d-flex justify-content-end">
                  <h6>13:30</h6>
                </div>
              </th>

              <th style={{ width: "250px" }}>
                <div className="d-flex justify-content-end">
                  <h6>16:00</h6>
                </div>
              </th>
              <th style={{ paddingRight: "20px", width: "250px" }}>
                <div className="d-flex justify-content-end">
                  <h6>18:30</h6>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={new Date().getDay() === 1 ? "WKSCalendarToday" : ""}>
              <td>
                <div className=" d-flex justify-content-center align-items-center">
                  <h6>Lundi</h6>
                </div>
              </td>

              <td>
                {seances.lundi.s8 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.lundi.s8}
                  />
                )}
              </td>
              <td>
                {seances.lundi.s11 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.lundi.s11}
                  />
                )}
              </td>

              <td>
                {seances.lundi.s13 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.lundi.s13}
                  />
                )}
              </td>
              <td>
                {seances.lundi.s16 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.lundi.s16}
                  />
                )}
              </td>
            </tr>
            <tr className={new Date().getDay() === 2 ? "WKSCalendarToday" : ""}>
              <td>
                <div className=" d-flex justify-content-center align-items-center">
                  <h6>Mardi</h6>
                </div>
              </td>
              <td>
                {seances.mardi.s8 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.mardi.s8}
                  />
                )}
              </td>
              <td>
                {seances.mardi.s11 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.mardi.s11}
                  />
                )}
              </td>
              <td>
                {seances.mardi.s13 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.mardi.s13}
                  />
                )}
              </td>
              <td>
                {seances.mardi.s16 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.mardi.s16}
                  />
                )}
              </td>
            </tr>
            <tr className={new Date().getDay() === 3 ? "WKSCalendarToday" : ""}>
              <td>
                <div className=" d-flex justify-content-center align-items-center">
                  <h6>Mercredi</h6>
                </div>
              </td>
              <td>
                {seances.mercredi.s8 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.mercredi.s8}
                  />
                )}
              </td>
              <td>
                {seances.mercredi.s11 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.mercredi.s11}
                  />
                )}
              </td>
              <td>
                {seances.mercredi.s13 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.mercredi.s13}
                  />
                )}
              </td>
              <td>
                {seances.mercredi.s16 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.mercredi.s16}
                  />
                )}
              </td>
            </tr>
            <tr className={new Date().getDay() === 4 ? "WKSCalendarToday" : ""}>
              <td>
                <div className=" d-flex justify-content-center align-items-center">
                  <h6>Jeudi</h6>
                </div>
              </td>
              <td>
                {seances.jeudi.s8 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.jeudi.s8}
                  />
                )}
              </td>
              <td>
                {seances.jeudi.s11 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.jeudi.s11}
                  />
                )}
              </td>
              <td>
                {seances.jeudi.s13 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.jeudi.s13}
                  />
                )}
              </td>
              <td>
                {seances.jeudi.s16 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.jeudi.s16}
                  />
                )}
              </td>
            </tr>
            <tr className={new Date().getDay() === 5 ? "WKSCalendarToday" : ""}>
              <td>
                <div className=" d-flex justify-content-center align-items-center">
                  <h6>Vendredi</h6>
                </div>
              </td>
              <td>
                {seances.vendredi.s8 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.vendredi.s8}
                  />
                )}
              </td>
              <td>
                {seances.vendredi.s11 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.vendredi.s11}
                  />
                )}
              </td>
              <td>
                {seances.vendredi.s13 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.vendredi.s13}
                  />
                )}
              </td>
              <td>
                {seances.vendredi.s16 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.vendredi.s16}
                  />
                )}
              </td>
            </tr>
            <tr className={new Date().getDay() === 6 ? "WKSCalendarToday" : ""}>
              <td>
                <div className=" d-flex justify-content-center align-items-center">
                  <h6>Samedi</h6>
                </div>
              </td>
              <td>
                {seances.samedi.s8 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.samedi.s8}
                  />
                )}
              </td>
              <td>
                {seances.samedi.s11 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.samedi.s11}
                  />
                )}
              </td>
              <td>
                {seances.samedi.s13 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.samedi.s13}
                  />
                )}
              </td>
              <td>
                {seances.samedi.s16 && (
                  <SeanceBox
                    onClick={(props) => {
                      handleUpdate(props);
                    }}
                    seance={seances.samedi.s16}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
});

export default WKSCalendar;
