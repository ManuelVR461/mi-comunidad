'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { StepSidebar } from "./StepSidebar";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { AddressStep } from "./steps/AddressStep";
import { VerificationStep } from "./steps/VerificationStep";
import { PasswordStep } from "./steps/PasswordStep";
import { registerUser } from "@/app/actions/auth/register";
import { RegisterFormProps } from "@/libs";
import { useRouter } from 'next/navigation';



export const RegisterForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormProps>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    province: "",
    commune: "",
    street: "",
    houseNumber: 0,
    postalCode: "",
    phone: "",
    verificationCode: "",
  });

  const steps = [
    { id: 1, title: "Información personal" },
    { id: 2, title: "Información de tu comunidad" },
    { id: 3, title: "Contraseña" },
    { id: 4, title: "Verificación" },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleComplete = async () => {
    try {
      const { ok, user, message } = await registerUser(
        formData.email,
        formData.password,
        formData.firstname,
        formData.lastname,
        formData.province,
        formData.commune,
        formData.street,
        formData.houseNumber,
        formData.postalCode,
        formData.phone,
        formData.verificationCode
      );

      if (ok) {
        alert(`Usuario ${user?.email} creado exitosamente.`);
        router.push('/auth/login');
      } else {
        alert(message);
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al registrar el usuario.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sección izquierda (1/3 del ancho) */}
      <div className="flex flex-col justify-center items-center bg-[#1A2F62] w-1/3 p-10">
        <StepSidebar steps={steps} currentStep={currentStep} />
      </div>

      {/* Sección derecha (2/3 del ancho) */}
      <div className="flex flex-col justify-center items-center bg-gray-200 w-2/3 text-black">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-lg shadow-md w-4/5"
        >
          {currentStep === 1 && (
            <PersonalInfoStep
              onNext={nextStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentStep === 2 && (
            <AddressStep
              onNext={nextStep}
              onBack={prevStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentStep === 3 && (
            <PasswordStep
              onNext={nextStep}
              onBack={prevStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentStep === 4 && (
            <VerificationStep
              onBack={prevStep}
              onComplete={handleComplete}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};