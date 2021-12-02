import React from "react";
import imagen from "../assets/img/imagen-fondo.ico";

const Index = () => {
  return (
    <div className="flex w-full h-full bg-green-300 h-96">
      <img className="w-full h-full" src={imagen} alt="Imagen de fondo" />
    </div>
  );
};

export default Index;
