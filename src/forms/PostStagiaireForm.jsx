import React, { useEffect } from "react";
import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./css/moduleForm.css";
import "./css/PostStagiaireForm.css";
import { FieldComp } from "../components/FieldComp";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";

function PostStagiaireForm({ handleClick, cancelOp }) {
  const api = useStoreState((store) => store.api);
  const getFilieres = useStoreActions((actions) => actions.getFilieres);
  const groupes = useStoreState((state) => state.groupes);
  return (
    <>
      <Formik
        initialValues={{
          txt_idModule: "",
          txt_Intitule: "",
          txt_descriptionModule: "",
        }}
        onSubmit={async (values) => {}}
      >
        <Form>
          <div id="myModal" className="modal" style={{ display: "block" }}>
            <div className="modal-content">
              <div id="modalContainer">
                <FieldComp
                  type="text"
                  name="txt_CIN"
                  id="txt_CIN"
                  label="CIN"
                />
                <FieldComp
                  type="text"
                  name="txt_Nom"
                  id="txt_Nom"
                  label="Nom"
                />
                <FieldComp
                  type="text"
                  name="txt_Prenom"
                  id="txt_Prenom"
                  label="Prenom"
                />
                <FieldComp
                  type="Email"
                  name="txt_Email"
                  id="txt_Email"
                  label="Email"
                />
                <FieldComp
                  type="text"
                  name="txt_Phone"
                  id="txt_Phone"
                  label="Telephone"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Date Naissance"
                    inputformat="yyyy/mm/dd"
                    value={new Date("2014-08-18T21:11:54")}
                    onChange={() => {}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <div className="modalBtns mt-2">
                  <button
                    id="modalCancelBtn"
                    className="btn btn-secondary"
                    onClick={cancelOp}
                  >
                    Cancel
                  </button>
                  <button
                    id="modalAjouterBtn"
                    className="btn"
                    onClick={() => {}}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default PostStagiaireForm;
