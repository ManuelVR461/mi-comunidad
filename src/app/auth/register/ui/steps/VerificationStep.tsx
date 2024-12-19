import { RegisterFormProps } from '@/libs';
import { useState, useEffect } from 'react';

export const VerificationStep = ({
  onBack,
  onComplete,
  formData,
  setFormData,
}: {
  onBack: () => void;
  onComplete: () => void;
  formData: RegisterFormProps;
  setFormData: (formData: RegisterFormProps) => void;
}) => {
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState('');

  useEffect(() => {
    // Simular el envío del código de verificación al correo electrónico del usuario
    setVerificationCode(Math.floor(100000 + Math.random() * 900000).toString());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar el código ingresado
    if (inputCode === verificationCode) {
      // Código válido
      setFormData({ ...formData, verificationCode: inputCode });
      onComplete();
    } else {
      // Código inválido
      alert('Código de verificación incorrecto. Por favor, ingrese el código correcto.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Verificación</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Código de verificación</label>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            required
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
            placeholder="Ingrese el código"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
          >
            Atrás
          </button>
          <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
            Finalizar
          </button>
        </div>
      </form>
    </div>
  );
};