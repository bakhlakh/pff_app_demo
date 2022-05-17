import React, { useEffect, useState } from "react";
import { useStoreActions } from "easy-peasy";

import { DashboardCard } from "../components/DashboardCard";

import "../styles/componentStyles/dashboardCard.css";
import "../styles/pagesStyles/DashboardStyle.css";
import "../styles/componentStyles/DashboardCardContainer.css";

import { AccountTree } from "@mui/icons-material";
import ExtensionIcon from "@mui/icons-material/Extension";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupsIcon from "@mui/icons-material/Groups";

function Home() {
  const getOverview = useStoreActions((actions) => actions.getOverview);
  const [overview, setOverview] = useState([]);

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
      <DashboardHeader headerData={overview} />
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
