import { attendanceData } from '../data/attendanceData';

export const checkAttendanceAlerts = () => {
  const currentMonth = attendanceData['2025-8'];
  const alerts = [];

  // Check recent consecutive tardiness
  const recentRecords = currentMonth.registros.slice(-5);
  const recentTardiness = recentRecords.filter(r => r.estado === 'Tardanza').length;

  if (recentTardiness >= 3) {
    alerts.push({
      tipo: 'warning',
      titulo: '⚠️ PRECAUCIÓN - Tardanzas Frecuentes',
      mensaje: `Has llegado tarde ${recentTardiness} de las últimas 5 veces. El horario de entrada es 8:00 AM. Te recomendamos ajustar tu horario para evitar sanciones disciplinarias.`,
      accion: 'Mejorar puntualidad'
    });
  }

  // Check monthly absences
  if (currentMonth.resumen.faltas >= 2) {
    alerts.push({
      tipo: 'danger',
      titulo: '🚨 ATENCIÓN REQUERIDA - Faltas Injustificadas',
      mensaje: `Tienes ${currentMonth.resumen.faltas} faltas sin justificar este mes. Debes presentarte al Departamento Administrativo con la documentación correspondiente para justificar tus ausencias.`,
      accion: 'Presentarse a Administración'
    });
  }

  // Check excessive tardiness
  if (currentMonth.resumen.tardanzas >= 5) {
    alerts.push({
      tipo: 'warning',
      titulo: '📋 SEGUIMIENTO DISCIPLINARIO',
      mensaje: `Has acumulado ${currentMonth.resumen.tardanzas} tardanzas este mes. Esto podría afectar tu evaluación de desempeño y beneficios salariales.`,
      acción: 'Revisar horarios'
    });
  }

  return alerts;
};