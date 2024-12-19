"use client";

import { useState } from "react";
import Link from "next/link";
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";
import { Spinner } from "@/app/ui";
import { authenticate } from "@/app/actions";

export const LoginForm = () => {
  const [formState, setFormState] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const result = await authenticate(formState, formData);

    if (result === "Success") {
      setFormState("Success");
      window.location.replace("/");
    } else if (result === "CredentialsSignin") {
      setFormState("CredentialsSignin");
      setErrorMessage("Credenciales incorrectas. Por favor verifica e intenta nuevamente.");
    } else {
      setErrorMessage("Ocurrió un error inesperado. Intenta más tarde.");
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Spinner title="Iniciando sesión..." />}

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          name="email"
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5 text-black"
          type="password"
          name="password"
          required
        />

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <div className="flex flex-row mb-2">
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className={clsx({
            "btn-primary": !isLoading,
            "btn-disabled": isLoading,
          })}
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Ingresar"}
        </button>

        {/* divisor line */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/register" className="text-center hover:underline">
          ¿Eres residente y no tienes cuenta?
        </Link>
      </form>
    </>
  );
};
