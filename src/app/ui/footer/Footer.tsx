import React from 'react'

export const Footer = () => {
    return (
        <footer className="bg-[#1A2F62] border-t p-4 text-center text-sm text-gray-400">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <p>© 2024 Bits-ia.com. Todos los derechos reservados.</p>
                <p>Hora del servidor: {new Date().toLocaleTimeString()}</p>
            </div>
        </footer>
    );

}
