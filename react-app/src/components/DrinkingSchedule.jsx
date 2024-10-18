import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDrinkingSchedule } from '../contexts/DrinkingScheduleContext';

const DrinkingSchedule = () => {
  const { drinkSchedule, setDrinkSchedule } = useDrinkingSchedule();
  const glasses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const navigate = useNavigate();

  useEffect(() => {

    const storedSchedule = JSON.parse(localStorage.getItem('drinkSchedule'));
    
    if (storedSchedule) {
      setDrinkSchedule(storedSchedule);
    }
  }, [setDrinkSchedule]);

  const handleChange = (index, event) => {
    const newSchedule = [...drinkSchedule];
    newSchedule[index] = event.target.value;
    setDrinkSchedule(newSchedule);
  };

  const handleSave = () => {
    localStorage.setItem('drinkSchedule', JSON.stringify(drinkSchedule));
    alert('Drinking schedule saved successfully!');
    navigate('/');
  };

  return (
    <div className="w-screen mt-[50px] mb-[100px] flex flex-col justify-center items-center">
      <h1 className="mb-[30px] text-[30px] font-bold">Drinking Schedule</h1>

      <form action="" className="flex flex-col items-center">
        {glasses.map((glass, index) => (
          <div key={glass} className="flex flex-row mb-[10px]">
            <p className="font-bold text-[20px] mr-[10px]">
              Glass {glass}
              <span>
                <img
                  src="/assets/glass-icon.png"
                  alt="glass-icon"
                  className="inline w-[40px]"
                />
              </span>
            </p>
            <input
              type="text"
              value={drinkSchedule[index] || ""}
              onChange={(event) => handleChange(index, event)}
              className="bg-transparent border-2 border-black-200 p-2 rounded-[5px]"
              placeholder="Enter time"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleSave}
          className="rounded-[5px] text-[20px] bg-green-500 p-2 w-[200px] text-white mt-[30px] hover:bg-green-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default DrinkingSchedule;
