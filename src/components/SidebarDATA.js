import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
export const SidebarDATA = [
  {
    title: "Gestion Filieres",
    path: "/GestionFilieres",
    icon: <IoIcons.IoMdConstruct />,
    cName: "nav-text",
  },
  {
    title: "Gestion Modules",
    path: "/GestionModules",
    icon: <IoIcons.IoMdCog />,
    cName: "nav-text",
  },
  {
    title: "Gestion Stagiaires",
    path: "/GestionStagiaires",
    icon: <IoIcons.IoMdPerson />,
    cName: "nav-text",
  },
  {
    title: "Gestion des Groupes",
    path: "/Groupes",
    icon: <FaIcons.FaObjectGroup />,
    cName: "nav-text",
  },
  {
    title: "Gestion Formatteurs",
    path: "/GestionFormatteurs",
    icon: <FaIcons.FaIdBadge />,
    cName: "nav-text",
  },
  {
    title: "Gestion des Salles",
    path: "/GestionSalles",
    icon: <MeetingRoomIcon />,
    cName: "nav-text",
  },
  {
    title: "Gestion des Absences",
    path: "/GestionAbsence",
    icon: <FaIcons.FaClipboardList />,
    cName: "nav-text",
  },
  {
    title: "Gestion des Seances",
    path: "/GestionSeances",
    icon: <FaIcons.FaCalendarDay />,
    cName: "nav-text",
  },
];
