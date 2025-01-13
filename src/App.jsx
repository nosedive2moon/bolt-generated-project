import React, { useState } from 'react';
    import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
            <aside className="w-64 bg-white shadow-md">
              <div className="p-6 border-b flex items-center justify-between">
                <h1 className="text-xl font-bold text-blue-600">TradingView</h1>
                <Link to="/setup" className="text-gray-600 hover:text-blue-600">
                  <Cog6ToothIcon className="h-6 w-6" />
                </Link>
              </div>
              <nav className="p-4">
                <ul className="space-y-4">
                  <li>
                    <Link to="/" className="text-blue-600 font-semibold hover:text-blue-700">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/news" className="text-gray-600 hover:text-blue-600">
                      News
                    </Link>
                  </li>
                  <li>
                    <Link to="/simulation" className="text-gray-600 hover:text-blue-600">
                      Simulation
                    </Link>
                  </li>
                  <li>
                    <Link to="/tickets" className="text-gray-600 hover:text-blue-600">
                      Tickets
                    </Link>
                  </li>
                  <li>
                    <Link to="/sheet" className="text-gray-600 hover:text-blue-600">
                      Sheet
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>

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

    export default App;
