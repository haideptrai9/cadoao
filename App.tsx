
import React, { useState, useContext } from 'react';
import { AppContext } from './context/AppContext';
import Header from './components/Header';
import MatchList from './components/MatchList';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Chatbot from './components/Chatbot';
import { useGameEngine } from './hooks/useGameEngine';
import { HomeIcon, ChartBarIcon, ClockIcon } from './components/icons/Icons';

type View = 'betting' | 'dashboard' | 'history';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('betting');
  const { matches, bets } = useContext(AppContext);
  
  // Initialize the game engine to simulate matches
  useGameEngine();

  const renderView = () => {
    switch (currentView) {
      case 'betting':
        return <MatchList matches={matches} />;
      case 'dashboard':
        return <Dashboard />;
      case 'history':
        return <History bets={bets} matches={matches} />;
      default:
        return <MatchList matches={matches} />;
    }
  };

  const NavItem = ({ view, label, icon }: { view: View, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col md:flex-row items-center justify-center md:justify-start w-full md:w-auto px-4 py-3 md:py-2 rounded-lg transition-colors duration-200 ${
        currentView === view ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="mt-1 md:mt-0 md:ml-3 text-sm md:text-base font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-2 md:p-4 lg:p-6 flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="sticky top-24 bg-gray-800 p-2 rounded-xl shadow-lg flex md:flex-col justify-around md:justify-start md:space-y-2">
            <NavItem view="betting" label="Betting Board" icon={<HomeIcon />} />
            <NavItem view="dashboard" label="Dashboard" icon={<ChartBarIcon />} />
            <NavItem view="history" label="Bet History" icon={<ClockIcon />} />
          </nav>
        </aside>
        <div className="flex-grow">
          {renderView()}
        </div>
      </main>
      <Chatbot />
    </div>
  );
}
