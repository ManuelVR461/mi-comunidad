"use server";

import { signIn } from "@/auth.config"; 

// Función para iniciar sesión
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    
    if (response?.ok) {
      return { ok: true };
    }

    return {
      ok: false,
      message: response?.error || "No se pudo iniciar sesión",
    };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return {
      ok: false,
      message: "Error inesperado. Inténtalo más tarde.",
    };
  }
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';
  } catch (error) {
    console.log(error);
    return 'CredentialsSignin'
  }
}