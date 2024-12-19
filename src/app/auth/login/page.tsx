import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Sección izquierda (1/3 del ancho) */}
      <div className="flex flex-col justify-center items-center bg-[#1A2F62] w-1/3 p-10">
        <h1 className="text-4xl font-bold mb-5">Ingresar</h1>
        <LoginForm />
      </div>

      {/* Sección derecha (2/3 del ancho) */}
      <div className="flex flex-col justify-center items-center bg-gray-200 w-2/3">
        <h2 className="text-2xl font-semibold text-gray-700">Bienvenido a nuestra plataforma</h2>
        <p className="mt-4 text-gray-600 text-center max-w-lg">
          Aquí podrás gestionar tus ventas, configurar tus opciones y mucho más.
        </p>
      </div>
    </div>
  );
}
