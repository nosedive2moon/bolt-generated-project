import React, { useState } from 'react';
    import { Bar } from 'react-chartjs-2';
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
    } from 'chart.js';
    import { Link } from 'react-router-dom';

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

    export default function TradingViewDashboard({ numbers }) {
      const [message, setMessage] = useState('');
      const [chatHistory, setChatHistory] = useState([]);
      const [isChatOpen, setIsChatOpen] = useState(false);
      const [biggestPositionsFilter, setBiggestPositionsFilter] = useState('all');
      const [gehandeltFilter, setGehandeltFilter] = useState('aktien');

      const sampleData = [
        { branch: 'Health', value: parseFloat(numbers.health.value.replace(/,/g, '')), signal: '+' },
        { branch: 'Energy', value: parseFloat(numbers.energy.value.replace(/,/g, '')), signal: '-' },
        { branch: 'Tech', value: parseFloat(numbers.tech.value.replace(/,/g, '')), signal: '+' },
        { branch: 'Miners', value: parseFloat(numbers.miners.value.replace(/,/g, '')), signal: '-' },
        { branch: 'Crypto', value: parseFloat(numbers.crypto.value.replace(/,/g, '')), signal: '+' },
        { branch: 'Finance', value: parseFloat(numbers.finance.value.replace(/,/g, '')), signal: '-' },
        { branch: 'Military', value: parseFloat(numbers.military.value.replace(/,/g, '')), signal: '+' },
        { branch: 'Infra', value: parseFloat(numbers.infra.value.replace(/,/g, '')), signal: '-' },
      ];

      const getBarColor = (value, signal) => {
        if (signal === 'o') return 'rgba(128, 128, 128, 0.6)';
        if ((value > 0 && signal === '+') || (value < 0 && signal === '-')) {
          return 'rgba(75, 192, 192, 0.6)';
        }
        return 'rgba(255, 99, 132, 0.6)';
      };

      const chartData = {
        labels: sampleData.map(item => item.branch),
        datasets: [
          {
            label: 'Position',
            data: sampleData.map(item => item.value),
            backgroundColor: sampleData.map(item => getBarColor(item.value, item.signal)),
            borderWidth: 1,
          },
        ],
      };

      const options = {
        scales: {
          y: {
            ticks: {
              callback: (value) => value.toLocaleString(),
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const data = sampleData[context.dataIndex];
                return `${data.branch}: ${data.value.toLocaleString()} (Signal: ${data.signal})`;
              },
            },
          },
        },
      };

      const handleSendMessage = () => {
        if (message.trim()) {
          const newMessage = {
            id: Date.now(),
            user: 'henryconcilio',
            text: message,
            timestamp: new Date().toLocaleTimeString(),
          };

          const aiResponse = {
            id: Date.now() + 1,
            user: 'AI',
            text: `Processing your request: "${message}"`,
            timestamp: new Date().toLocaleTimeString(),
          };

          setChatHistory([...chatHistory, newMessage, aiResponse]);
          setMessage('');
          setIsChatOpen(true);
        }
      };

      const suggestions = [
        "wie sieht meine Auslastung aus, wenn ich alle Positionen in Technologie-Aktien in USD glattstelle?",
        "liste mir die Positionen auf, die short sind und heute eine negative P&L aufweisen",
        "welche Aktien bringen diese Woche Quartalszahlen",
        "erstelle ein Ticket für die Spätschicht mit dem folgenden Inhalt: "
      ];

      const biggestPositionsData = [
        { symbol: 'AAPL', name: 'Apple Inc.', pv: '215k' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', pv: '197k' },
        { symbol: 'TSLA', name: 'Tesla Inc.', pv: '146k' }
      ];

      const gehandeltData = [
        { name: 'Sino', symbol: 'Yamana', pv: '+320k' },
        { name: 'Onvista', symbol: 'D-Wave', pv: '-180k' },
        { name: 'TradeRep', symbol: 'Apple', pv: '+810k' },
        { name: 'DAB2B', symbol: 'Tesla', pv: '+89k' }
      ];

      const dangerousPositionsData = [
        { symbol: 'AMZN', name: 'Amazon.com Inc.', pv: '146k', signal: '-' },
        { symbol: 'MSFT', name: 'Microsoft Corporation', pv: '-18k', signal: '+' },
        { symbol: 'NVDA', name: 'NVIDIA Corporation', pv: '-32k', signal: '+' }
      ];

      return (
        <>
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search here"
                className="px-4 py-2 border rounded-md"
              />
              <div className="w-10 h-10 bg-royalblue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">hc</span>
              </div>
            </div>
          </header>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {[
              { 
                label: "Total Position", 
                value: numbers.total_position.value, 
                change: numbers.total_position.change,
                changeKey: 'total_position',
                color: parseFloat(numbers.total_position.value.replace(/[^0-9.-]/g, '')) >= 0 ? "green" : "red" 
              },
              { 
                label: "Profit & Loss", 
                value: numbers.profit_loss.value, 
                change: numbers.profit_loss.change,
                changeKey: 'profit_loss',
                color: parseFloat(numbers.profit_loss.value.replace(/[^0-9.-]/g, '')) >= 0 ? "green" : "red" 
              },
              { 
                label: "USD Exposure", 
                value: numbers.usd_exposure.value, 
                change: numbers.usd_exposure.change,
                changeKey: 'usd_exposure',
                color: "green" 
              },
              { 
                label: "BTC Exposure", 
                value: numbers.btc_exposure.value, 
                change: numbers.btc_exposure.change,
                changeKey: 'btc_exposure',
                color: "red" 
              },
            ].map((card, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
              >
                <h3 className="text-gray-600 text-sm font-medium">{card.label}</h3>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                <Link
                  to="/setup"
                  className={`text-sm font-semibold mt-1 ${
                    card.color === "green" ? "text-green-500" : "text-red-500"
                  } hover:underline`}
                >
                  {card.change}
                </Link>
              </div>
            ))}
          </div>

          {/* Four Graphics Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Positions Overview */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Positions Overview</h3>
              <div className="h-64">
                <Bar data={chartData} options={options} />
              </div>
            </div>

            {/* Biggest Positions */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Biggest Positions
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => setBiggestPositionsFilter('all')}
                    className={`px-3 py-1 text-sm rounded ${
                      biggestPositionsFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setBiggestPositionsFilter('long')}
                    className={`px-3 py-1 text-sm rounded ${
                      biggestPositionsFilter === 'long' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    Long
                  </button>
                  <button
                    onClick={() => setBiggestPositionsFilter('short')}
                    className={`px-3 py-1 text-sm rounded ${
                      biggestPositionsFilter === 'short' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    Short
                  </button>
                </div>
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Symbol</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">PV</th>
                  </tr>
                </thead>
                <tbody>
                  {biggestPositionsData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.symbol}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.pv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Gehandelt bei Kontrahent */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Gehandelt bei Kontrahent
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => setGehandeltFilter('aktien')}
                    className={`px-3 py-1 text-sm rounded ${
                      gehandeltFilter === 'aktien' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    Aktien
                  </button>
                  <button
                    onClick={() => setGehandeltFilter('branchen')}
                    className={`px-3 py-1 text-sm rounded ${
                      gehandeltFilter === 'branchen' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    Branchen
                  </button>
                </div>
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Symbol</th>
                    <th className="text-left p-2">PV</th>
                  </tr>
                </thead>
                <tbody>
                  {gehandeltData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.symbol}</td>
                      <td className="p-2">{item.pv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dangerous Positions */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Dangerous Positions</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Symbol</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">PV</th>
                    <th className="text-left p-2">Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {dangerousPositionsData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.symbol}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.pv}</td>
                      <td className={`p-2 font-semibold ${
                        item.signal === '+' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {item.signal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Chat</h3>
            {isChatOpen && (
              <div className="h-48 overflow-y-auto mb-4 border-b pb-4">
                {chatHistory.map((msg) => (
                  <div key={msg.id} className={`mb-3 ${msg.user === 'AI' ? 'text-left' : 'text-right'}`}>
                    <div className={`inline-block p-2 rounded-lg ${
                      msg.user === 'AI' ? 'bg-gray-100' : 'bg-blue-100'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 p-2 border rounded-md"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </div>
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  className="block w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </>
      );
    }
