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

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

    const sampleData = [
      { branch: 'Technology', value: 75, signal: '+' },
      { branch: 'Finance', value: -40, signal: '-' },
      { branch: 'Healthcare', value: 20, signal: 'o' },
      { branch: 'Energy', value: -60, signal: '+' },
      { branch: 'USD', value: 45, signal: '+' },
      { branch: 'EUR', value: -30, signal: '-' },
    ];

    export default function Dashboard() {
      const [message, setMessage] = useState('');
      const [chatHistory, setChatHistory] = useState([]);
      const [isChatOpen, setIsChatOpen] = useState(false);

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
            min: -100,
            max: 100,
            ticks: {
              callback: (value) => `${value}%`,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const data = sampleData[context.dataIndex];
                return `${data.branch}: ${data.value}% (Signal: ${data.signal})`;
              },
            },
          },
        },
      };

      const totalPosition = sampleData.reduce((sum, item) => sum + item.value, 0);
      const profitLoss = sampleData.filter(item => item.value > 0).reduce((sum, item) => sum + item.value, 0);

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

      return (
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-md">
            <div className="p-6 border-b">
              <h1 className="text-xl font-bold text-blue-600">TradingView</h1>
            </div>
            <nav className="p-4">
              <ul className="space-y-4">
                <li className="text-blue-600 font-semibold">Dashboard</li>
                <li className="text-gray-600">News</li>
                <li className="text-gray-600">Simulation</li>
                <li className="text-gray-600">Tickets</li>
                <li className="text-gray-600">Sheet</li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Header */}
            <header className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search here"
                  className="px-4 py-2 border rounded-md"
                />
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              </div>
            </header>

            {/* Cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {[
                { label: "Total Position", value: `${totalPosition}%`, change: totalPosition >= 0 ? "+" : "-", color: totalPosition >= 0 ? "green" : "red" },
                { label: "Profit & Loss", value: `${profitLoss}%`, change: profitLoss >= 0 ? "+" : "-", color: profitLoss >= 0 ? "green" : "red" },
                { label: "Technology", value: "75%", change: "+12.8%", color: "green" },
                { label: "Finance", value: "-40%", change: "-3.1%", color: "red" },
              ].map((card, index) => (
                <div
                  key={index}
                  className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
                >
                  <h3 className="text-gray-600 text-sm font-medium">{card.label}</h3>
                  <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                  <p
                    className={`text-sm font-semibold mt-1 ${
                      card.color === "green" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {card.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Positions Overview</h3>
                <div className="h-96">
                  <Bar data={chartData} options={options} />
                </div>
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
          </main>
        </div>
      );
    }
