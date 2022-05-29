import React from "react";
import { Field, ErrorMessage } from "formik";

function TextareaFormik({ ...props }) {
  const { name, ...rest } = props;
  return (
    <>
      <Field as="textarea" id={name} name={name} {...rest} value={rest.value} />
      <ErrorMessage name={name} component="div" className="error" />
    </>
  );
}

export default TextareaFormik;
