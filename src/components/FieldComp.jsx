import React, { useState } from "react";
import { useField, ErrorMessage } from "formik";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
export const FieldComp = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormControl sx={{ mb: 1, width: "100%" }} variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          color={meta.error && meta.touched ? "warning" : "primary"}
        >
          {props.label}
        </InputLabel>
        <OutlinedInput
          {...props}
          {...field}
          error={meta.error && meta.touched}
        />
      </FormControl>
      <ErrorMessage name={field.name} className="error" component="div" />
    </>
  );
};
