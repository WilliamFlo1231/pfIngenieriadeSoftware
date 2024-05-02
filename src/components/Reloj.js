import React, { useState, useEffect } from 'react';

function Reloj() {
  const [horaActual, setHoraActual] = useState(new Date());

  // Función para actualizar la hora cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // El segundo argumento vacío [] indica que useEffect se ejecuta solo una vez al montar el componente

  return (
    <div className="text-center mb-4">
      <h3>Hora actual: {horaActual.toLocaleTimeString()}</h3>
    </div>
  );
}

export default Reloj
