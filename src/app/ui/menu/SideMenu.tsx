'use client'
import React, { useState, useEffect } from 'react'
import {
  IoRefreshOutline,
  IoStatsChartOutline,
  IoMenuOutline,
} from 'react-icons/io5';
import { MdBlurOn } from 'react-icons/md';
import { DesktopMenuContent } from './DesktopMenuContent';
import { useSession } from 'next-auth/react';


export const SideMenu = () => {
  const { data: session } = useSession(); // Obtiene el estado de sesión
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado principal para menú expandido en móvil
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false); // Estado para hover en escritorio
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    {
      label: 'Procesos',
      icon: <IoRefreshOutline />,
      submenu: [{ label: 'Ingresar Ventas', href: '/ventas', icon: <MdBlurOn /> }],
    },
    {
      label: 'Reportes',
      icon: <IoStatsChartOutline />,
      submenu: [{ label: 'Lista de Arqueos', href: '/arqueos', icon: <MdBlurOn /> }],
    },
  ];

  const handleMenuHover = (isHovering: boolean) => {
    if (!isMobile) {
      setIsDesktopExpanded(isHovering); // Expandir o colapsar menú en desktop al pasar el mouse
    }
  };

  if (!session?.user) return null; // Ocultar si no está autenticado

  return (
    <>
      {/* Mobile Menu Toggle */}
      {!isDesktopExpanded && !isMenuOpen && ( // Mostrar solo si no está desplegado
        <button
          onClick={() => setIsMenuOpen(true)}
          className={`
            fixed top-4 left-4 z-50 
            bg-[#322862] p-2 rounded-full
          `}
        >
          <IoMenuOutline className="text-white" />
        </button>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        >
          <aside
            className={`
              absolute top-0 left-0 h-full w-64
              bg-white text-black
              overflow-y-auto 
              shadow-lg z-50
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <DesktopMenuContent
              menuItems={menuItems}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              isExpanded={true}
              isMobile={true}
              onClose={() => setIsMenuOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Permanent Desktop Menu */}
      <aside
        className={`
          fixed top-0 left-0 h-screen 
          ${isDesktopExpanded ? 'w-64' : 'w-16'}
          text-black bg-white
          transition-all duration-300 
          overflow-hidden group
          hidden md:block
          z-50
        `}
        onMouseEnter={() => handleMenuHover(true)} // Expandir menú al pasar el mouse
        onMouseLeave={() => handleMenuHover(false)} // Colapsar menú al salir del área
      >
        <DesktopMenuContent
          menuItems={menuItems}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          isExpanded={isDesktopExpanded}
          isMobile={false}
        />
      </aside>
    </>
  );
};
