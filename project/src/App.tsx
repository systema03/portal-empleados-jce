import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import EmployeeInfo from './components/EmployeeInfo';
import AlertsSection from './components/AlertsSection';
import NavigationTabs from './components/NavigationTabs';
import PayrollSection from './components/PayrollSection';
import AttendanceSection from './components/AttendanceSection';
import LoanRequestSection from './components/LoanRequestSection';
import VacationRequestSection from './components/VacationRequestSection';
import HRAdminDashboard from './components/HRAdminDashboard';
import LoanAdminDashboard from './components/LoanAdminDashboard';
import { employeeData } from './data/employeeData';
import { checkAttendanceAlerts } from './utils/alertsChecker';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const [activeTab, setActiveTab] = useState('nomina');
  const [selectedPeriod, setSelectedPeriod] = useState('2025-7');
  const [selectedAttendanceMonth, setSelectedAttendanceMonth] = useState('2025-8');
  const [alerts, setAlerts] = useState([]);

  const handleLogin = (success: boolean, role?: string) => {
    if (success) {
      setIsLoggedIn(true);
      setUserRole(role || 'employee');
      // Check alerts on login
      if (role === 'employee') {
        const attendanceAlerts = checkAttendanceAlerts();
        setAlerts(attendanceAlerts);
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setAlerts([]);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const attendanceAlerts = checkAttendanceAlerts();
      setAlerts(attendanceAlerts);
    }
  }, [isLoggedIn, selectedAttendanceMonth]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Render different dashboards based on user role
  if (userRole === 'hr_admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} userRole={userRole} />
        <HRAdminDashboard />
      </div>
    );
  }

  if (userRole === 'loan_admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} userRole={userRole} />
        <LoanAdminDashboard />
      </div>
    );
  }

  // Default employee portal
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} userRole={userRole} />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <EmployeeInfo employee={employeeData} />
        
        <AlertsSection alerts={alerts} />
        
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'nomina' ? (
          <PayrollSection 
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
        ) : activeTab === 'asistencia' ? (
          <AttendanceSection 
            selectedMonth={selectedAttendanceMonth}
            setSelectedMonth={setSelectedAttendanceMonth}
          />
        ) : activeTab === 'prestamos' ? (
          <LoanRequestSection />
        ) : activeTab === 'vacaciones' ? (
          <VacationRequestSection />
        ) : (
          <PayrollSection 
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
        )}
      </div>
    </div>
  );
}

export default App;
