import React from "react";
import { Link } from "@webiny/react-router";
import { FiBell } from "react-icons/fi";

const Notification = () => {
  return (
    <Link to={"/notifications"}>
      <FiBell color="#FFFFFF" size={28} />
    </Link>
  );
}

export default Notification;
