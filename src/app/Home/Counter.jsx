"use client"
import { useState,useEffect } from "react";


export default function Counter ({launchDate}) {

  const calculateTimeLeft = () => {
    const difference = +new Date(launchDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const isLaunched = Object.keys(timeLeft).length === 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });



return (


    <div className="w-full">


       {isLaunched ? (
        <p className="text-green-400 text-xl">🎉 We're Live!</p>
      ) : (
        <div className="flex justify-center gap-5 ">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center !text-white">
              <span className="font-semibold text-5xl ">{value}</span>
              <span className="uppercase !text-xs !text-accent/50">{unit}</span>
            </div>
          ))}
        </div>
      )}

    </div>
)


}