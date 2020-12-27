import React from "react";
import { Link } from "@webiny/react-router";
import { FiGrid } from "react-icons/fi";

const Dashboard = () => {
  return (
    <Link to={"/workspaces"}>
      <FiGrid color="#FFFFFF" size={28} />
    </Link>
  );
}

export default Dashboard;
