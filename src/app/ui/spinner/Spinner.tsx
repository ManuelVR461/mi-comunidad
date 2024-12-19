import React from 'react'

interface SpinnerProps {
  title: string;
}

export const Spinner = ({ title }: SpinnerProps) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="text-white mt-4">{title}</p>
      </div>
    </div>
);