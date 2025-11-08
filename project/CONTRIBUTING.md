# Contribuir al Portal de Empleados JCE

¡Gracias por tu interés en contribuir al Portal de Empleados de la Junta Central Electoral! Este documento te guiará sobre cómo contribuir efectivamente al proyecto.

## 🚀 Comenzando

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn
- Git

### Configuración del Entorno de Desarrollo

1. **Fork del repositorio**
   ```bash
   # Clona tu fork
   git clone https://github.com/TU_USUARIO/portal-empleados-jce.git
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

## 📋 Proceso de Contribución

### 1. Crear una Issue
Antes de comenzar a trabajar, crea una issue describiendo:
- El problema que quieres resolver
- La funcionalidad que quieres añadir
- Los cambios propuestos

### 2. Crear una Rama
```bash
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

### 3. Realizar Cambios
- Sigue las convenciones de código existentes
- Añade comentarios cuando sea necesario
- Mantén los commits pequeños y descriptivos

### 4. Commit Guidelines
Usa el formato de commits convencionales:
```
tipo(alcance): descripción breve

Descripción más detallada si es necesaria

Fixes #123
```

Tipos válidos:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan la lógica)
- `refactor`: Refactorización de código
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento

### 5. Pull Request
1. Push a tu rama
2. Crea un Pull Request desde GitHub
3. Describe claramente los cambios realizados
4. Referencia las issues relacionadas

## 🎯 Áreas de Contribución

### Funcionalidades Prioritarias
- [ ] Gestión de información personal del empleado
- [ ] Módulo de beneficios
- [ ] Sistema de evaluación de desempeño
- [ ] Mejoras en reportes y análisis
- [ ] Optimizaciones de rendimiento

### Mejoras Técnicas
- [ ] Tests unitarios y de integración
- [ ] Documentación de API
- [ ] Accesibilidad (WCAG 2.1)
- [ ] Internacionalización (i18n)
- [ ] PWA capabilities

## 📝 Estándares de Código

### TypeScript
- Usa tipado estricto
- Define interfaces para props y datos
- Evita `any`, usa tipos específicos

### React
- Componentes funcionales con hooks
- Props destructuring
- Nombres descriptivos para componentes y funciones

### CSS/Tailwind
- Usa clases de Tailwind consistentemente
- Mantén el diseño responsivo
- Sigue la paleta de colores institucional

### Estructura de Archivos
```
src/
├── components/          # Componentes React
├── data/               # Datos estáticos
├── utils/              # Funciones utilitarias
├── types/              # Definiciones de tipos TypeScript
└── hooks/              # Custom hooks
```

## 🧪 Testing

### Ejecutar Tests
```bash
npm run test
```

### Escribir Tests
- Tests unitarios para funciones utilitarias
- Tests de componentes con React Testing Library
- Tests de integración para flujos completos

## 📚 Documentación

### Comentarios en Código
```typescript
/**
 * Calcula el total de ingresos de un período de nómina
 * @param ingresos - Array de conceptos de ingreso
 * @returns Total calculado en DOP
 */
const calcularTotalIngresos = (ingresos: Ingreso[]): number => {
  return ingresos.reduce((sum, item) => sum + item.monto, 0);
};
```

### README Updates
Si añades nuevas funcionalidades, actualiza el README con:
- Descripción de la funcionalidad
- Instrucciones de uso
- Screenshots si es relevante

## 🐛 Reportar Bugs

### Información Requerida
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots/videos si aplica
- Información del navegador/dispositivo

### Template de Bug Report
```markdown
## Descripción del Bug
Descripción clara y concisa del problema.

## Pasos para Reproducir
1. Ve a '...'
2. Haz clic en '...'
3. Desplázate hacia '...'
4. Ve el error

## Comportamiento Esperado
Descripción de lo que esperabas que pasara.

## Screenshots
Si aplica, añade screenshots para explicar el problema.

## Información Adicional
- Navegador: [ej. Chrome 91.0]
- Dispositivo: [ej. iPhone 12, Desktop]
- Resolución: [ej. 1920x1080]
```

## 🔒 Seguridad

### Reportar Vulnerabilidades
Si encuentras una vulnerabilidad de seguridad:
1. **NO** crees una issue pública
2. Envía un email a: seguridad@jce.gob.do
3. Incluye detalles técnicos y pasos para reproducir

### Buenas Prácticas
- No hardcodees credenciales
- Valida todas las entradas de usuario
- Usa HTTPS en producción
- Implementa rate limiting cuando sea necesario

## 📞 Contacto

### Equipo de Desarrollo
- **Email**: desarrollo@jce.gob.do
- **Slack**: #portal-empleados (interno JCE)

### Mantenedores
- [@jce-dev-team](https://github.com/jce-dev-team) - Equipo principal

## 📄 Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la misma licencia del proyecto.

---

¡Gracias por contribuir al Portal de Empleados JCE! 🇩🇴