import React, { useEffect } from "react";
import "../styles/componentStyles/confirmDelete.css";
import { Button } from "@mui/material";
import { useStoreActions } from "easy-peasy";
const PrintEmploiForAll = ({ handleDelete, cancelOp }) => {
  const GWSForAll = useStoreActions((actions) => actions.GWSForAll);
  const [allSeances, setAllSeances] = React.useState([]);
  console.log("allSeances", allSeances);
  const getAllSeances = async () => {
    try {
      const res = await GWSForAll();
      setAllSeances(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllSeances();
    //eslint-disable-next-line
  }, []);
  return (
    <div id="myModal" className="modal">
      <div className="deleteBoxContent">
        <div className="modal-footer">
          <Button
            variant="contained"
            type="submit"
            sx={{
              borderRadius: "0px",
              marginRight: "20px",
              backgroundColor: "gray",
            }}
            onClick={cancelOp}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="success"
            sx={{
              borderRadius: "0px",
              marginRight: "20px",
            }}
            onClick={handleDelete}
          >
            Exporter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrintEmploiForAll;
