import React from "react";
import { useField, ErrorMessage } from "formik";
export const FieldComp = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="mb-2">
        <input
          className={`form-control shadow-none   ${
            meta.touched && meta.error && "is-invalid"
          } `}
          {...field}
          {...props}
          autoComplete="off"
        />
        <ErrorMessage name={field.name} className="error" component="div" />
      </div>
    </>
  );
};
