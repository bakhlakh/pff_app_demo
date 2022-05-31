import React from "react";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import BadgeIcon from "@mui/icons-material/Badge";
import ViewListIcon from "@mui/icons-material/ViewList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export const SidebarDATA = [
  {
    title: "Gestion Filieres",
    path: "/Gestion-Filieres",
    icon: <CallSplitIcon />,
    cName: "nav-text",
  },
  {
    title: "Gestion Modules",
    path: "/Gestion-Modules",
    icon: <MenuBookIcon />,
    cName: "nav-text",
  },
  {
    title: "Gestion Stagiaires",
    path: "/Gestion-Stagiaires",
    icon: <PersonIcon />,
    cName: "nav-text",
  },
  {
    title: "Gestion des Groupes",
    path: "/Gestion-groupes",
    icon: <GroupsIcon />,
    cName: "nav-text",
  },
  {
    title: "Gestion Formatteurs",
    path: "/Gestion-Formatteurs",
    icon: <BadgeIcon />,
    cName: "nav-text",
  },
  {
    title: "Gestion des Salles",
    path: "/Gestion-Salles",
    icon: <MeetingRoomIcon />,
    cName: "nav-text",
  },
  {
    title: "Gestion des Absences",
    path: "/Gestion-Absence",
    icon: <ViewListIcon />,
    cName: "nav-text",
  },
  {
    title: "Gestion des Seances",
    path: "/Gestion-Seances",
    icon: <CalendarMonthIcon />,
    cName: "nav-text",
  },
];
