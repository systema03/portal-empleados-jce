import React, { useState } from 'react';
import { Users, DollarSign, Calendar, Clock, TrendingUp, AlertTriangle, CheckCircle, XCircle, Eye, FileText, BarChart3 } from 'lucide-react';
import { attendanceData } from '../data/attendanceData';
import { payrollData } from '../data/payrollData';
import { formatCurrency } from '../utils/formatters';

const HRAdminDashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState('overview');

  // Simulated vacation requests data
  const vacationRequests = [
    {
      id: 'VAC-2025-003',
      empleado: 'MARIA RODRIGUEZ SANTOS',
      cedula: '2014-0301',
      fechaSolicitud: '22/08/2025',
      fechaInicio: '05/09/2025',
      fechaFin: '16/09/2025',
      diasSolicitados: 10,
      estado: 'Pendiente',
      departamento: 'DIRECCIÓN DE INFORMÁTICA'
    },
    {
      id: 'VAC-2025-004',
      empleado: 'CARLOS MARTINEZ PEREZ',
      cedula: '2014-0401',
      fechaSolicitud: '20/08/2025',
      fechaInicio: '01/10/2025',
      fechaFin: '12/10/2025',
      diasSolicitados: 10,
      estado: 'En Revisión',
      departamento: 'DEPARTAMENTO ADMINISTRATIVO'
    },
    {
      id: 'VAC-2025-005',
      empleado: 'ANA LUCIA FERNANDEZ',
      cedula: '2014-0501',
      fechaSolicitud: '18/08/2025',
      fechaInicio: '25/08/2025',
      fechaFin: '05/09/2025',
      diasSolicitados: 12,
      estado: 'Aprobado',
      departamento: 'RECURSOS HUMANOS'
    }
  ];

  // Calculate statistics
  const totalEmployees = 156;
  const currentMonthAttendance = attendanceData['2025-8'];
  const attendanceRate = ((currentMonthAttendance.resumen.puntual / currentMonthAttendance.resumen.diasTrabajados) * 100).toFixed(1);
  
  const totalPayroll = Object.values(payrollData).reduce((sum, period) => sum + period.netoAPagar, 0);
  const pendingVacations = vacationRequests.filter(req => req.estado === 'Pendiente').length;

  const getStatusIcon = (estado: string) => {
    switch(estado) {
      case 'Aprobado': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'En Revisión': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'Pendiente': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Rechazado': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (estado: string) => {
    switch(estado) {
      case 'Aprobado': return 'text-green-700 bg-green-100 border-green-200';
      case 'En Revisión': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'Pendiente': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'Rechazado': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <Users className="w-8 h-8 mr-3 text-amber-600" />
              Panel de Control - Recursos Humanos
            </h1>
            <p className="text-gray-600 mt-2">Gestión integral de empleados y procesos de RRHH</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Último acceso</p>
            <p className="font-semibold text-gray-800">{new Date().toLocaleDateString('es-DO')}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setSelectedView('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedView === 'overview'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Resumen General
            </button>
            <button
              onClick={() => setSelectedView('attendance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedView === 'attendance'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Asistencia
            </button>
            <button
              onClick={() => setSelectedView('payroll')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedView === 'payroll'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <DollarSign className="w-4 h-4 inline mr-2" />
              Nómina
            </button>
            <button
              onClick={() => setSelectedView('vacations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedView === 'vacations'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Vacaciones
            </button>
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {selectedView === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Total Empleados</p>
                  <p className="text-3xl font-bold text-blue-800">{totalEmployees}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">+3 este mes</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Puntualidad</p>
                  <p className="text-3xl font-bold text-green-800">{attendanceRate}%</p>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">Meta: 95%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Nómina Mensual</p>
                  <p className="text-3xl font-bold text-amber-800">{formatCurrency(totalPayroll / 3)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-amber-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">Promedio por empleado</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Vacaciones Pendientes</p>
                  <p className="text-3xl font-bold text-orange-800">{pendingVacations}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <AlertTriangle className="w-4 h-4 text-orange-500 mr-1" />
                <span className="text-orange-600">Requieren aprobación</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                Alertas Recientes
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-800">6 empleados con tardanzas frecuentes</p>
                    <p className="text-sm text-yellow-600">Requiere seguimiento disciplinario</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-red-50 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-500 mr-3" />
                  <div>
                    <p className="font-medium text-red-800">2 empleados con faltas sin justificar</p>
                    <p className="text-sm text-red-600">Contactar para documentación</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-blue-800">3 solicitudes de vacaciones pendientes</p>
                    <p className="text-sm text-blue-600">Esperando aprobación</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-amber-600" />
                Actividad Reciente
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50">
                  <div>
                    <p className="font-medium text-green-800">Vacaciones aprobadas</p>
                    <p className="text-sm text-green-600">ANA LUCIA FERNANDEZ - 12 días</p>
                  </div>
                  <span className="text-xs text-green-600">Hoy</span>
                </div>
                <div className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50">
                  <div>
                    <p className="font-medium text-blue-800">Nueva solicitud de vacaciones</p>
                    <p className="text-sm text-blue-600">MARIA RODRIGUEZ SANTOS - 10 días</p>
                  </div>
                  <span className="text-xs text-blue-600">Ayer</span>
                </div>
                <div className="flex items-center justify-between p-3 border-l-4 border-amber-500 bg-amber-50">
                  <div>
                    <p className="font-medium text-amber-800">Nómina procesada</p>
                    <p className="text-sm text-amber-600">Agosto 2025 - 156 empleados</p>
                  </div>
                  <span className="text-xs text-amber-600">2 días</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Attendance Tab */}
      {selectedView === 'attendance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Asistencia - Agosto 2025</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-800">142</div>
                <div className="text-sm text-green-600 font-medium">Empleados Puntuales</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-800">12</div>
                <div className="text-sm text-yellow-600 font-medium">Con Tardanzas</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-800">2</div>
                <div className="text-sm text-red-600 font-medium">Con Faltas</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-800">{attendanceRate}%</div>
                <div className="text-sm text-blue-600 font-medium">Puntualidad General</div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Empleados que Requieren Atención:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• ANTONEURY DE LA CRUZ VASQUEZ - 6 tardanzas este mes</li>
                <li>• MARIA RODRIGUEZ SANTOS - 3 tardanzas consecutivas</li>
                <li>• CARLOS MARTINEZ PEREZ - 2 faltas sin justificar</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Payroll Tab */}
      {selectedView === 'payroll' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Nómina</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-800">{formatCurrency(totalPayroll / 3)}</div>
                <div className="text-sm text-green-600 font-medium">Nómina Mensual Promedio</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-800">156</div>
                <div className="text-sm text-blue-600 font-medium">Empleados Activos</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-amber-800">{formatCurrency(totalPayroll / 3 / 156)}</div>
                <div className="text-sm text-amber-600 font-medium">Salario Promedio</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Información de Nómina:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Última nómina procesada: Agosto 2025</li>
                <li>• Empleados con horario extendido: 45 (28.8%)</li>
                <li>• Total descuentos por préstamos: {formatCurrency(6891.33 * 25)}</li>
                <li>• Próxima fecha de pago: 18 de Septiembre, 2025</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Vacations Tab */}
      {selectedView === 'vacations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestión de Solicitudes de Vacaciones</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-800">{vacationRequests.filter(r => r.estado === 'Pendiente').length}</div>
                <div className="text-sm text-blue-600 font-medium">Pendientes</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-800">{vacationRequests.filter(r => r.estado === 'En Revisión').length}</div>
                <div className="text-sm text-yellow-600 font-medium">En Revisión</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-800">{vacationRequests.filter(r => r.estado === 'Aprobado').length}</div>
                <div className="text-sm text-green-600 font-medium">Aprobadas</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">{vacationRequests.length}</div>
                <div className="text-sm text-gray-600 font-medium">Total Solicitudes</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Empleado</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Departamento</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Período</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Días</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {vacationRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{request.id}</td>
                      <td className="px-4 py-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.empleado}</div>
                          <div className="text-sm text-gray-500">{request.cedula}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{request.departamento}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {request.fechaInicio} al {request.fechaFin}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{request.diasSolicitados}</td>
                      <td className="px-4 py-3">
                        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.estado)}`}>
                          {getStatusIcon(request.estado)}
                          <span className="ml-2">{request.estado}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            <Eye className="w-4 h-4" />
                          </button>
                          {request.estado === 'Pendiente' && (
                            <>
                              <button className="text-green-600 hover:text-green-800 text-sm">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800 text-sm">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRAdminDashboard;