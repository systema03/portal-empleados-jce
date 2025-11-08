import React, { useState } from 'react';
import { CreditCard, FileText, DollarSign, Users, TrendingUp, AlertTriangle, CheckCircle, XCircle, Eye, Clock, BarChart3 } from 'lucide-react';
import { payrollData } from '../data/payrollData';
import { formatCurrency } from '../utils/formatters';

const LoanAdminDashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState('overview');

  // Simulated loan requests data
  const loanRequests = [
    {
      id: 'PREST-2025-008',
      empleado: 'JOSE ANTONIO RAMIREZ',
      cedula: '2014-0601',
      fechaSolicitud: '25/08/2025',
      montoSolicitado: 250000,
      plazoMeses: 36,
      cuotaMensual: 8333.33,
      estado: 'Pendiente',
      departamento: 'DIRECCIÓN DE INFORMÁTICA',
      salarioBase: 32000,
      antiguedad: '2 años, 4 meses'
    },
    {
      id: 'PREST-2025-009',
      empleado: 'LUCIA MERCEDES SANTOS',
      cedula: '2014-0701',
      fechaSolicitud: '23/08/2025',
      montoSolicitado: 180000,
      plazoMeses: 24,
      cuotaMensual: 8750.00,
      estado: 'En Revisión',
      departamento: 'RECURSOS HUMANOS',
      salarioBase: 28500,
      antiguedad: '3 años, 1 mes'
    },
    {
      id: 'PREST-2025-010',
      empleado: 'MIGUEL ANGEL TORRES',
      cedula: '2014-0801',
      fechaSolicitud: '20/08/2025',
      montoSolicitado: 300000,
      plazoMeses: 48,
      cuotaMensual: 7812.50,
      estado: 'Aprobado',
      departamento: 'DEPARTAMENTO ADMINISTRATIVO',
      salarioBase: 35000,
      antiguedad: '4 años, 8 meses'
    },
    {
      id: 'PREST-2025-011',
      empleado: 'CARMEN ROSA VALDEZ',
      cedula: '2014-0901',
      fechaSolicitud: '18/08/2025',
      montoSolicitado: 150000,
      plazoMeses: 18,
      cuotaMensual: 9722.22,
      estado: 'Rechazado',
      departamento: 'DIRECCIÓN DE INFORMÁTICA',
      salarioBase: 26000,
      antiguedad: '8 meses',
      motivoRechazo: 'Antigüedad insuficiente (mínimo 12 meses)'
    }
  ];

  // Active loans from payroll data
  const activeLoans = [
    {
      empleado: 'ANTONEURY DE LA CRUZ VASQUEZ',
      cedula: '2014-0201',
      montoOriginal: 413479.80,
      saldoPendiente: 330933.84,
      cuotaMensual: 6891.33,
      cuotasPagadas: 12,
      cuotasRestantes: 48,
      fechaInicio: '01/08/2024',
      fechaVencimiento: '01/08/2029'
    }
  ];

  // Calculate statistics
  const totalActiveLoans = activeLoans.length + 15; // Simulated additional loans
  const totalLoanAmount = activeLoans.reduce((sum, loan) => sum + loan.saldoPendiente, 0) + 2500000; // Simulated
  const pendingRequests = loanRequests.filter(req => req.estado === 'Pendiente').length;
  const monthlyCollections = activeLoans.reduce((sum, loan) => sum + loan.cuotaMensual, 0) + 125000; // Simulated

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

  const calculateLoanCapacity = (salario: number) => {
    return salario * 15; // 15 veces el salario según las condiciones
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <CreditCard className="w-8 h-8 mr-3 text-amber-600" />
              Panel de Control - Gestión de Préstamos
            </h1>
            <p className="text-gray-600 mt-2">Administración integral de préstamos institucionales</p>
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
              onClick={() => setSelectedView('requests')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedView === 'requests'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Solicitudes
            </button>
            <button
              onClick={() => setSelectedView('active')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedView === 'active'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <CreditCard className="w-4 h-4 inline mr-2" />
              Préstamos Activos
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
                  <p className="text-gray-600 font-medium">Préstamos Activos</p>
                  <p className="text-3xl font-bold text-blue-800">{totalActiveLoans}</p>
                </div>
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">+2 este mes</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Monto Total</p>
                  <p className="text-3xl font-bold text-green-800">{formatCurrency(totalLoanAmount)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">Saldo pendiente</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Recaudo Mensual</p>
                  <p className="text-3xl font-bold text-amber-800">{formatCurrency(monthlyCollections)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-amber-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">Por descuento nómina</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Solicitudes Pendientes</p>
                  <p className="text-3xl font-bold text-orange-800">{pendingRequests}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <AlertTriangle className="w-4 h-4 text-orange-500 mr-1" />
                <span className="text-orange-600">Requieren revisión</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                Alertas y Notificaciones
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-blue-800">2 solicitudes nuevas</p>
                    <p className="text-sm text-blue-600">Requieren evaluación inicial</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-800">1 solicitud en revisión por 5+ días</p>
                    <p className="text-sm text-yellow-600">LUCIA MERCEDES SANTOS</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium text-green-800">Préstamo aprobado y desembolsado</p>
                    <p className="text-sm text-green-600">MIGUEL ANGEL TORRES - {formatCurrency(300000)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-amber-600" />
                Estadísticas del Mes
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Solicitudes recibidas:</span>
                  <span className="font-semibold text-gray-800">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Préstamos aprobados:</span>
                  <span className="font-semibold text-green-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Préstamos rechazados:</span>
                  <span className="font-semibold text-red-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monto total aprobado:</span>
                  <span className="font-semibold text-amber-600">{formatCurrency(300000)}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-gray-600">Tasa de aprobación:</span>
                  <span className="font-semibold text-blue-600">25%</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Requests Tab */}
      {selectedView === 'requests' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestión de Solicitudes de Préstamos</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-800">{loanRequests.filter(r => r.estado === 'Pendiente').length}</div>
                <div className="text-sm text-blue-600 font-medium">Pendientes</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-800">{loanRequests.filter(r => r.estado === 'En Revisión').length}</div>
                <div className="text-sm text-yellow-600 font-medium">En Revisión</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-800">{loanRequests.filter(r => r.estado === 'Aprobado').length}</div>
                <div className="text-sm text-green-600 font-medium">Aprobadas</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-800">{loanRequests.filter(r => r.estado === 'Rechazado').length}</div>
                <div className="text-sm text-red-600 font-medium">Rechazadas</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Empleado</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Monto</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Plazo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Cuota</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Capacidad</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loanRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{request.id}</td>
                      <td className="px-4 py-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.empleado}</div>
                          <div className="text-sm text-gray-500">{request.cedula}</div>
                          <div className="text-xs text-gray-500">{request.antiguedad}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {formatCurrency(request.montoSolicitado)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{request.plazoMeses} meses</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {formatCurrency(request.cuotaMensual)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-gray-700">{formatCurrency(calculateLoanCapacity(request.salarioBase))}</div>
                        <div className="text-xs text-gray-500">
                          {((request.montoSolicitado / calculateLoanCapacity(request.salarioBase)) * 100).toFixed(1)}% usado
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.estado)}`}>
                          {getStatusIcon(request.estado)}
                          <span className="ml-2">{request.estado}</span>
                        </div>
                        {request.motivoRechazo && (
                          <div className="text-xs text-red-600 mt-1">{request.motivoRechazo}</div>
                        )}
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

      {/* Active Loans Tab */}
      {selectedView === 'active' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Préstamos Activos</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-800">{totalActiveLoans}</div>
                <div className="text-sm text-blue-600 font-medium">Préstamos Activos</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-800">{formatCurrency(monthlyCollections)}</div>
                <div className="text-sm text-green-600 font-medium">Recaudo Mensual</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-amber-800">{formatCurrency(totalLoanAmount)}</div>
                <div className="text-sm text-amber-600 font-medium">Saldo Total</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Empleado</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Monto Original</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Saldo Pendiente</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Cuota Mensual</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Progreso</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Vencimiento</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activeLoans.map((loan, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{loan.empleado}</div>
                          <div className="text-sm text-gray-500">{loan.cedula}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {formatCurrency(loan.montoOriginal)}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-red-600">
                        {formatCurrency(loan.saldoPendiente)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {formatCurrency(loan.cuotaMensual)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${(loan.cuotasPagadas / (loan.cuotasPagadas + loan.cuotasRestantes)) * 100}%`
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {loan.cuotasPagadas} de {loan.cuotasPagadas + loan.cuotasRestantes} cuotas
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{loan.fechaVencimiento}</td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          <Eye className="w-4 h-4" />
                        </button>
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

export default LoanAdminDashboard;