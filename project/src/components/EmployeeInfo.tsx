import React from 'react';
import { User } from 'lucide-react';

interface Employee {
  nombre: string;
  cedula: string;
  cargo: string;
  departamento: string;
  municipio: string;
  cuentaBancaria: string;
}

interface EmployeeInfoProps {
  employee: Employee;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ employee }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-full w-16 h-16 flex items-center justify-center border-3 border-amber-200">
          <User className="w-8 h-8 text-amber-700" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{employee.nombre}</h2>
          <p className="text-gray-600">Cédula: {employee.cedula}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Cargo:</span>
          <p className="text-gray-600">{employee.cargo}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Departamento:</span>
          <p className="text-gray-600">{employee.departamento}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Municipio:</span>
          <p className="text-gray-600">{employee.municipio}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;