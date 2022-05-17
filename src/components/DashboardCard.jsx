import React from "react";
import "../styles/componentStyles/dashboardCard.css";
export const DashboardCard = ({ data }) => {
  return (
    <div
      className="dashboard-card"
      style={{ backgroundColor: data.bgColor, color: data?.textColor }}
      onClick={() => {
        if (data.redirectLink) window.location.href = data.redirectLink;
      }}
    >
      <div className="dashboard-card-header">
        <data.icon className="dashboard-card-icon" fill={data?.iconColor} />
      </div>
      <div className="dashboard-card-body">
        <div className="dashboard-card-body-content">
          <span>{data.content}</span>
        </div>
      </div>
      <div className="dashboard-card-body-footer">
        <span>{data.footer}</span>
      </div>
    </div>
  );
};
