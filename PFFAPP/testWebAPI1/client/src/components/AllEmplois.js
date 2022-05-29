import React from "react";
import WKSCalendar from "./WKSCalendar";
import "../styles/componentStyles/AllEmplois.css";
import Grid from "@mui/material/Grid";
const AllEmplois = React.forwardRef(({ data }, ref) => {
  return (
    <>
      <Grid container spacing={20} ref={ref}>
        {data &&
          data.map((item) => {
            return (
              <Grid
                item
                xs={12}
                key={item.info._Groupe.groupId}
                className="emploiDiv"
              >
                <WKSCalendar data={item}></WKSCalendar>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
});

export default AllEmplois;
