// Emulación de llamada a una API que retorna un arreglo de objetos

export interface Week {
  id: number;
  title: string;
}

export async function obtenerSemanas(): Promise<Week[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    { id: 1, title: "Semana 1" },
    { id: 2, title: "Semana 2" },
    { id: 3, title: "Semana 3" },
    { id: 4, title: "Semana 4" },
    { id: 5, title: "Semana 5" },
    { id: 6, title: "Semana 6" },
    { id: 7, title: "Semana 7" },
    { id: 8, title: "Semana 8" },
    { id: 9, title: "Semana 9" },
    { id: 10, title: "Semana 10" },
    { id: 11, title: "Semana 11" },
    { id: 12, title: "Semana 12" },
    { id: 13, title: "Semana 13" },
    { id: 14, title: "Semana 14" },
    { id: 15, title: "Semana 15" },
    { id: 16, title: "Semana 16" },
    { id: 17, title: "Semana 17" },
    { id: 18, title: "Semana 18" },
    { id: 19, title: "Semana 19" },
    { id: 20, title: "Semana 20" },
    { id: 21, title: "Semana 21" },
    { id: 22, title: "Semana 22" },
    { id: 23, title: "Semana 23" },
    { id: 24, title: "Semana 24" },
    { id: 25, title: "Semana 25" },
    { id: 26, title: "Semana 26" },
    { id: 27, title: "Semana 27" },
    { id: 28, title: "Semana 28" },
    { id: 29, title: "Semana 29" },
    { id: 30, title: "Semana 30" },
    { id: 31, title: "Semana 31" },
    { id: 32, title: "Semana 32" },
    { id: 33, title: "Semana 33" },
    { id: 34, title: "Semana 34" },
    { id: 35, title: "Semana 35" },
    { id: 36, title: "Semana 36" },
    { id: 37, title: "Semana 37" },
    { id: 38, title: "Semana 38" },
    { id: 39, title: "Semana 39" },
    { id: 40, title: "Semana 40" },
    { id: 41, title: "Semana 41" },
    { id: 42, title: "Semana 42" },
    { id: 43, title: "Semana 43" },
    { id: 44, title: "Semana 44" },
    { id: 45, title: "Semana 45" },
    { id: 46, title: "Semana 46" },
    { id: 47, title: "Semana 47" },
    { id: 48, title: "Semana 48" },
    { id: 49, title: "Semana 49" },
    { id: 50, title: "Semana 50" },
    { id: 51, title: "Semana 51" },
    { id: 52, title: "Semana 52" },
  ];
  return data;
}

export interface Month {
  id: number;
  title: string;
}

export async function obtenerMeses(): Promise<Month[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    { id: 1, title: "Enero" },
    { id: 2, title: "Febrero" },
    { id: 3, title: "Marzo" },
    { id: 4, title: "Abril" },
    { id: 5, title: "Mayo" },
    { id: 6, title: "Junio" },
    { id: 7, title: "Julio" },
    { id: 8, title: "Agosto" },
    { id: 9, title: "Septiembre" },
    { id: 10, title: "Octubre" },
    { id: 11, title: "Noviembre" },
    { id: 12, title: "Diciembre" },
  ];
  return data;
}
