import React from "react";
import { Spinner } from "react-bootstrap";

/**
 * Loader function is used to load pages
 */
function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "100px",
        width: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

export default Loader;
