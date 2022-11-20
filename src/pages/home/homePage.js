import React, { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";
import Travel from "./travel";

export default function Home() {
  function logout() {}
  return (
    <div>
      <button onClick={logout}>Log Out</button>
      <Travel />
      <Travel />
    </div>
  );
}
