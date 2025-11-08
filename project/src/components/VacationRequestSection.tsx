import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, AlertCircle, XCircle, Plus, Eye, FileText } from 'lucide-react';

interface VacationRequest {
  id: string;
  fechaSolicitud: string;
  fechaInicio: string;
  fechaFin: string;
  diasSolicitados: number;
  motivo: string;
  dependencia: string;
  estado: 'Pendiente' | 'En Revisión' | 'Aprobado' | 'Rechazado';
  observaciones?: string;
  fechaAprobacion?: string;
}

const VacationRequestSection: React.FC = () => {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    fechaInicio: '',
    fechaFin: '',
    motivo: '',
    dependencia: 'Edificio Proyecto Tecnológico (EPT)'
  });

  // Datos de ejemplo de solicitudes existentes
  const [vacationRequests] = useState<VacationRequest[]>([
    {
      id: 'VAC-2025-001',
      fechaSolicitud: '15/08/2025',
      fechaInicio: '02/09/2025',
      fechaFin: '13/09/2025',
      diasSolicitados: 10,
      motivo: 'Vacaciones familiares',
      dependencia: 'Edificio Proyecto Tecnológico (EPT)',
      estado: 'Aprobado',
      fechaAprobacion: '18/08/2025',
      observaciones: 'Aprobado por el Director de Informática'
    },
    {
      id: 'VAC-2025-002',
      fechaSolicitud: '20/08/2025',
      fechaInicio: '15/10/2025',
      fechaFin: '26/10/2025',
      diasSolicitados: 10,
      motivo: 'Descanso personal',
      dependencia: 'Edificio Proyecto Tecnológico (EPT)',
      estado: 'En Revisión',
      observaciones: 'Pendiente de aprobación del supervisor directo'
    }
  ]);

  const dependencias = [
    'Edificio Proyecto Tecnológico (EPT)',
    'Sede Central JCE',
    'Oficina Regional Santiago',
    'Oficina Regional La Vega',
    'Oficina Regional San Cristóbal',
    'Dirección de Informática',
    'Departamento de Recursos Humanos',
    'Departamento Administrativo'
  ];

  const calculateDays = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const validateDates = (startDate: string): string | null => {
    if (!startDate) return null;
    
    const today = new Date();
    const requestDate = new Date(startDate);
    const diffTime = requestDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 10) {
      return 'Las vacaciones deben solicitarse con al menos 10 días de anticipación';
    }
    return null;
  };

  const handleSubmitRequest = () => {
    const validation = validateDates(newRequest.fechaInicio);
    if (validation) {
      alert(`❌ Error: ${validation}`);
      return;
    }

    if (!newRequest.fechaInicio || !newRequest.fechaFin || !newRequest.motivo) {
      alert('❌ Por favor completa todos los campos requeridos');
      return;
    }

    const days = calculateDays(newRequest.fechaInicio, newRequest.fechaFin);
    if (days > 15) {
      alert('❌ No puedes solicitar más de 15 días consecutivos de vacaciones');
      return;
    }

    // Simular envío exitoso
    alert(`✅ Solicitud de vacaciones enviada exitosamente!\n\n` +
          `📅 Período: ${newRequest.fechaInicio} al ${newRequest.fechaFin}\n` +
          `📊 Días solicitados: ${days}\n` +
          `🏢 Dependencia: ${newRequest.dependencia}\n` +
          `📝 Motivo: ${newRequest.motivo}\n\n` +
          `Tu solicitud será revisada en un plazo de 3-5 días hábiles.`);
    
    // Limpiar formulario
    setNewRequest({
      fechaInicio: '',
      fechaFin: '',
      motivo: '',
      dependencia: 'Edificio Proyecto Tecnológico (EPT)'
    });
    setShowNewRequest(false);
  };

  const getStatusIcon = (estado: string) => {
    switch(estado) {
      case 'Aprobado': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'En Revisión': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'Pendiente': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Rechazado': return <XCircle className="w-5 h-5 text-red-500" />;
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
    <div className="space-y-6">
      {/* Header with New Request Button */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-amber-600" />
              Gestión de Vacaciones
            </h3>
            <p className="text-gray-600 mt-1">Solicita y gestiona tus períodos de vacaciones</p>
          </div>
          <button
            onClick={() => setShowNewRequest(!showNewRequest)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nueva Solicitud
          </button>
        </div>
      </div>

      {/* New Request Form */}
      {showNewRequest && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-amber-600" />
            Nueva Solicitud de Vacaciones
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Inicio *
              </label>
              <input
                type="date"
                value={newRequest.fechaInicio}
                onChange={(e) => setNewRequest({...newRequest, fechaInicio: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                min={new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              />
              {newRequest.fechaInicio && validateDates(newRequest.fechaInicio) && (
                <p className="text-red-600 text-sm mt-1">
                  {validateDates(newRequest.fechaInicio)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Fin *
              </label>
              <input
                type="date"
                value={newRequest.fechaFin}
                onChange={(e) => setNewRequest({...newRequest, fechaFin: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                min={newRequest.fechaInicio}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dependencia *
              </label>
              <select
                value={newRequest.dependencia}
                onChange={(e) => setNewRequest({...newRequest, dependencia: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                {dependencias.map((dep) => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Días Solicitados
              </label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                <span className="text-lg font-semibold text-amber-600">
                  {calculateDays(newRequest.fechaInicio, newRequest.fechaFin)} días
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo de la Solicitud *
              </label>
              <textarea
                value={newRequest.motivo}
                onChange={(e) => setNewRequest({...newRequest, motivo: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                rows={3}
                placeholder="Describe el motivo de tu solicitud de vacaciones..."
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleSubmitRequest}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-1 sm:flex-none"
            >
              Enviar Solicitud
            </button>
            <button
              onClick={() => setShowNewRequest(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-1 sm:flex-none"
            >
              Cancelar
            </button>
          </div>

          {/* Important Notes */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2">📋 Información Importante:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Las vacaciones deben solicitarse con al menos 10 días de anticipación</li>
              <li>• Máximo 15 días consecutivos por solicitud</li>
              <li>• El período de revisión es de 3-5 días hábiles</li>
              <li>• Debes tener al menos 30 días de servicio para solicitar vacaciones</li>
            </ul>
          </div>
        </div>
      )}

      {/* Vacation Balance */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Balance de Vacaciones</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-800">15</div>
            <div className="text-sm text-blue-600 font-medium">Días Disponibles</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-800">10</div>
            <div className="text-sm text-green-600 font-medium">Días Utilizados</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-800">10</div>
            <div className="text-sm text-yellow-600 font-medium">Días Pendientes</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-800">35</div>
            <div className="text-sm text-amber-600 font-medium">Total Anual</div>
          </div>
        </div>
      </div>

      {/* Vacation Requests History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <Eye className="w-5 h-5 mr-2 text-amber-600" />
          Historial de Solicitudes
        </h4>

        <div className="space-y-4">
          {vacationRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-800">{request.id}</span>
                    <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.estado)}`}>
                      {getStatusIcon(request.estado)}
                      <span className="ml-2">{request.estado}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Período:</span>
                      <p className="text-gray-600">{request.fechaInicio} al {request.fechaFin}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Días:</span>
                      <p className="text-gray-600">{request.diasSolicitados} días</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Dependencia:</span>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {request.dependencia}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Solicitud:</span>
                      <p className="text-gray-600">{request.fechaSolicitud}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="font-medium text-gray-700">Motivo:</span>
                    <p className="text-gray-600">{request.motivo}</p>
                  </div>

                  {request.observaciones && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Observaciones:</span>
                      <p className="text-gray-600 text-sm">{request.observaciones}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Información de Contacto</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Departamento de Recursos Humanos</h5>
            <p className="text-gray-600">📞 Teléfono: (809) 686-2362 ext. 2250</p>
            <p className="text-gray-600">📧 Email: vacaciones@jce.gob.do</p>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Horario de Atención</h5>
            <p className="text-gray-600">🕐 Lunes a Viernes: 8:00 AM - 5:00 PM</p>
            <p className="text-gray-600">📍 Oficina: Planta Baja, Edificio Principal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationRequestSection;