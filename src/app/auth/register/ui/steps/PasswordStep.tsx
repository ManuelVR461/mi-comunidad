import { RegisterFormProps } from '@/libs';
import { useState } from 'react';

export const PasswordStep = ({ onNext, 
                               onBack ,
                               formData,
                               setFormData,
                            }: 
                            {  onNext: () => void; 
                               onBack: () => void
                              formData: RegisterFormProps; 
                              setFormData: (formData: RegisterFormProps) => void
                            }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [lengthValid, setLengthValid] = useState(false);
  const [uppercaseValid, setUppercaseValid] = useState(false);
  const [lowercaseValid, setLowercaseValid] = useState(false);
  const [numberValid, setNumberValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validar la contraseña en tiempo real
    setLengthValid(newPassword.length >= 8);
    setUppercaseValid(/[A-Z]/.test(newPassword));
    setLowercaseValid(/[a-z]/.test(newPassword));
    setNumberValid(/\d/.test(newPassword));
    setSpecialCharValid(/[!@#$%^&*()]/.test(newPassword));
    setPasswordsMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!lengthValid || !uppercaseValid || !lowercaseValid || !numberValid || !specialCharValid || !passwordsMatch) {
      alert('La contraseña debe cumplir con todos los requisitos.');
      return;
    }
    setFormData({
      ...formData,
      password
    });

    onNext();
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Confirme su contraseña"
          />
          <div className="mt-2 space-y-2">
            <div className={`flex items-center ${lengthValid ? 'text-green-500' : 'text-red-500'}`}>
              <span className="inline-block w-4 h-4 bg-current rounded-full"></span>
              <span className="ml-2">Mínimo 8 caracteres</span>
            </div>
            <div className={`flex items-center ${uppercaseValid ? 'text-green-500' : 'text-red-500'}`}>
              <span className="inline-block w-4 h-4 bg-current rounded-full"></span>
              <span className="ml-2">1 letra mayúscula</span>
            </div>
            <div className={`flex items-center ${lowercaseValid ? 'text-green-500' : 'text-red-500'}`}>
              <span className="inline-block w-4 h-4 bg-current rounded-full"></span>
              <span className="ml-2">1 letra minúscula</span>
            </div>
            <div className={`flex items-center ${numberValid ? 'text-green-500' : 'text-red-500'}`}>
              <span className="inline-block w-4 h-4 bg-current rounded-full"></span>
              <span className="ml-2">Al menos un número</span>
            </div>
            <div className={`flex items-center ${specialCharValid ? 'text-green-500' : 'text-red-500'}`}>
              <span className="inline-block w-4 h-4 bg-current rounded-full"></span>
              <span className="ml-2">1 carácter especial. Ejemplo: !@#$%^&*()</span>
            </div>
            <div className={`flex items-center ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
              <span className="inline-block w-4 h-4 bg-current rounded-full"></span>
              <span className="ml-2">Las contraseñas coinciden</span>
            </div>
          </div>
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
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};