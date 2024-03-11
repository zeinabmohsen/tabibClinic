import React, { useState } from 'react';

// Sample schedule data
const Schedules = [
  { day: 'Monday', startTime: '09:00', endTime: '17:00' },
  { day: 'Tuesday', startTime: '08:00', endTime: '16:00' },
  { day: 'Wednesday', startTime: '08:30', endTime: '17:30' },
  { day: 'Thursday', startTime: '09:30', endTime: '18:30' },
  { day: 'Friday', startTime: '07:00', endTime: '15:00' },
];

const ScheduleTable = () => {
  const [startTimes, setStartTimes] = useState(Schedules.map(schedule => schedule.startTime));
  const [endTimes, setEndTimes] = useState(Schedules.map(schedule => schedule.endTime));

  const handleStartTimeChange = (index, event) => {
    const newStartTimes = [...startTimes];
    newStartTimes[index] = event.target.value;
    setStartTimes(newStartTimes);
  };

  const handleEndTimeChange = (index, event) => {
    const newEndTimes = [...endTimes];
    newEndTimes[index] = event.target.value;
    setEndTimes(newEndTimes);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Day
            </th>
            <th scope="col" className="px-6 py-3">
              Start Time
            </th>
            <th scope="col" className="px-6 py-3">
              End Time
            </th>
          </tr>
        </thead>
        <tbody>
          {Schedules.map((schedule, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b dark:bg-gray-800 dark:border-gray-700`}>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{schedule.day}</td>
              <td className="px-6 py-4">
                <input 
                  type="time" 
                  value={startTimes[index]} 
                  onChange={event => handleStartTimeChange(index, event)} 
                  className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </td>
              <td className="px-6 py-4">
                <input 
                  type="time" 
                  value={endTimes[index]} 
                  onChange={event => handleEndTimeChange(index, event)} 
                  className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;