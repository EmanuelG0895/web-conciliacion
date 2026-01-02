import React, { useState, ReactNode } from "react";

// 1. Define la interfaz para cada opción de pestaña
interface TabOption {
  // Etiqueta que se mostrará en el botón de la pestaña
  label: string;
  // Contenido que se renderizará cuando la pestaña esté activa
  // ReactNode permite cualquier cosa que React pueda renderizar (JSX, componentes, etc.)
  content: ReactNode;
}

interface DynamicTabsProps {
  // Arreglo de opciones que el componente acepta
  options: TabOption[];
}

export default function DynamicTabs({ options }: Readonly<DynamicTabsProps>) {
  // 2. Inicializa el estado con la etiqueta de la primera opción
  const [activeTab, setActiveTab] = useState(options[0]?.label || "");

  // 3. Encuentra el contenido que corresponde a la pestaña activa
  const activeContent = options.find(
    (option) => option.label === activeTab
  )?.content;

  return (
    <>
      {/* SECCIÓN DE LA BARRA DE NAVEGACIÓN DE LAS PESTAÑAS */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {options.map((option) => (
            <button
              key={option.label}
              // Al hacer clic, se actualiza el estado activo
              onClick={() => setActiveTab(option.label)}
              className={`
                border-b-2 px-1 pb-3 text-lg font-medium whitespace-nowrap transition-colors
                ${
                  activeTab === option.label
                    ? "border-gs-primary-light text-gs-black dark:text-gs-text-light dark:border-gs-primary-dark" // Estilo Activo
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" // Estilo Inactivo
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </nav>
      </div>

      {/* SECCIÓN DEL CONTENIDO RENDERIZADO */}
      <div>
        {/* Renderiza el componente/contenido encontrado */}
        {activeContent}
      </div>
    </>
  );
}
