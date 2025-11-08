import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Alert {
  tipo: 'warning' | 'danger';
  titulo: string;
  mensaje: string;
  accion: string;
}

interface AlertsSectionProps {
  alerts: Alert[];
}

const AlertsSection: React.FC<AlertsSectionProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="mb-6 space-y-4">
      {alerts.map((alert, index) => (
        <div key={index} 
             className={`rounded-xl border-l-4 p-4 sm:p-6 shadow-md ${
               alert.tipo === 'danger'
                 ? 'bg-red-50 border-red-500'
                 : 'bg-yellow-50 border-yellow-500'
             }`}>
          <div className="flex items-start space-x-3">
            <AlertTriangle className={`w-6 h-6 mt-1 flex-shrink-0 ${
              alert.tipo === 'danger' ? 'text-red-500' : 'text-yellow-500'
            }`} />
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-base sm:text-lg mb-2 ${
                alert.tipo === 'danger' ? 'text-red-800' : 'text-yellow-800'
              }`}>
                {alert.titulo}
              </h4>
              <p className={`mb-3 text-sm sm:text-base ${
                alert.tipo === 'danger' ? 'text-red-700' : 'text-yellow-700'
              }`}>
                {alert.mensaje}
              </p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                alert.tipo === 'danger'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                📋 Acción: {alert.accion}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsSection;