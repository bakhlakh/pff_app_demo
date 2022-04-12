import React from "react";
import Side from "../components/Side";
import { useStoreState, useStoreActions } from "easy-peasy";
function Home() {
  const user = useStoreState((state) => state.currentUser);
  console.log("user", user);
  return (
    <>
      <Side></Side>
      <div className="container">
        <h1>Hello {user?.UserName}</h1>
      </div>
    </>
  );
}

export default Home;
