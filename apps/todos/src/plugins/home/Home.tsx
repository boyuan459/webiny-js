import React from "react";
import { useSecurity } from "@webiny/app-security/hooks/useSecurity";

const Home = () => {
  const security = useSecurity();

  if (!security || !security.user) {
    return null
  }

  return (
    <div>Inbox</div>
  ) 
}

export default Home
