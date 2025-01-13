import React, { useState } from 'react';

    const initialData = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 189.25,
        change: 1.23,
        volume: 12345678,
        marketCap: '2.8T',
        signal: '+'
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 134.56,
        change: -0.45,
        volume: 9876543,
        marketCap: '1.4T',
        signal: '-'
      },
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 240.12,
        change: 3.12,
        volume: 5678901,
        marketCap: '800B',
        signal: 'o'
      },
      {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 128.34,
        change: 0.78,
        volume: 3456789,
        marketCap: '1.3T',
        signal: '+'
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 328.45,
        change: 2.34,
        volume: 2345678,
        marketCap: '2.5T',
        signal: '-'
      }
    ];

    export default function Sheet() {
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
        <div className="sheet-container">
          <h1 className="text-3xl font-bold mb-8">Equities Screener</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('symbol')}
                  >
                    Symbol {sortConfig.key === 'symbol' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('name')}
                  >
                    Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('price')}
                  >
                    Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('change')}
                  >
                    Change {sortConfig.key === 'change' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('volume')}
                  >
                    Volume {sortConfig.key === 'volume' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('marketCap')}
                  >
                    Market Cap {sortConfig.key === 'marketCap' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('signal')}
                  >
                    Signal {sortConfig.key === 'signal' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
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
    }
