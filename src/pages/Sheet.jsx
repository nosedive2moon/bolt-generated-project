import React, { useState } from 'react';

const initialData = [
  // ... (keep all your existing data)
];

const getRatingColor = (rating) => {
  switch (rating) {
    case 'buy': return 'text-green-500';
    case 'sell': return 'text-red-500';
    case 'flat': return 'text-gray-500';
    default: return 'text-gray-500';
  }
};

const getNewsColor = (news) => {
  switch (news) {
    case 'upcoming': return 'text-yellow-600';
    case 'released': return 'text-blue-600';
    default: return 'text-gray-500';
  }
};

const Sheet = () => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  const getSignalColor = (signal) => {
    switch (signal) {
      case '+': return 'text-green-500';
      case '-': return 'text-red-500';
      case 'o': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="sheet-container p-6">
      <h1 className="text-3xl font-bold mb-8">Equities Screener</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              {['Symbol', 'Name', 'Price', 'Change', 'Volume', 'Market Cap', 'Sector', 'Rating', 'News', 'Signal'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort(header.toLowerCase().replace(' ', '_'))}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${item.price.toFixed(2)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  item.change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.change > 0 && '+'}{item.change}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.volume.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.marketCap}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.sector}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${getRatingColor(item.rating)}`}>
                  {item.rating}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getNewsColor(item.news)}`}>
                  {item.news}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${getSignalColor(item.signal)}`}>
                  {item.signal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sheet;
