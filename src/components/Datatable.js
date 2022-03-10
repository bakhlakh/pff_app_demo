import React from "react";
import axios from "axios";
const api = axios.create({ baseURL: "https://localhost:7161/" });

function Datatable({ data }) {
  let columns = data[0] && Object.keys(data[0]);
  //DELETE MODULE CODE
  const deleteModule = (id) => {
    api.delete("/api/Modules/" + id);
  };
  return (
    <>
      <div className="container table-responsive-sm">
        <table
          className={data[0] && columns[0] + " table"}
          cellSpacing={0}
          cellPadding={0}
        >
          <thead className="thead-dark">
            <tr>
              {data[0] &&
                columns.map((col, index) => {
                  return <th key={index}>{col}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {data[0] &&
              data.map((row, index) => (
                <tr key={Math.random()}>
                  {columns.map((column) => (
                    <td key={Math.random()}>{row[column]}</td>
                  ))}
                  {
                    <td key={Math.random()}>
                      <div className="d-flex">
                        <button className="btn btn-warning m-2">Update</button>
                        <button
                          id="deleteModuleBtn"
                          className="btn btn-danger m-2"
                          onClick={() => {
                            console.log("row", row);
                            deleteModule(row[columns[0]]);
                            window.location.reload();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  }
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Datatable;
