import React, { useState, useEffect, useCallback } from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import { Chart as ChartJS, Tooltip } from "chart.js";

const OverviewAbsence = React.memo((props) => {
  Tooltip.positioners.custom = (elements, eventPosition) => {
    return {
      x: eventPosition.x,
      y: eventPosition.y,
    };
  };
  const [selectedView, setSelectedView] = useState("1j");
  const [chartData, setChartData] = useState(props.data[0]);
  const [legend, setLegend] = useState([]);
  useEffect(() => {
    const newData = props.data.filter((obj) => obj.type === selectedView)[0];
    setChartData(newData);
  }, [selectedView]);
  const [ref, setRef] = useState(null);
  const onRefChange = useCallback(
    (props) => {
      setRef(props);
      return props;
    },
    [chartData]
  );
  useEffect(() => {
    if (ref) beforeInit(ref);
  }, [ref, chartData]);

  const beforeInit = (chart) => {
    let datasetsLabels = [];
    let colors = [];
    chart.data.datasets.forEach((ds) => {
      datasetsLabels.push({
        label: ds.label,
      });
      colors.push(ds.backgroundColor);
    });
    setLegend(
      <ul className="LegendListStyle">
        {datasetsLabels &&
          datasetsLabels.map((obj, index) => (
            <li key={index} style={{ textAlign: "left" }}>
              <div className="DashboardTournamentsOverviewPanel-legend">
                <span style={{ backgroundColor: colors[index] }}></span>
                <h4>{obj.label} </h4>
              </div>
            </li>
          ))}
      </ul>
    );
  };
  return (
    <div className="DashboardTournamentsOverviewPanel">
      <div className="DashboardTournamentsOverviewPanel-header">
        <div className="DashboardTournamentsOverviewPanel-header-item">
          <h5>Resume des absences</h5>
        </div>
        <div className="DashboardTournamentsOverviewPanel-header-item">
          <ul className="dropdown-options">
            <li
              className={"option" + (selectedView === "1j" ? " selected" : "")}
              onClick={() => {
                setSelectedView("1j");
              }}
            >
              1j
            </li>

            <li
              className={"option" + (selectedView === "1s" ? " selected" : "")}
              onClick={() => {
                setSelectedView("1s");
              }}
            >
              1s
            </li>
            <li
              className={"option" + (selectedView === "1y" ? " selected" : "")}
              onClick={() => {
                setSelectedView("1y");
              }}
            >
              1y
            </li>
          </ul>
        </div>
      </div>
      <div className="DashboardTournamentsOverviewPanel-legend-container">
        {legend}
      </div>
      <Chart
        ref={onRefChange}
        data={chartData}
        type="line"
        style={{ maxHeight: "180px", margin: "5px" }}
        options={{
          responsive: true,
          scales: {
            y: {
              ticks: {
                display: false,
                max: 25000,
                min: 0,
                stepSize: 5000,
                beginAtZero: true,
                padding: 20,
                callback: function (value) {
                  return value / 1000 + "k";
                },
              },
              grid: {
                borderWidth: 0,
                display: false,
              },
            },
            x: {
              ticks: {
                display: true,
                font: {
                  family: "Poppins",
                  size: 12,
                  weight: 400,
                  style: "normal",
                  lineHeight: 1.5,
                },
                color: "#333333",
              },

              grid: {
                display: false,
                borderWidth: 0,
              },
            },
          },

          plugins: {
            legend: {
              display: false,
              position: "top",
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
                boxWidth: 5,
                font: {
                  size: 15,
                  lineHeight: 100,
                  weight: 400,
                  style: "normal",
                  family: "Poppins",
                },
                color: "#7F85A2",
              },
            },
            tooltip: {
              displayColors: false,
              enabled: true,
              backgroundColor: "#F2F5FF",
              yAlign: "bottom",
              position: "custom",
              intersect: true,
              titleColor: ({ tooltipItems }) => {
                return tooltipItems[0]?.dataset?.backgroundColor;
              },
              bodyColor: (tooltip) => {
                if (tooltip.tooltip) {
                  return tooltip.tooltip.labelTextColors[0];
                }
              },
              titleAlign: "center",
              bodyAlign: "center",
              titleFont: {
                family: "Poppins",
                size: 15,
                weight: "bold",
                style: "normal",
                lineHeight: 1.5,
              },
              titleMarginBottom: 1,
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.dataset.label;
                },
                title: (tooltipItem) => {
                  return tooltipItem[0].dataset.data[tooltipItem[0].dataIndex];
                },
              },
            },
            datalabels: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
});

export default OverviewAbsence;
