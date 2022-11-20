import React, { useEffect, useState } from "react";

export default function Travel(props) {
  const [like, setLike] = useState(false);

  function clickLike() {
    setLike((prev) => !prev);
  }

  return (
    <div>
      <h1>Dojebna wycieczka</h1>
      <p>
        ajadfosij foijaoip fjaopijf oiajs foisaj oiasdj oidfsaj oiasj
        oijsdfaoijsaoiphjgs9uhgo idzgfoijg oijaoisdgn gsda
      </p>
    </div>
  );
}
