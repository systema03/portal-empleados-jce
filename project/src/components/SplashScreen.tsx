import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show logo after a brief delay
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 300);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2.5; // Increment to reach 100% in ~3.2 seconds
      });
    }, 80);

    // Complete splash after 3.5 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
         style={{background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)'}}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`
             }}>
        </div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo Container */}
        <div className={`mb-8 transition-all duration-1000 transform ${
          showLogo ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}>
          {/* JCE Logo */}
          <div className="w-32 h-40 mx-auto mb-6 relative overflow-hidden rounded-2xl shadow-2xl bg-white p-2">
            <img 
              src="/LOGO_JCE.svg.png" 
              alt="JCE Logo" 
              className="w-full h-full object-contain"
            />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-pulse"></div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-wide">
            Portal Empleados
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-1">
            JCE
          </h2>
          <p className="text-yellow-100 text-sm sm:text-base font-medium">
            Junta Central Electoral
          </p>
        </div>

        {/* Loading Section */}
        <div className={`transition-all duration-1000 delay-500 ${
          showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {/* Progress Bar */}
          <div className="w-64 mx-auto mb-4">
            <div className="bg-white bg-opacity-20 rounded-full h-2 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-white rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full bg-gradient-to-r from-yellow-200 to-white animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-white text-sm font-medium mb-2">
            Cargando sistema...
          </div>
          
          {/* Progress Percentage */}
          <div className="text-yellow-200 text-xs font-mono">
            {Math.round(progress)}%
          </div>

          {/* Loading Dots Animation */}
          <div className="flex justify-center space-x-1 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Security Badge */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2 backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-xs font-medium">Conexión Segura</span>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;