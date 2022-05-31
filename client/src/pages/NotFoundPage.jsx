import React from "react";
import Button from "@mui/material/Button";
function NotFoundPage() {
  return (
    <>
      <h1>Page inaccessible</h1>
      <Button
        onClick={() => {
          window.location = "/";
        }}
        variant="contained"
        color="primary"
      >
        Retourne à l'accueil
      </Button>
    </>
  );
}

export default NotFoundPage;
