import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
export const SidebarDATA = [
  {
    title: "Gestion Filieres",
    path: "/Gestion-Filieres",
    icon: <IoIcons.IoMdConstruct />,
    cName: "nav-text",
  },
  {
    title: "Gestion Modules",
    path: "/Gestion-Modules",
    icon: <IoIcons.IoMdCog />,
    cName: "nav-text",
  },
  {
    title: "Gestion Stagiaires",
    path: "/Gestion-Stagiaires",
    icon: <IoIcons.IoMdPerson />,
    cName: "nav-text",
  },
  {
    title: "Gestion des Groupes",
    path: "/Gestion-groupes",
    icon: <FaIcons.FaObjectGroup />,
    cName: "nav-text",
  },
  {
    title: "Gestion Formatteurs",
    path: "/Gestion-Formatteurs",
    icon: <FaIcons.FaIdBadge />,
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
    icon: <FaIcons.FaClipboardList />,
    cName: "nav-text",
  },
  {
    title: "Gestion des Seances",
    path: "/Gestion-Seances",
    icon: <FaIcons.FaCalendarDay />,
    cName: "nav-text",
  },
];
