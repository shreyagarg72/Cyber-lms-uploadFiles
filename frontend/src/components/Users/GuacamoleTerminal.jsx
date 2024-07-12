// GuacamoleTerminal.jsx
import React from "react";
import { useLocation } from "react-router-dom";
const GuacamoleTerminal = () => {
  const location = useLocation();
  const { token } = location.state || {};
  return (
    <div>
        <iframe
          src={"http://115.113.39.74:65531/#/"}
          title="Guacamole Terminal"
          width="100%"
          height="400px"
          style={{ border: "none" }}
        ></iframe>
      
    </div>
  );
};

export default GuacamoleTerminal;
