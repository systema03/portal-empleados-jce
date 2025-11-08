# 🏛️ Portal de Empleados JCE

**Sistema de Consulta de Nómina y Gestión de Empleados**  
*Junta Central Electoral - República Dominicana*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://jce-netbanking-porta-3x1c.bolt.host)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📋 Descripción

El **Portal de Empleados JCE** es una aplicación web moderna y segura que permite a los empleados de la Junta Central Electoral consultar su información salarial, registros de asistencia y gestionar solicitudes de préstamos de manera digital y eficiente.

### 🎯 Características Principales

- **💰 Consulta de Nómina**: Visualización detallada de ingresos, descuentos y neto a pagar
- **⏰ Control de Asistencia**: Registro de ponchado con análisis de puntualidad
- **📄 Solicitud de Préstamos**: Sistema digital para solicitar préstamos institucionales
- **🔐 Autenticación Segura**: Sistema de login con validación de credenciales
- **📱 Diseño Responsivo**: Optimizado para dispositivos móviles y desktop
- **🎨 Interfaz Moderna**: Diseño profesional con los colores institucionales de JCE

---

## 🚀 Demo en Vivo

**🌐 [Ver Aplicación](https://jce-netbanking-porta-3x1c.bolt.host)**

### Credenciales de Prueba
```
Cédula: 2014-0201
Contraseña: jce2025
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.3.1 | Framework principal |
| **TypeScript** | 5.5.3 | Tipado estático |
| **Tailwind CSS** | 3.4.1 | Estilos y diseño |
| **Vite** | 5.4.2 | Build tool y dev server |
| **Lucide React** | 0.344.0 | Iconografía |

---

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/portal-empleados-jce.git
   cd portal-empleados-jce
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

5. **Previsualizar build de producción**
   ```bash
   npm run preview
   ```

---

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes React reutilizables
│   ├── AlertsSection.tsx        # Alertas y notificaciones
│   ├── AttendanceSection.tsx    # Sección de asistencia
│   ├── EmployeeInfo.tsx         # Información del empleado
│   ├── Header.tsx               # Encabezado de la aplicación
│   ├── LoanRequestSection.tsx   # Solicitud de préstamos
│   ├── LoginForm.tsx            # Formulario de login
│   ├── NavigationTabs.tsx       # Navegación por pestañas
│   ├── PayrollSection.tsx       # Sección de nómina
│   └── SplashScreen.tsx         # Pantalla de carga
├── data/                # Datos de la aplicación
│   ├── attendanceData.js        # Datos de asistencia
│   ├── employeeData.js          # Información del empleado
│   └── payrollData.js           # Datos de nómina
├── utils/               # Utilidades y helpers
│   ├── alertsChecker.js         # Verificador de alertas
│   └── formatters.js            # Formateadores de datos
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

---

## 🔧 Funcionalidades Detalladas

### 💰 **Módulo de Nómina**
- Consulta de volantes de pago por período
- Desglose detallado de ingresos y descuentos
- Información de préstamos activos
- Cálculo automático de horario extendido
- Descarga de volantes en PDF

### ⏰ **Módulo de Asistencia**
- Registro de entrada y salida diaria
- Análisis de puntualidad mensual
- Identificación de tardanzas y faltas
- Estadísticas de asistencia
- Alertas por incumplimientos

### 📄 **Módulo de Préstamos**
- Descarga de formulario oficial
- Subida de documentos (drag & drop)
- Validación de archivos
- Seguimiento de solicitudes
- Información de requisitos y condiciones

### 🔐 **Sistema de Seguridad**
- Autenticación por cédula y contraseña
- Validación de credenciales
- Sesiones seguras
- Protección de datos sensibles

---

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: Dorado JCE (`#B8860B`, `#DAA520`)
- **Secundario**: Blanco y grises
- **Estados**: Verde (éxito), Rojo (error), Amarillo (advertencia)

### Características de Diseño
- **Responsive Design**: Adaptable a todos los dispositivos
- **Micro-interacciones**: Animaciones suaves y transiciones
- **Accesibilidad**: Contraste adecuado y navegación por teclado
- **Consistencia Visual**: Componentes reutilizables y coherentes

---

## 📊 Datos de Ejemplo

La aplicación incluye datos de ejemplo realistas para demostración:

- **Empleado**: Antoneury De La Cruz Vasquez
- **Períodos de Nómina**: Julio 2025, Junio 2025, Mayo 2025
- **Registros de Asistencia**: Agosto 2025, Julio 2025
- **Información de Préstamos**: Préstamo activo con detalles completos

---

## 🚀 Despliegue

### Bolt Hosting (Actual)
La aplicación está desplegada en Bolt Hosting:
- **URL**: https://jce-netbanking-porta-3x1c.bolt.host
- **Tipo**: Static Hosting
- **SSL**: Habilitado automáticamente

### Otras Opciones de Despliegue
- **Netlify**: `npm run build` + drag & drop
- **Vercel**: Conexión directa con GitHub
- **GitHub Pages**: Para proyectos públicos

---

## 🔄 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Previsualizar build
npm run lint     # Linter de código
```

---

## 🤝 Contribución

### Proceso de Contribución
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de Código
- **TypeScript**: Tipado estricto
- **ESLint**: Configuración estándar
- **Prettier**: Formateo automático
- **Convenciones**: Nombres descriptivos y comentarios claros

---

## 📝 Roadmap

### 🔮 Próximas Funcionalidades
- [ ] **Notificaciones Push**: Alertas en tiempo real
- [ ] **Exportación de Datos**: Excel y PDF avanzados
- [ ] **Dashboard Analítico**: Gráficos y estadísticas
- [ ] **Modo Offline**: Funcionalidad sin conexión
- [ ] **API Integration**: Conexión con sistemas reales
- [ ] **Multi-idioma**: Soporte para inglés

### 🛠️ Mejoras Técnicas
- [ ] **Testing**: Unit tests con Jest/Vitest
- [ ] **PWA**: Progressive Web App
- [ ] **Performance**: Lazy loading y optimizaciones
- [ ] **Accessibility**: WCAG 2.1 compliance

---

## 📞 Soporte y Contacto

### 🏛️ **Junta Central Electoral**
- **Sitio Web**: [jce.gob.do](https://jce.gob.do)
- **Teléfono**: (809) 686-2362
- **Dirección**: Ave. Luperón, Santo Domingo, R.D.

### 👨‍💻 **Soporte Técnico**
- **Email**: soporte.ti@jce.gob.do
- **Horario**: Lunes a Viernes, 8:00 AM - 5:00 PM
- **Departamento**: Dirección de Informática

---

## 📄 Licencia

Este proyecto es propiedad de la **Junta Central Electoral** de la República Dominicana. 

**Uso Interno**: Este sistema está diseñado exclusivamente para uso interno de los empleados de la JCE.

---

## 🙏 Agradecimientos

- **Equipo de Desarrollo**: Dirección de Informática JCE
- **Diseño UX/UI**: Basado en estándares gubernamentales
- **Testing**: Departamento de Recursos Humanos
- **Feedback**: Empleados de la institución

---

<div align="center">

**🏛️ Desarrollado con ❤️ para la Junta Central Electoral**

[![JCE](https://img.shields.io/badge/JCE-Junta%20Central%20Electoral-B8860B?style=for-the-badge)](https://jce.gob.do)

*Fortaleciendo la democracia dominicana a través de la tecnología*

</div>
