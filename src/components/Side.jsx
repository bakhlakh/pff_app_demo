import React, { useState } from "react";
import "./css/Side.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarDATA } from "./SidebarDATA";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
function Side() {
  const [sidebar, setSideBar] = useState(false);
  const showSideBar = () => setSideBar(!sidebar);
  const navigate = useNavigate();
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar d-flex justify-content-between">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSideBar} id="bruh" />
          </Link>
          <Link
            style={{ marginRight: "40px" }}
            to={"#"}
            onClick={() => {
              authService.logout();
              navigate("/");
              window.location.reload();
            }}
          >
            <FaIcons.FaSignOutAlt size={30}></FaIcons.FaSignOutAlt>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSideBar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineArrowLeft />
              </Link>
            </li>
            {SidebarDATA.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
export default Side;
