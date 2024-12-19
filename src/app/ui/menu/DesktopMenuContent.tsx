import Link from 'next/link';
import React from 'react'
import { IoChevronForwardOutline, IoHomeOutline, IoCloseOutline } from 'react-icons/io5';

type SubMenuItem = {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  
type MenuItem = {
    label: string;
    icon: React.ReactNode;
    submenu: SubMenuItem[];
};

export const DesktopMenuContent = ({ 
    menuItems, 
    activeMenu, 
    setActiveMenu,
    isExpanded = false,
    isMobile = false,
    onClose
  }: { 
    menuItems: MenuItem[], 
    activeMenu: string | null, 
    setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>,
    isExpanded?: boolean,
    isMobile?: boolean,
    onClose?: () => void
  }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 border-b border-gray-700 bg-[#322862] px-4">
                <div className="flex items-center">
                    <IoHomeOutline className="text-white" size={24} />
                    {(isExpanded || isMobile) && (
                    <span
                        className={`
                        ml-4 text-xl font-bold text-white 
                        transition-opacity duration-300 
                        ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                        `}
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        El Abuelo
                    </span>
                    )}
                </div>
                {isMobile && onClose && (
                    <button onClick={onClose}>
                    <IoCloseOutline className="text-white" size={24} />
                    </button>
                )}
            </div>

            <nav className="flex-1 overflow-y-auto text-black">
                {menuItems.map((menu) => (
                    <div key={menu.label}>
                        <button
                            onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
                            className="w-full px-4 py-3 flex items-center hover:bg-[#5442a8] hover:text-white"
                        >
                            {menu.icon}
                            {(isExpanded || isMobile) && (
                                <>
                                    <span className="ml-4">
                                        {menu.label}
                                    </span>
                                    {menu.submenu && (
                                        <IoChevronForwardOutline
                                            className={`ml-auto transition-transform ${activeMenu === menu.label ? 'rotate-90' : ''
                                                }`}
                                            size={16}
                                        />
                                    )}
                                </>
                            )}
                        </button>

                        {menu.submenu && activeMenu === menu.label && (isExpanded || isMobile) && (
                            <div className="bg-gray-700 text-white">
                                {menu.submenu.map((submenu) => (
                                    <Link
                                        key={submenu.label}
                                        href={submenu.href}
                                        className="px-6 py-2 hover:bg-[#5442a8] hover:text-white flex items-center"
                                    >
                                        {submenu.icon}
                                        <span className="ml-2">{submenu.label}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
}