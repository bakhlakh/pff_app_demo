import React from "react";

function MessageBox({ type, message, id, cancelOp }) {
  setTimeout(cancelOp, 1200);
  if (!id) {
    if (type === "OK") id = "OK";
    else id = "ERR";
  }
  if (type === "ERR") {
    return (
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
        id={id}
      >
        <strong>Error!</strong> {message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => {
            cancelOp();
          }}
        ></button>
      </div>
    );
  } else if (type === "OK") {
    return (
      <div className="alert alert-success" id={id}>
        <h4 className="alert-heading">OK!</h4>
        <p>{message}</p>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => {
            cancelOp();
          }}
        ></button>
      </div>
    );
  } else {
    return <></>;
  }
}

export default MessageBox;