import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (success: boolean, userRole?: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ cedula: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      // Employee credentials
      if (credentials.cedula === '2014-0201' && credentials.password === 'jce2025') {
        onLogin(true, 'employee');
      }
      // HR Admin credentials
      else if (credentials.cedula === '2014-0000' && credentials.password === 'jce2025') {
        onLogin(true, 'hr_admin');
      }
      // Loan Admin credentials
      else if (credentials.cedula === '2014-0200' && credentials.password === 'jce2025') {
        onLogin(true, 'loan_admin');
      } else {
        alert('Credenciales incorrectas.\n\nUsuarios de prueba:\n• Empleado: 2014-0201 / jce2025\n• Admin RRHH: 2014-0000 / jce2025\n• Admin Préstamos: 2014-0200 / jce2025');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)'}}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 hover:scale-105">
        {/* Header */}
        <div className="text-center mb-8">
          {/* JCE Logo */}
          <div className="w-20 h-24 mx-auto mb-4 flex items-center justify-center rounded-lg shadow-lg relative overflow-hidden"
               style={{background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 100%)'}}>
            <div className="text-white text-xs font-bold absolute bottom-1">JCE</div>
            <div className="absolute inset-2">
              {[...Array(4)].map((_, i) => (
                <div key={i}
                     className="absolute border-2 border-white rounded-full"
                     style={{
                       width: `${(4-i)*8}px`,
                       height: `${(4-i)*12}px`,
                       top: `${2+i*2}px`,
                       left: `${4+i*2}px`,
                       borderRadius: `${(4-i)*4}px ${(4-i)*4}px ${(4-i)*6}px ${(4-i)*6}px`
                     }}>
                </div>
              ))}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Portal Empleados JCE</h1>
          <p className="text-gray-600">Consulta tu información salarial y asistencia</p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Cédula o Código
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={credentials.cedula}
                onChange={(e) => setCredentials({...credentials, cedula: e.target.value})}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200"
                placeholder="000-0000000-0 o código"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 100%)'}}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Usuarios Demo:</strong><br/>
            Empleado: 2014-0201 / jce2025<br/>
            Admin RRHH: 2014-0000 / jce2025<br/>
            Admin Préstamos: 2014-0200 / jce2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;