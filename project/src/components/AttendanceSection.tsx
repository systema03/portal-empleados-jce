import React from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { attendanceData } from '../data/attendanceData';

interface AttendanceSectionProps {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

const AttendanceSection: React.FC<AttendanceSectionProps> = ({ 
  selectedMonth, 
  setSelectedMonth 
}) => {
  const currentAttendance = attendanceData[selectedMonth];

  const getStatusIcon = (estado: string) => {
    switch(estado) {
      case 'Puntual': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Tardanza': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'Falta': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (estado: string) => {
    switch(estado) {
      case 'Puntual': return 'text-green-700 bg-green-100';
      case 'Tardanza': return 'text-yellow-700 bg-yellow-100';
      case 'Falta': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <>
      {/* Attendance Section */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Registro de Asistencia y Ponchado
          </h3>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="2025-8">Agosto 2025</option>
            <option value="2025-7">Julio 2025</option>
          </select>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-800">{currentAttendance.resumen.puntual}</div>
            <div className="text-sm text-green-600 font-medium">Días Puntuales</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-800">{currentAttendance.resumen.tardanzas}</div>
            <div className="text-sm text-yellow-600 font-medium">Tardanzas</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-800">{currentAttendance.resumen.faltas}</div>
            <div className="text-sm text-red-600 font-medium">Faltas</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-800">{currentAttendance.resumen.diasTrabajados}</div>
            <div className="text-sm text-blue-600 font-medium">Días Trabajados</div>
          </div>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-700">Fecha</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-700">Hora Entrada</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-700">Hora Salida</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-700">Estado</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-700">Observación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentAttendance.registros.map((registro, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-900">{registro.fecha}</td>
                  <td className="px-3 py-3 text-xs sm:text-sm text-gray-700 font-mono">
                    {registro.entrada}
                    {registro.estado === 'Tardanza' && (
                      <span className="ml-2 text-red-500 text-xs">⚠️</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-xs sm:text-sm text-gray-700 font-mono">{registro.salida}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center">
                      {getStatusIcon(registro.estado)}
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(registro.estado)}`}>
                        {registro.estado}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-xs sm:text-sm text-gray-600">{registro.observacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-medium">Horario Laboral:</span>
            <span className="ml-2">8:00 AM - 5:00 PM</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>Las tardanzas superiores a 15 minutos pueden generar descuentos salariales</span>
          </div>
        </div>
      </div>

      {/* Monthly Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Análisis de Puntualidad</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Porcentaje de Puntualidad:</span>
              <span className="font-bold text-green-600">
                {((currentAttendance.resumen.puntual / currentAttendance.resumen.diasTrabajados) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentAttendance.resumen.puntual / currentAttendance.resumen.diasTrabajados) * 100}%`
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">
              Meta institucional: 95% de puntualidad mensual
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Resumen del Mes</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Mes:</span>
              <span className="font-semibold">{currentAttendance.mes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total de días laborables:</span>
              <span className="font-semibold">22</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Días trabajados:</span>
              <span className="font-semibold">{currentAttendance.resumen.diasTrabajados}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Días restantes:</span>
              <span className="font-semibold">{22 - currentAttendance.resumen.diasTrabajados}</span>
            </div>
            {currentAttendance.resumen.faltas > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Faltas sin justificar:</span>
                <span className="font-semibold">{currentAttendance.resumen.faltas}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceSection;