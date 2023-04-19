import React from "react";

import HashLoader from "react-spinners/HashLoader";

const override = {
  display: "block",
  margin: "auto",
  height: "100vh",
};

function Spinner() {
  return <HashLoader color="#4299E1" cssOverride={override} />;
}

export default Spinner;
