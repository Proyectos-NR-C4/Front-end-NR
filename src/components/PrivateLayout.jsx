import React from "react";
import { useUser } from "context/userContext";

const PrivateLayout = ({ roleList, children }) => {
  const { userData } = useUser();
  if (roleList.includes(userData.rol)) {
    return children;
  }
  return (
    <div className="text-9xl text-red-500">
      No está autorizado para ver la información de esta página
    </div>
  );
};

export default PrivateLayout;
