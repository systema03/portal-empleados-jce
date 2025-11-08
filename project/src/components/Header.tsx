import React from 'react';

interface HeaderProps {
  onLogout: () => void;
  userRole?: string;
}

const Header: React.FC<HeaderProps> = ({ onLogout, userRole = 'employee' }) => {
  const getRoleTitle = () => {
    switch(userRole) {
      case 'hr_admin': return 'Administrador RRHH';
      case 'loan_admin': return 'Administrador Préstamos';
      default: return 'Portal Empleados';
    }
  };

  const getRoleSubtitle = () => {
    switch(userRole) {
      case 'hr_admin': return 'Panel de Control - Recursos Humanos';
      case 'loan_admin': return 'Panel de Control - Gestión de Préstamos';
      default: return 'Junta Central Electoral';
    }
  };

  return (
    <header className="text-white shadow-lg" 
            style={{background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)'}}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* JCE Logo in header */}
            <div className="w-8 h-10 flex items-center justify-center bg-white bg-opacity-20 rounded relative">
              <div className="text-white text-xs font-bold absolute bottom-0">JCE</div>
              <div className="absolute inset-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i}
                       className="absolute border border-white rounded-full opacity-70"
                       style={{
                         width: `${(3-i)*3}px`,
                         height: `${(3-i)*5}px`,
                         top: `${1+i*1}px`,
                         left: `${2+i*1}px`,
                       }}>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">{getRoleTitle()} JCE</h1>
              <p className="text-yellow-200 text-xs sm:text-sm">{getRoleSubtitle()}</p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="px-3 py-2 sm:px-4 rounded-lg transition-colors duration-200 shadow-md bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;