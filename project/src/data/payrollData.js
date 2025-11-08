export const payrollData = {
  '2025-7': {
    fecha: '18/07/2025',
    periodo: '2025-7',
    descripcion: 'NOMINA GENERAL SUELDO FIJO, JULIO 2025',
    tipo: 'NOMINA GENERAL',
    ingresos: [
      { concepto: 'SUELDO', monto: 28350.00 },
      { concepto: 'HORARIO EXTENDIDO (50% SUELDO BRUTO)', monto: 14175.00 }
    ],
    descuentos: [
      { concepto: 'PENSIONES Y JUBILACIONES 6%', monto: 1701.00 },
      { concepto: 'SAVICA', monto: 25.00 },
      { concepto: 'PRESTAMO EXTRAORDINARIO', monto: 6891.33 },
      {
        concepto: 'DESC. SEGURO ROYAL + 3 DEPENDIENTE(S) DIRECTO(S)',
        monto: 1317.42,
        detalles: ['ROYAL ALANY HIJO', 'ROYAL LAURY ESTHER CONYUGE', 'ROYAL LIAN HIJO']
      }
    ],
    netoAPagar: 32590.25,
    prestamoInfo: {
      montoTotal: 413479.80,
      cuotasMensual: 6891.33,
      plazo: '60 meses (5 años)',
      cuotasPagadas: 12,
      cuotasRestantes: 48,
      saldoPendiente: 330933.84
    }
  },
  '2025-6': {
    fecha: '20/06/2025',
    periodo: '2025-6',
    descripcion: 'NOMINA GENERAL SUELDO FIJO, JUNIO 2025',
    tipo: 'NOMINA GENERAL',
    ingresos: [
      { concepto: 'SUELDO', monto: 28350.00 }
    ],
    descuentos: [
      { concepto: 'PENSIONES Y JUBILACIONES 6%', monto: 1701.00 },
      { concepto: 'SAVICA', monto: 25.00 },
      { concepto: 'PRESTAMO EXTRAORDINARIO', monto: 6891.33 },
      {
        concepto: 'DESC. SEGURO ROYAL + 3 DEPENDIENTE(S) DIRECTO(S)',
        monto: 1317.42,
        detalles: ['ROYAL ALANY HIJO', 'ROYAL LAURY ESTHER CONYUGE', 'ROYAL LIAN HIJO']
      }
    ],
    netoAPagar: 18415.25
  },
  '2025-5': {
    fecha: '20/05/2025',
    periodo: '2025-5',
    descripcion: 'NOMINA GENERAL SUELDO FIJO, MAYO 2025',
    tipo: 'NOMINA GENERAL',
    ingresos: [
      { concepto: 'SUELDO', monto: 28350.00 },
      { concepto: 'HORARIO EXTENDIDO (50% SUELDO BRUTO)', monto: 14175.00 }
    ],
    descuentos: [
      { concepto: 'PENSIONES Y JUBILACIONES 6%', monto: 1701.00 },
      { concepto: 'SAVICA', monto: 25.00 },
      { concepto: 'PRESTAMO EXTRAORDINARIO', monto: 6891.33 },
      {
        concepto: 'DESC. SEGURO ROYAL + 3 DEPENDIENTE(S) DIRECTO(S)',
        monto: 1317.42,
        detalles: ['ROYAL ALANY HIJO', 'ROYAL LAURY ESTHER CONYUGE', 'ROYAL LIAN HIJO']
      }
    ],
    netoAPagar: 32590.25
  }
};