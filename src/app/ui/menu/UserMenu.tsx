'use client'
import { logout } from '@/app/actions';
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';

import {
  IoBusinessOutline,
  IoChevronDownOutline,
  IoLogOutOutline,
  IoSettingsOutline,
  IoPersonCircleOutline,
  IoLogInOutline
} from 'react-icons/io5';
import { Spinner } from '../spinner/Spinner';

export const UserMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session } = useSession(); // Obtiene el estado de sesión

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
    window.location.href = '/auth/login';
  }
  const handleLogin = async () => {
    window.location.href = '/auth/login';
  }

  return (
    <>
      {isLoading && <Spinner title='Cerrando sesión...' />}
      <div className="relative">
        {session?.user ? (
          <>
            {/* Botón de menú */}
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center p-2 rounded text-white hover:text-white hover:bg-[#5442a8]"
            >
              <IoPersonCircleOutline className="mr-2" size={24} />
              <IoChevronDownOutline className="ml-2" size={16} />
            </button>

            {/* Menú desplegable */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-2xl py-4">
                {/* Información del usuario */}

                <div className="px-4 pb-4 border-b border-gray-300 mb-2">
                  <div className="flex items-center">
                    <IoPersonCircleOutline className="text-4xl text-gray-600 mr-3" />
                    <div>
                      <p className="font-semibold text-black">{session?.user ? (session?.user.role === 'admin' ? 'Admininistrador' : 'Usuario') : 'Invitado'}</p>
                      <p className="text-sm text-gray-500">{session?.user ? session?.user.email : 'correo@empresa.com'}</p>
                    </div>
                  </div>
                </div>

                {/* Opciones del menú */}
                <button className="w-full text-left px-4 py-2 text-black hover:bg-[#5442a8] hover:text-white flex items-center">
                  <IoBusinessOutline className="mr-3" size={18} /> Perfil de Usuario
                </button>
                <button className="w-full text-left px-4 py-2 text-black hover:bg-[#5442a8] hover:text-white flex items-center">
                  <IoSettingsOutline className="mr-3" size={18} /> Configuración
                </button>

                {/* Separador */}
                <div className="border-t border-gray-300 my-2"></div>

                {/* Opción de cierre de sesión */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-[#5442a8] hover:text-white flex items-center text-red-500">
                  <IoLogOutOutline className="mr-3" size={18} /> Cerrar Sesión
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center p-2 rounded text-white hover:text-white hover:bg-[#5442a8]">
            <IoLogInOutline className="mr-3" size={18} /> Ingresar
          </button>
        )}
      </div>
    </>
    
  );
};
