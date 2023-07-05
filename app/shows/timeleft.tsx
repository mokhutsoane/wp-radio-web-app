'use client';
import React, { useEffect, useState } from 'react';

interface TimeLeftProps {
  end: string;
}

const TimeLeft: React.FC<TimeLeftProps> = ({ end }) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);


  useEffect(() => {
    const [hours, minutes] = end.split(':');

    const calculateTimeLeft = () => {
      const currentTime = new Date();
      const endTime = new Date();
      endTime.setHours(Number(hours));
      endTime.setMinutes(Number(minutes));
      endTime.setSeconds(0);

      const timeDiff = endTime.getTime() - currentTime.getTime();

      if (timeDiff <= 0) {
        setTimeLeft('Show ended');
      } else {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    const intervalId = setInterval(calculateTimeLeft, 1000);

    calculateTimeLeft(); // Call initially to set the initial time left

    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component unmounts
    };
  }, [end]);

  return (
    <div className="font-medium text-gray-100 group-hover:text-gray-50">
      {timeLeft}
    </div>
  );
};

export default TimeLeft;
