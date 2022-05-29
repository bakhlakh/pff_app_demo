import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Delete, Add, Update } from "@mui/icons-material";
const FiliereCard = (props) => {
  const dipType = (prefix) => {
    if (prefix === "TS") return "Technicien Specialiser";
    if (prefix === "T") return "Technicien";
    if (prefix === "FQ") return "Qualifiante";
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
        marginTop: 5,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {props.data &&
          props.data.map((item, index) => (
            <Grid
              item
              key={item.filiereId}
              xs={4}
              minHeight={200}
              padding={3}
              className="FiliereCard"
              marginRight={5}
              marginBottom={5}
            >
              <div className="btn-group cardButtons">
                <Update
                  onClick={() => {
                    props.setCurrentUpdated(item);
                    props.setUpdateFormVisible(true);
                  }}
                  fontSize="large"
                  color="warning"
                />

                <Delete
                  onClick={() => {
                    props.setConfirmDeleteVisible(true);
                    props.setCurrentUpdated(item);
                    //deleteFiliere(item.filiereId);
                  }}
                  fontSize="large"
                  color="error"
                />

                <Add
                  color="success"
                  fontSize="large"
                  onClick={() => {
                    props.setCurrentUpdated(item);
                    props.setModulesFormVisible(true);
                  }}
                />
              </div>
              <div className="d-flex w-100 ">
                <h5 className="mb-1">
                  {item.nomFiliere + "  -  " + item.filiereId}
                </h5>
              </div>
              <p className="m-2">{item.description}</p>
              <small>{dipType(item.typeDiplome)}</small>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default FiliereCard;
