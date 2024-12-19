'use client'
import React from 'react'
import { UserMenu } from './UserMenu';
import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5";
import { useSession } from 'next-auth/react';
import { Spinner } from '../spinner/Spinner';

export const MenuHeader = () => {
  const { data: session } = useSession(); // Obtiene el estado de sesión

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#322862] shadow-md z-30 flex items-center justify-between px-4 py-3 h-16">
      {/* Aquí la altura se fija a 16 unidades para que podamos reutilizarla */}
      <div className="flex items-center space-x-4">
        {!session?.user ? (
          <>
            <div className="flex items-center">
                <IoHomeOutline className="text-white" size={24} />
                <span
                  className="ml-4 text-xl font-bold text-white transition-opacity duration-300 opacity-100 w-auto"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  El Abuelo
                </span>
            </div>
            <Spinner title='Cargando Opciones de Usuario...' />
          </>
            
        ):''}
      </div>

      <div className="flex items-center space-x-4">
        {session?.user ? (
          <button className="relative hover:bg-gray-800 p-2 rounded-full">
            <IoNotificationsOutline />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">
              3
            </span>
          </button>
        ) : ''}
        <UserMenu />
      </div>
    </nav>
  );
}