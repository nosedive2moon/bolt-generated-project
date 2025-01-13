import React, { useState } from 'react';

    export default function Setup({ numbers, onNumberChange }) {
      const [editing, setEditing] = useState(null);
      const [tempValue, setTempValue] = useState({ value: '', change: '' });

      const handleEdit = (key) => {
        setEditing(key);
        setTempValue({
          value: numbers[key].value,
          change: numbers[key].change
        });
      };

      const handleSave = (key) => {
        const cleanedValue = {
          value: tempValue.value.endsWith('%') ? tempValue.value : `${tempValue.value}%`,
          change: tempValue.change.endsWith('%') ? tempValue.change : `${tempValue.change}%`
        };
        onNumberChange(key, cleanedValue);
        setEditing(null);
      };

      const handleChange = (e, key, field) => {
        const value = e.target.value;
        setTempValue(prev => ({
          ...prev,
          [field]: value
        }));
        const cleanedValue = {
          value: field === 'value' ? (value.endsWith('%') ? value : `${value}%`) : numbers[key].value,
          change: field === 'change' ? (value.endsWith('%') ? value : `${value}%`) : numbers[key].change
        };
        onNumberChange(key, cleanedValue);
      };

      return (
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Setup</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">NAME</th>
                <th className="text-left p-2">VALUE</th>
                <th className="text-left p-2">CHANGE</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(numbers).map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="p-2 capitalize">{key.replace(/_/g, ' ')}</td>
                  <td className="p-2">
                    {editing === key ? (
                      <input
                        type="text"
                        value={tempValue.value.replace('%', '')}
                        onChange={(e) => handleChange(e, key, 'value')}
                        className="border p-1 rounded w-20"
                      />
                    ) : (
                      <span>{value.value}</span>
                    )}
                  </td>
                  <td className="p-2">
                    {editing === key ? (
                      <input
                        type="text"
                        value={tempValue.change.replace('%', '')}
                        onChange={(e) => handleChange(e, key, 'change')}
                        className="border p-1 rounded w-20"
                      />
                    ) : (
                      <span>{value.change}</span>
                    )}
                  </td>
                  <td className="p-2">
                    {editing === key ? (
                      <button
                        onClick={() => handleSave(key)}
                        className="bg-blue-500 text-white px-2 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(key)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
