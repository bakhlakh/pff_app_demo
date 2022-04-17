import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Formik, Form, ErrorMessage } from "formik";
import { FieldComp } from "../components/FieldComp";
import * as Yup from "yup";
import {
  DesktopDatePicker,
  LocalizationProvider,
  AdapterDateFns,
} from "@mui/lab";
import {
  Grid,
  Paper,
  styled,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  CssBaseline,
} from "@mui/material";
import "./css/PostSeance.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function PostSeance({ handleClick, cancelOp }) {
  const getRooms = useStoreActions((actions) => actions.getRooms);
  const rooms = useStoreState((state) => state.rooms);

  return (
    <>
      <Formik>
        <Form>
          <div
            className="myFormContainer"
            onClick={() => {
              cancelOp();
            }}
          >
            <div className="formContent">
              <CssBaseline />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FieldComp
                    type="text"
                    name="txt_Title"
                    id="txt_Title"
                    label="Title"
                  />
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default PostSeance;
