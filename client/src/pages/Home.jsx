import React, { useEffect, useState } from "react";
import { useStoreActions } from "easy-peasy";

import { DashboardCard } from "../components/DashboardCard";
import OverviewAbsence from "../components/OverviewAbsence";

import "../styles/componentStyles/dashboardCard.css";
import "../styles/pagesStyles/DashboardStyle.css";
import "../styles/componentStyles/DashboardCardContainer.css";

import { AccountTree } from "@mui/icons-material";
import ExtensionIcon from "@mui/icons-material/Extension";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupsIcon from "@mui/icons-material/Groups";

import Grid from "@mui/material/Grid";

function Home() {
  const getOverview = useStoreActions((actions) => actions.getOverview);
  const [overview, setOverview] = useState([]);
  const tournamentsData = [
    {
      labels: ["08:30", "11:00", "13:30", "16:00"],
      datasets: [
        {
          label: "Justifier",
          data: [11, 12, 23, 34],
          backgroundColor: "#62CA76",
          borderColor: "#62CA76",
          pointRadius: 0,
          tension: 0.1,
          borderWidth: 1,
          pointHoverBackgroundColor: "white",

          pointHoverBorderWidth: 4,
          pointHoverRadius: 10,
        },
        {
          label: "Non justifier",
          data: [34, 11, 23, 12],
          backgroundColor: "#4569FF",
          borderColor: "#4569FF",
          pointRadius: 0,
          tension: 0.1,
          borderWidth: 1,
          pointHoverBackgroundColor: "white",

          pointHoverBorderWidth: 4,
          pointHoverRadius: 10,
        },
      ],
      type: "1j",
    },
    {
      labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      datasets: [
        {
          label: "Justifier",
          data: [1230, 1301, 1109, 1002, 1793, 2903, 4093],
          total: 7092,
          backgroundColor: "#4569FF",
          borderColor: "#4569FF",
          pointRadius: 0,
          tension: 0.1,
          borderWidth: 1,
          pointHoverBorderWidth: 4,
          pointHoverBackgroundColor: "white",
          pointHoverRadius: 10,
        },
        {
          label: "Non justifier",
          data: [34, 123, 435, 634, 565, 123, 534, 787, 987, 774, 456, 984],
          total: "0.23%",
          backgroundColor: "#62CA76",
          borderColor: "#62CA76",
          pointRadius: 0,
          tension: 0.1,
          borderWidth: 1,
          pointHoverBorderWidth: 4,
          pointHoverBackgroundColor: "white",
          pointHoverRadius: 10,
        },
      ],
      type: "1s",
    },
    {
      labels: [
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "May",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre",
      ],
      datasets: [
        {
          label: "Justifier",
          data: [
            99384, 109345, 143345, 239384, 229384, 319384, 301384, 230384,
            193184, 173084, 143084, 193184,
          ],
          total: 34213,
          backgroundColor: "#4569FF",
          borderColor: "#4569FF",
          pointRadius: 0,
          tension: 0.1,
          borderWidth: 1,
          pointHoverBorderWidth: 4,
          pointHoverBackgroundColor: "white",
          pointHoverRadius: 10,
        },
        {
          label: "Non Justifier",
          data: [
            9938, 10345, 13345, 39384, 29384, 39334, 33384, 23384, 19318, 13084,
            14308, 19184,
          ],
          total: "0.59%",
          backgroundColor: "#62CA76",
          borderColor: "#62CA76",
          pointRadius: 0,
          tension: 0.1,
          borderWidth: 1,
          pointHoverBackgroundColor: "white",
          pointHoverBorderWidth: 4,
          pointHoverRadius: 10,
        },
      ],
      type: "1y",
    },
  ];
  const fetchData = async () => {
    const result = await getOverview();
    if (result) {
      setOverview([
        {
          content: result.filieres,
          footer: "Filires",
          icon: AccountTree,
          bgColor: "#4569FF",
          redirectLink: "/Gestion-Filieres",
        },
        {
          content: result.modules,
          footer: "Modules",
          icon: ExtensionIcon,
          bgColor: "#78D189",
          redirectLink: "/Gestion-Modules",
        },
        {
          content: result.stagiaires,
          footer: "Stagiaires",
          icon: AccountBoxIcon,
          bgColor: "#FF8F00",
          redirectLink: "/Gestion-Stagiaires",
        },
        {
          content: result.groupes,
          footer: "Groupes",
          icon: GroupsIcon,
          bgColor: "#FFD73E",
          redirectLink: "/Gestion-Groupes",
        },
      ]);
    }
  };
  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <DashboardHeader headerData={overview} />
        </Grid>
        <Grid item xs={6}>
          <OverviewAbsence data={tournamentsData} />
        </Grid>
      </Grid>
    </>
  );
}
function DashboardHeader(props) {
  return (
    <>
      <div className="DashboardCardContainer">
        <div className="DashboardHeader-title">
          <h5>Overview</h5>
        </div>
        <div className="DashboardHeaderBody">
          {props.headerData &&
            props.headerData.map((item, index) => {
              console.log(item);
              return <DashboardCard key={index} data={item} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
