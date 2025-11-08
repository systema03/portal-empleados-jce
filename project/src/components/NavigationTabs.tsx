import React from 'react';
import { DollarSign, Clock, FileText, Calendar } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white rounded-xl shadow-md mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('nomina')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'nomina'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <DollarSign className="w-4 h-4 inline mr-2" />
            Nómina
          </button>
          <button
            onClick={() => setActiveTab('asistencia')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'asistencia'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Asistencia y Ponchado
          </button>
          <button
            onClick={() => setActiveTab('prestamos')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'prestamos'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Solicitar Préstamo
          </button>
          <button
            onClick={() => setActiveTab('vacaciones')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'vacaciones'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Solicitar Vacaciones
          </button>
        </nav>
      </div>
    </div>
  );
};

export default NavigationTabs;