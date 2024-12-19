'use client';

import { RegisterFormProps } from "@/libs";
import regionesYcomunas from "@/comunas-regiones.json";
import { useState } from "react";

export const AddressStep = ({ onNext, 
                              onBack, 
                              formData, 
                              setFormData }: 
                            { onNext: () => void; 
                              onBack: () => void; 
                              formData: RegisterFormProps; 
                              setFormData: (formData: RegisterFormProps) => void }) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedComuna, setSelectedComuna] = useState("");
  const [comunas, setComunas] = useState<string[]>([]);
  const [street, setStreet] = useState(formData.street);
  const [houseNumber, setHouseNumber] = useState(formData.houseNumber);
  const [postalCode, setPostalCode] = useState(formData.postalCode);


  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value;
    setSelectedRegion(region);

    // Encuentra las comunas de la región seleccionada
    const regionData = regionesYcomunas.regiones.find(
      (reg) => reg.NombreRegion === region
    );

    // Actualiza el estado de comunas
    setComunas(regionData ? regionData.comunas : []);
    setSelectedComuna(""); // Resetea la comuna seleccionada
  };

  const handleComunaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComuna(e.target.value);
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };

  const handleHouseNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHouseNumber(parseInt(e.target.value));
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      ...formData,
      province: selectedRegion,
      commune: selectedComuna,
      street,
      houseNumber,
      postalCode,
    });
    onNext();
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Información de tu comunidad</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700">Región</label>
          <select
            id="region"
            value={selectedRegion}
            onChange={handleRegionChange}
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Seleccione región</option>
            {regionesYcomunas.regiones.map((region, index) => (
              <option key={index} value={region.NombreRegion}>
                {region.NombreRegion}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="comuna" className="block text-sm font-medium text-gray-700">Comuna</label>
          <select
            id="comuna"
            value={selectedComuna}
            onChange={handleComunaChange}
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            disabled={!comunas.length}
          >
            <option value="">Seleccione comuna</option>
            {comunas.map((comuna, index) => (
              <option key={index} value={comuna}>
                {comuna}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Calle/Avenida</label>
          <input
            type="text"
            value={street}
            onChange={handleStreetChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Calle o Avenida"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Casa/Departamento Nro:</label>
          <input
            type="text"
            value={houseNumber}
            onChange={handleHouseNumberChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="123"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Codigo Postal</label>
          <input
            type="text"
            value={postalCode}
            onChange={handlePostalCodeChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Codigo Postal"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400"
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
