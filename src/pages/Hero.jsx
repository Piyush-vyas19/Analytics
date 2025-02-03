import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaUsers, FaShoppingCart } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <header className="py-10 text-center text-white">
        <h1 className="text-5xl font-extrabold tracking-wide mb-3">
          Analytics Dashboard
        </h1>
        <p className="text-xl font-light">
          Discover insights and drive decisions with your data.
        </p>
      </header>

      {/* Main Cards */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Sales Analysis Card */}
          <div
            onClick={() => handleNavigation('/analytics-page')}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all transform hover:scale-105 cursor-pointer shadow-lg"
          >
            <div className="flex items-center justify-center mb-6">
              <FaChartLine className="text-6xl text-blue-400" />
            </div>
            <h2 className="text-3xl font-semibold text-white mb-3 text-center">
              Sales Analysis
            </h2>
            <p className="text-center text-gray-300 text-lg">
              Dive deep into sales data, track trends, and uncover growth opportunities.
            </p>
          </div>

          {/* Customer Analysis Card */}
          <div
            onClick={() => handleNavigation('/customer-analysis')}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all transform hover:scale-105 cursor-pointer shadow-lg"
          >
            <div className="flex items-center justify-center mb-6">
              <FaUsers className="text-6xl text-green-400" />
            </div>
            <h2 className="text-3xl font-semibold text-white mb-3 text-center">
              Customer Analysis
            </h2>
            <p className="text-center text-gray-300 text-lg">
              Understand customer behavior and demographics to tailor your strategy.
            </p>
          </div>

          {/* Basket Size Analysis Card */}
          <div
            onClick={() => handleNavigation('/basket-size-analysis')}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all transform hover:scale-105 cursor-pointer shadow-lg"
          >
            <div className="flex items-center justify-center mb-6">
              <FaShoppingCart className="text-6xl text-purple-400" />
            </div>
            <h2 className="text-3xl font-semibold text-white mb-3 text-center">
              Basket Size Analysis
            </h2>
            <p className="text-center text-gray-300 text-lg">
              Analyze average basket size and purchasing patterns to optimize sales.
            </p>
          </div>
        </div>
      </main>

      {/* Footer (optional) */}
      <footer className="py-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Analytics Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
