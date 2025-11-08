import React from 'react';
import { Download, Calendar, DollarSign, CreditCard } from 'lucide-react';
import { payrollData } from '../data/payrollData';
import { formatCurrency } from '../utils/formatters';

interface PayrollSectionProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
}

const PayrollSection: React.FC<PayrollSectionProps> = ({ 
  selectedPeriod, 
  setSelectedPeriod 
}) => {
  const currentPayroll = payrollData[selectedPeriod];
  const totalIngresos = currentPayroll.ingresos.reduce((sum, item) => sum + item.monto, 0);
  const totalDescuentos = currentPayroll.descuentos.reduce((sum, item) => sum + item.monto, 0);

  const downloadPayslip = () => {
    alert('Descarga de volante iniciada...');
  };

  return (
    <>
      {/* Period Selection */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Período de Consulta
          </h3>
          <button
            onClick={downloadPayslip}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center text-sm transition-colors duration-200 w-full sm:w-auto justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar Volante
          </button>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="2025-7">Julio 2025 - Con Horario Extendido</option>
          <option value="2025-6">Junio 2025 - Nómina Regular</option>
          <option value="2025-5">Mayo 2025 - Con Horario Extendido</option>
        </select>
      </div>

      {/* Payroll Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 font-medium text-sm sm:text-base">Total Ingresos</p>
                <p className="text-xl sm:text-2xl font-bold text-green-800">{formatCurrency(totalIngresos)}</p>
              </div>
              <DollarSign className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 font-medium text-sm sm:text-base">Total Descuentos</p>
                <p className="text-xl sm:text-2xl font-bold text-red-800">{formatCurrency(totalDescuentos)}</p>
              </div>
              <DollarSign className="w-6 sm:w-8 h-6 sm:h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 font-medium text-sm sm:text-base">Neto a Pagar</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-800">{formatCurrency(currentPayroll.netoAPagar)}</p>
              </div>
              <CreditCard className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
            </div>
          </div>

          {/* Loan Info */}
          {currentPayroll.prestamoInfo && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6">
              <h4 className="font-semibold text-yellow-800 mb-3">Información del Préstamo</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-yellow-700">Monto Total:</span>
                  <span className="font-semibold">{formatCurrency(currentPayroll.prestamoInfo.montoTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Cuota Mensual:</span>
                  <span className="font-semibold">{formatCurrency(currentPayroll.prestamoInfo.cuotasMensual)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Plazo:</span>
                  <span className="font-semibold">{currentPayroll.prestamoInfo.plazo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Cuotas Pagadas:</span>
                  <span className="font-semibold">{currentPayroll.prestamoInfo.cuotasPagadas}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-yellow-700">Saldo Pendiente:</span>
                  <span className="font-bold text-red-600">{formatCurrency(currentPayroll.prestamoInfo.saldoPendiente)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Extended Hours Info */}
          {currentPayroll.ingresos.some(ing => ing.concepto.includes('HORARIO EXTENDIDO')) && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-6">
              <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                ⏰ Información Horario Extendido
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{color: '#8B4513'}}>Sueldo Bruto:</span>
                  <span className="font-semibold">{formatCurrency(28350.00)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{color: '#8B4513'}}>Horario Extendido (50%):</span>
                  <span className="font-semibold text-green-600">+{formatCurrency(14175.00)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{color: '#8B4513'}}>Subtotal Ingresos:</span>
                  <span className="font-semibold">{formatCurrency(42525.00)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span style={{color: '#8B4513'}}>Descuentos (solo del sueldo bruto):</span>
                  <span className="font-semibold text-red-600">-{formatCurrency(9934.75)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span style={{color: '#8B4513'}}>Total Final:</span>
                  <span className="font-bold" style={{color: '#B8860B'}}>{formatCurrency(32590.25)}</span>
                </div>
                <div className="rounded-lg p-3 mt-3" style={{backgroundColor: '#F5E6D3'}}>
                  <p className="text-xs" style={{color: '#8B4513'}}>
                    <strong>Fórmula:</strong> (Sueldo Bruto - Descuentos) + Horario Extendido =
                    (RD$28,350 - RD$9,934.75) + RD$14,175 = RD$32,590.25
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-2">Cuenta Bancaria:</p>
            <p className="font-mono text-lg font-bold">200012470257604</p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Period Info */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información del Período</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Fecha:</span>
                <span>{currentPayroll.fecha}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Período:</span>
                <span>{currentPayroll.periodo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tipo:</span>
                <span className="text-amber-700 font-semibold">{currentPayroll.tipo}</span>
              </div>
              <div className="pt-2 border-t">
                <span className="font-medium">Descripción:</span>
                <p className="text-sm text-gray-600 mt-1">{currentPayroll.descripcion}</p>
              </div>
            </div>
          </div>

          {/* Income Details */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              Ingresos
              {currentPayroll.ingresos.some(ing => ing.concepto.includes('HORARIO EXTENDIDO')) && (
                <span className="ml-3 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                  ⏰ Incluye Horario Extendido
                </span>
              )}
            </h3>
            <div className="space-y-3">
              {currentPayroll.ingresos.map((ingreso, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-700">{ingreso.concepto}</span>
                    {ingreso.concepto.includes('HORARIO EXTENDIDO') && (
                      <span className="ml-0 sm:ml-2 mt-1 sm:mt-0 text-xs px-2 py-1 rounded text-white" style={{backgroundColor: '#B8860B'}}>
                        50% del sueldo bruto (RD$28,350.00)
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-green-700">{formatCurrency(ingreso.monto)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t border-gray-300 font-bold">
                <span>TOTAL INGRESOS</span>
                <span className="text-green-700">{formatCurrency(totalIngresos)}</span>
              </div>
            </div>
          </div>

          {/* Deductions Details */}
          {currentPayroll.descuentos.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                Descuentos
              </h3>
              <div className="space-y-3">
                {currentPayroll.descuentos.map((descuento, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700">{descuento.concepto}</span>
                    <span className="font-semibold text-red-700">-{formatCurrency(descuento.monto)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-3 border-t border-gray-300 font-bold">
                  <span>TOTAL DESCUENTOS</span>
                  <span className="text-red-700">-{formatCurrency(totalDescuentos)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PayrollSection;