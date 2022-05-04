import React from "react";
import NewSide from "../components/NewSide";
import { useStoreState } from "easy-peasy";
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
