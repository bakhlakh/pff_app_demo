import React, { useState } from "react";
import "./css/searchBar.css";
function Searchbar({ searchItem, handleChange }) {
  const [searchText, setSearchText] = useState("");
  const handleTextChange = (e) => {
    setSearchText(e.target.value);
    handleChange(e.target.value);
  };
  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder={"Recherche par ID " + searchItem}
        aria-label="Recherche Filiere"
        aria-describedby="button-addon2"
        id="rechercheFilere"
        value={searchText}
        onChange={(e) => handleTextChange(e)}
      />
    </>
  );
}

export default Searchbar;
