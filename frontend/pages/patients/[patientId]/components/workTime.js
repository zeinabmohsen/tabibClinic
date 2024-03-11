import React, { useState } from 'react';
import TimePicker from 'react-time-picker'; 

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const WorkTimeTable = ({ workTimeData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(new Array(workTimeData?.length || 0).fill(false)); // Track editing state for each entry

  const handleEdit = (rowIndex, fieldName, newValue) => {
    // Update workTimeData based on fieldName and newValue
    // Call onUpdate to persist changes if applicable
    const updatedWorkTimeData = [...workTimeData];
    updatedWorkTimeData[rowIndex][fieldName] = newValue;
    onUpdate(updatedWorkTimeData);
  };

  // Placeholder data
  const initialData = [
    { day: 'Monday', start: '09:00', end: '17:00' },
    { day: 'Tuesday', start: '09:00', end: '17:00' },
    { day: 'Wednesday', start: '09:00', end: '17:00' },
    { day: 'Thursday', start: '09:00', end: '17:00' },
    { day: 'Friday', start: '09:00', end: '17:00' },
  ];

  // If workTimeData is not provided, use initialData as default
  workTimeData = workTimeData || initialData;

  return (
    <table className="table-auto w-full border border-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b border-gray-200 font-bold">Day</th>
          <th className="px-4 py-2 border-b border-gray-200 font-bold">Start Time</th>
          <th className="px-4 py-2 border-b border-gray-200 font-bold">End Time</th>
          {/* Add Break columns if needed */}
          <th className="px-4 py-2 border-b border-gray-200 font-bold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {workTimeData.map((entry, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="px-4 py-2 border border-gray-200">
              {entry.day}
              {/* Edit button if isEditing[index] is true */}
              {isEditing[index] && (
                <select value={entry.day} onChange={(e) => handleEdit(index, 'day', e.target.value)}>
                  {weekdays.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              )}
            </td>
            <td className="px-4 py-2 border border-gray-200">
              {isEditing[index] ? (
                <TimePicker
                  value={entry.start}
                  onChange={(value) => handleEdit(index, 'start', value)}
                />
              ) : (
                entry.start
              )}
            </td>
            {/* Similar structure for End Time and Breaks */}
            <td className="px-4 py-2 border border-gray-200">
              {isEditing[index] ? (
                // Edit actions (TimePicker if needed)
                <TimePicker
                  value={entry.end}
                  onChange={(value) => handleEdit(index, 'end', value)}
                />
              ) : (
                // Display end time
                entry.end
              )}
            </td>
            <td className="px-4 py-2 border border-gray-200">
              {isEditing[index] ? (
                // Save and Cancel buttons
                <div>
                  <button onClick={() => setIsEditing(prevState => prevState.map((state, i) => i === index ? !state : state))}>Save</button>
                  <button onClick={() => setIsEditing(prevState => prevState.map((state, i) => i === index ? !state : state))}>Cancel</button>
                </div>
              ) : (
                // Edit and Delete buttons
                <div>
                  <button onClick={() => setIsEditing(prevState => prevState.map((state, i) => i === index ? !state : state))}>Edit</button>
                  <button onClick={() => console.log('Delete')}>Delete</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkTimeTable;
