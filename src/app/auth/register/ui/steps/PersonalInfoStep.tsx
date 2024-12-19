import { RegisterFormProps } from '@/libs';
import { useState } from 'react';

export const PersonalInfoStep = ({
  onNext,
  formData,
  setFormData,
}: {
  onNext: () => void;
  formData: RegisterFormProps;
  setFormData: (formData: RegisterFormProps) => void;
}) => {
  const [email, setEmail] = useState(formData.email);
  const [firstname, setFirstName] = useState(formData.firstname);
  const [lastname, setLastName] = useState(formData.lastname);
  const [phone, setPhone] = useState(formData.phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ ...formData, email, firstname, lastname, phone });
    onNext();
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Información personal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese su correo electrónico"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombres</label>
          <input
            type="firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Nombres"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Apellido"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Teléfono"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          Continuar
        </button>
      </form>
    </div>
  );
};