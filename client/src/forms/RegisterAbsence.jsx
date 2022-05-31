import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useStoreActions } from "easy-peasy";
function RegisterAbsence(props) {
  const columns = [{}];
  const getStagiairesByGroup = useStoreActions(
    (actions) => actions.stagiaire.getStagiairesByGroup
  );
  const [stagiaires, setStagiaires] = useState([]);
  const getData = async () => {
    const res = await getStagiairesByGroup(props.groupId);
    setStagiaires(res);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="absenceFormContainer">
        <div className="absenceFormContainer">
          <DataGrid
            columns={columns}
            rows={[stagiaires]}
            rowHeight={50}
            rowCount={1}
            rowHeightMode="fixed"
            height={500}
            width={500}
            minColumnWidth={100}
            minRowHeight={50}
            maxColumnWidth={500}
            maxRowHeight={500}
          />
        </div>
      </div>
    </>
  );
}

export default RegisterAbsence;
