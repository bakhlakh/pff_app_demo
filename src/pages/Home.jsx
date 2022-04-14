import React from "react";
import Side from "../components/Side";
import { useStoreState, useStoreActions } from "easy-peasy";
function Home() {
  const user = useStoreState((state) => state.user);
  console.log("user", user);
  return (
    <>
      <Side></Side>
      <div className="container">
        <h1>Hello {user?.user.firstName}</h1>
      </div>
    </>
  );
}

export default Home;
