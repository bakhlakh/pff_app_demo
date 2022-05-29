import React from "react";
import { useField } from "formik";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { FormHelperText } from "@mui/material";

export const FieldComp = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormControl sx={{ mb: 2, width: "100%" }} variant="outlined">
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
        <FormHelperText error={meta.error && meta.touched}>
          {meta.error}
        </FormHelperText>
      </FormControl>
    </>
  );
};
