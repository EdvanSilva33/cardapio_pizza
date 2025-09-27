import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const BusinessHours = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Horários de funcionamento (24h format)
  const OPENING_HOUR = 18; // 18:00
  const CLOSING_HOUR = 23; // 23:00

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const currentTimeInMinutes = hour * 60 + minutes;
    const openingTimeInMinutes = OPENING_HOUR * 60;
    const closingTimeInMinutes = CLOSING_HOUR * 60;

    const isCurrentlyOpen = currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes < closingTimeInMinutes;
    setIsOpen(isCurrentlyOpen);

    if (isCurrentlyOpen) {
      const closingTime = `${CLOSING_HOUR.toString().padStart(2, '0')}:00 `;
      setStatusMessage(`Aberto até ${closingTime} `);
    } else {
      if (currentTimeInMinutes < openingTimeInMinutes) {
        const openingTime = `${OPENING_HOUR.toString().padStart(2, '0')}:00`;
        setStatusMessage(`Fechado - Abre às ${openingTime}`);
      } else {
        const openingTime = `${OPENING_HOUR.toString().padStart(2, '0')}:00`;
        setStatusMessage(`Fechado - Abre às ${openingTime} de amanhã`);
      }
    }
  }, [currentTime]);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <Clock className="w-5 h-5" />
      <div className="text-sm">
        <p className="font-semibold">Horário de funcionamento</p>
        <p className={`${isOpen ? 'text-green-600' : 'text-red-600'}`}>
          {statusMessage}
        </p>
        <p className="text-xs text-green-600">
          Agora: {formatTime(currentTime)} | Abre: {OPENING_HOUR.toString().padStart(2, '0')}:00 | Fecha: {CLOSING_HOUR.toString().padStart(2, '0')}:00
        </p>
      </div>
    </div>
  );
};

export default BusinessHours;

