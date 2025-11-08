import React, { useState } from 'react';
import { Download, Upload, FileText, Camera, AlertCircle, CheckCircle, X } from 'lucide-react';

const LoanRequestSection: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File | null}>({
    solicitud: null,
    carnet: null
  });
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const downloadForm = () => {
    // Simular descarga del formulario
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Formulario_Solicitud_Prestamo_JCE.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar mensaje de descarga
    alert('📄 Descargando formulario de solicitud de préstamo...\n\nEl formulario incluye:\n• Datos personales\n• Información laboral\n• Monto solicitado\n• Términos y condiciones');
  };

  const handleFileUpload = (type: string, file: File) => {
    if (file) {
      // Validar tipo de archivo
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('❌ Tipo de archivo no válido. Solo se permiten PDF, JPG, JPEG y PNG.');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('❌ El archivo es muy grande. Tamaño máximo: 5MB.');
        return;
      }

      setUploadedFiles(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  const handleDrop = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    setDragOver(null);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(type, files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(type, files[0]);
    }
  };

  const removeFile = (type: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: null
    }));
  };

  const submitRequest = () => {
    if (!uploadedFiles.solicitud || !uploadedFiles.carnet) {
      alert('❌ Debes subir ambos documentos requeridos antes de enviar la solicitud.');
      return;
    }

    // Simular envío
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Limpiar archivos después del envío exitoso
      setUploadedFiles({ solicitud: null, carnet: null });
    }, 3000);
  };

  const FileUploadArea = ({ type, title, description, icon }: {
    type: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }) => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800 ml-2">{title}</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {uploadedFiles[type] ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <div>
                <p className="font-medium text-green-800">{uploadedFiles[type]!.name}</p>
                <p className="text-sm text-green-600">
                  {(uploadedFiles[type]!.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFile(type)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver === type
              ? 'border-amber-500 bg-amber-50'
              : 'border-gray-300 hover:border-amber-400'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(type);
          }}
          onDragLeave={() => setDragOver(null)}
          onDrop={(e) => handleDrop(e, type)}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Arrastra y suelta tu archivo aquí, o
          </p>
          <label className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
            Seleccionar archivo
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileSelect(e, type)}
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Formatos: PDF, JPG, PNG (máx. 5MB)
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
            <div>
              <h4 className="font-bold text-green-800 text-lg">¡Solicitud Enviada Exitosamente!</h4>
              <p className="text-green-700 mt-1">
                Tu solicitud de préstamo ha sido recibida. Recibirás una respuesta en un plazo de 5-7 días hábiles.
                Se te notificará por correo electrónico sobre el estado de tu solicitud.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start">
          <AlertCircle className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-blue-800 text-lg mb-2">Instrucciones para Solicitar Préstamo</h3>
            <div className="space-y-2 text-blue-700">
              <p><strong>Paso 1:</strong> Descarga el formulario oficial de solicitud de préstamo</p>
              <p><strong>Paso 2:</strong> Llena completamente el formulario con tus datos</p>
              <p><strong>Paso 3:</strong> Sube el formulario completado (PDF o foto clara)</p>
              <p><strong>Paso 4:</strong> Sube una foto clara de tu cédula de identidad (ambos lados)</p>
              <p><strong>Paso 5:</strong> Envía tu solicitud y espera la respuesta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-amber-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Formulario de Solicitud</h3>
              <p className="text-sm text-gray-600">Descarga el formulario oficial para solicitar tu préstamo</p>
            </div>
          </div>
          <button
            onClick={downloadForm}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Descargar Formulario
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">El formulario incluye:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Información personal y laboral</li>
            <li>• Monto solicitado y plazo de pago</li>
            <li>• Referencias personales y familiares</li>
            <li>• Términos y condiciones del préstamo</li>
            <li>• Autorización para descuentos por nómina</li>
          </ul>
        </div>
      </div>

      {/* File Upload Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FileUploadArea
          type="solicitud"
          title="Formulario Completado"
          description="Sube el formulario de solicitud completado y firmado. Puede ser un PDF escaneado o una foto clara del documento."
          icon={<FileText className="w-6 h-6 text-amber-600" />}
        />
        
        <FileUploadArea
          type="carnet"
          title="Cédula de Identidad"
          description="Sube una foto clara de tu cédula de identidad. Asegúrate de que se vean ambos lados del documento."
          icon={<Camera className="w-6 h-6 text-amber-600" />}
        />
      </div>

      {/* Requirements */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-bold text-yellow-800 text-lg mb-3">📋 Requisitos para Préstamos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Documentos Requeridos:</h4>
            <ul className="text-yellow-700 space-y-1">
              <li>✓ Formulario de solicitud completado</li>
              <li>✓ Copia de cédula de identidad</li>
              <li>✓ Últimos 3 volantes de pago</li>
              <li>✓ Certificación laboral</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Condiciones:</h4>
            <ul className="text-yellow-700 space-y-1">
              <li>• Mínimo 6 meses de antigüedad</li>
              <li>• Monto máximo: 15 veces el salario</li>
              <li>• Plazo máximo: 60 meses</li>
              <li>• Tasa de interés: 12% anual</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Enviar Solicitud</h3>
            <p className="text-sm text-gray-600">
              Asegúrate de haber subido todos los documentos requeridos antes de enviar
            </p>
          </div>
          <button
            onClick={submitRequest}
            disabled={!uploadedFiles.solicitud || !uploadedFiles.carnet}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Enviar Solicitud
          </button>
        </div>
        
        {(!uploadedFiles.solicitud || !uploadedFiles.carnet) && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <AlertCircle className="w-4 h-4 inline mr-1" />
              Faltan documentos por subir:
              {!uploadedFiles.solicitud && ' Formulario de solicitud'}
              {!uploadedFiles.solicitud && !uploadedFiles.carnet && ','}
              {!uploadedFiles.carnet && ' Cédula de identidad'}
            </p>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Departamento de Recursos Humanos</h4>
            <p className="text-gray-600">📞 Teléfono: (809) 686-2362 ext. 2250</p>
            <p className="text-gray-600">📧 Email: prestamos@jce.gob.do</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Horario de Atención</h4>
            <p className="text-gray-600">🕐 Lunes a Viernes: 8:00 AM - 5:00 PM</p>
            <p className="text-gray-600">📍 Oficina: Planta Baja, Edificio Principal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanRequestSection;