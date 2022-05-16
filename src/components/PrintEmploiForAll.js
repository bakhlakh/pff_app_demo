import React, { useEffect, useRef } from "react";
import "../styles/componentStyles/confirmDelete.css";
import { Button } from "@mui/material";
import { useStoreActions } from "easy-peasy";
import { useReactToPrint } from "react-to-print";
import AllEmplois from "./AllEmplois";
const PrintEmploiForAll = ({ handleDelete, cancelOp, date }) => {
  const GWSForAll = useStoreActions((actions) => actions.GWSForAll);
  const [allSeances, setAllSeances] = React.useState([]);
  const AllEmploisRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => AllEmploisRef.current,
  });
  const getAllSeances = async () => {
    try {
      const res = await GWSForAll(date);
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
        <div className="d-none">
          <AllEmplois data={allSeances} ref={AllEmploisRef} />
        </div>
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
            onClick={handlePrint}
          >
            Exporter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrintEmploiForAll;
