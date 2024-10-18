import React, { useState, useEffect } from "react";
import { useDrinkingSchedule } from "../contexts/DrinkingScheduleContext";

const Home = () => {
  const [glassCount, setGlassCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isDrinkTime, setIsDrinkTime] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogue, setDialogue] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const { drinkSchedule } = useDrinkingSchedule();

  const angryDialogues = [
    "It is time to drink!",
    "Hydrate, human!",
    "Water, now!",
    "Seriously? I'm parched! Drink up already!",
  ];

  const happyDialogues = [
    "Yay! You found me!",
    "Keep up the good work!",
    "You're doing great!",
    "Sip for a clear mind!",
    "Water = glow-up!"
  ];

  const resetGlassCountIfMidnight = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours === 0 && minutes === 0) {
      setGlassCount(0);
      localStorage.setItem("glassCount", 0);
      setIsComplete(false);
    }
  };

  useEffect(() => {
    const storedGlassCount = parseInt(localStorage.getItem("glassCount")) || 0;
    setGlassCount(storedGlassCount);

    resetGlassCountIfMidnight();

    if (storedGlassCount >= 10) {
      setIsComplete(true);
    }
  }, []);

  useEffect(() => {
    const checkTime = () => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const currentTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

      let isDrinkTimeNow = false;
      for (let i = 0; i < drinkSchedule.length; i++) {
        if (drinkSchedule[i] === currentTime) {
          isDrinkTimeNow = true;
          break;
        }
      }

      if (isDrinkTimeNow) {
        if (!buttonClicked) {
          setIsDrinkTime(true);
          setIsButtonDisabled(false);
        }
      } else {
        if (buttonClicked) {
          setButtonClicked(false);
          setIsButtonDisabled(true);
          setIsDrinkTime(false);
        }
      }
    };

    const timer = setInterval(checkTime, 60000);
    checkTime();

    return () => clearInterval(timer);
  }, [drinkSchedule, buttonClicked]);

  const handleClick = () => {
    resetGlassCountIfMidnight();

    if (isDrinkTime && !isButtonDisabled && !buttonClicked) {
      setGlassCount((prevGlassCount) => {
        const newGlassCount = prevGlassCount + 1;

        localStorage.setItem("glassCount", newGlassCount);

        if (newGlassCount === 10) {
          setIsComplete(true);
        }

        return newGlassCount;
      });

      setIsDrinkTime(false);
      setIsButtonDisabled(true);
      setButtonClicked(true);
    }
  };

  const cactusInteraction = () => {
    if (isDrinkTime) {
      setDialogue(
        angryDialogues[Math.floor(Math.random() * angryDialogues.length)]
      );
    } else {
      setDialogue(
        happyDialogues[Math.floor(Math.random() * happyDialogues.length)]
      );
    }
    setShowDialogue(true);

    setTimeout(() => {
      setShowDialogue(false);
    }, 40000);
  };

  return (
    <div className="w-screen">
      <div className="p-5 w-[500px] flex flex-col justify-center items-center mt-20 m-auto rounded-[10px]">
        <img
          src="/assets/cactus.png"
          alt="Cactus"
          className="w-[200px] cursor-pointer"
          onClick={cactusInteraction}
        />

        {showDialogue && <div className="border-black border-[1px] p-2 rounded-[5px] w-[300px] mb-5"><p className="mt-2 mb-5 text-[20px]">{dialogue}</p></div> }

        {isComplete ? (
          <>
            <p className="font-bold text-[30px]">
              {glassCount} / 10 Glasses
              <span>
                <img
                  src="/assets/glass-icon.png"
                  alt="glass-icon"
                  className="inline w-[40px]"
                />
              </span>
            </p>
            <p className="text-[30px] text-green-600">
              You completed your water intake! 🎉
            </p>
          </>
        ) : (
          <>
            <p className="font-bold text-[30px]">
              {glassCount} / 10 Glasses{" "}
              <span>
                <img
                  src="/assets/glass-icon.png"
                  alt="glass-icon"
                  className="inline w-[40px]"
                />
              </span>
            </p>
            <p className="text-[30px] mt-[20px]">
              {isDrinkTime ? (
                <span className="animate-pulse">
                  Time to drink water!
                </span>
              ) : (
                `Next drink at ${drinkSchedule[0]} ⏰`
              )}
            </p>
            <button
              onClick={handleClick}
              disabled={isButtonDisabled}
              className={`rounded-[5px] text-[20px] bg-green-500 p-2 w-[200px] text-white mt-[30px] ${
                isButtonDisabled ?
                  "bg-gray-200 cursor-not-allowed"
                  : "hover:bg-green-600"
              }`}
            >
              I drank!
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
