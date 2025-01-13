import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import TradingViewDashboard from './pages/TradingViewDashboard';
import News from './pages/News';
import Simulation from './pages/Simulation';
import Tickets from './pages/Tickets';
import Sheet from './pages/Sheet';
import Setup from './pages/Setup';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

function App() {
  const [numbers, setNumbers] = useState({
    total_position: { value: '1.46 Mio', change: '+2.5%' },
    profit_loss: { value: '6.4 k', change: '-3.1%' },
    usd_exposure: { value: '4 FUT', change: '+12.8%' },
    btc_exposure: { value: '240 k', change: '-5.2%' },
    health: { value: '200,000', change: '+1.2%' },
    energy: { value: '-600,000', change: '-2.3%' },
    tech: { value: '450,000', change: '+0.8%' },
    miners: { value: '-300,000', change: '-1.5%' },
    crypto: { value: '150,000', change: '+3.2%' },
    finance: { value: '-400,000', change: '-4.1%' },
    military: { value: '800,000', change: '+2.1%' },
    infra: { value: '-200,000', change: '-0.8%' }
  });

  const handleNumberChange = (key, value) => {
    setNumbers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<TradingViewDashboard numbers={numbers} />} />
            <Route path="/news" element={<News />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/sheet" element={<Sheet />} />
            <Route 
              path="/setup" 
              element={<Setup numbers={numbers} onNumberChange={handleNumberChange} />} 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/news', label: 'News' },
    { path: '/simulation', label: 'Simulation' },
    { path: '/tickets', label: 'Tickets' },
    { path: '/sheet', label: 'Sheet' }
  ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6 border-b flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">TradingView</h1>
        <Link to="/setup" className="text-gray-600 hover:text-blue-600">
          <Cog6ToothIcon className="h-6 w-6" />
        </Link>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded transition-colors duration-200 ${
                  activeItem === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
                onClick={() => setActiveItem(item.path)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default App;
