import React from "react";
import Side from "../components/Side";
import NewSide from "../components/NewSide";
import { useStoreState, useStoreActions } from "easy-peasy";
function Home() {
  const user = useStoreState((state) => state.user);
  return (
    <>
      <NewSide />
      <div className="">
        <h1>Hello {user?.firstName}</h1>
      </div>
    </>
  );
}

export default Home;
