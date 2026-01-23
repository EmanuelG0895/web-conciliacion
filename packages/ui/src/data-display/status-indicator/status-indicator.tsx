import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import React from 'react';

interface StatusParams {
  status: string;
}

export default function StatusIndicator({ status }: Readonly<StatusParams>) {
  let colorClass = '';
  let icon: React.ReactNode;
  let text = '';

  switch (status) {
    case 'DISPONIBLE':
      colorClass = 'bg-green-500';
      icon = (
        <span className="text-base text-white">
          <CheckIcon />
        </span>
      ); 
      text = 'Disponible';
      break;
    case 'EN_PROCESO':
      colorClass = 'bg-orange-500';
      icon = <span className="text-base text-white">!</span>; // Exclamation mark
      text = 'En Proceso';
      break;
    case 'SIN_INFO':
      colorClass = 'bg-red-500';
      icon = (
        <span className="text-base text-white">
          <Cross1Icon />
        </span>
      ); 
      text = 'Sin Información';
      break;
  }
  return (
    <div
      className={`flex items-center space-x-2 rounded-lg p-2 text-white ${colorClass}`}
    >
      {icon}
      <span className="text-sm font-semibold">{text}</span>
    </div>
  );
}
