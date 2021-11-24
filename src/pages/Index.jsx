import React from 'react';
import imagen from '../assets/img/imagen-fondo.ico'

const Index = () => {
  return (
    <div>
      <div className='bg-green-300 h-96'>
        <img className='w-full h-full' src={imagen} alt="Imagen de fondo" />
      </div>
      <div className='bg-green-300 h-96'>Index page</div>
      <div className='bg-green-300 h-96'>Index page</div>
      <div className='bg-green-300 h-96'>Index page</div>
      </div>
  );
};

export default Index;
