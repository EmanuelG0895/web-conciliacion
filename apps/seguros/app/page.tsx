import { Card } from "@repo/ui";
import { Columns3Cog, Handshake } from "lucide-react";

export default function Page() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {/* <Card
        image={<MonitorCog width={50} height={50} />}
        href="/seguros"
        title="Administración de sistema"
        textButton="ir a administración"
      >
        <p>Descripción de que es lo que se hace en esta zona</p>
      </Card> */}
      <Card
        image={<Columns3Cog width={50} height={50} />}
        href="/seguros/bitacora"
        title="Bitácora de sistema"
        textButton="Ir a bitácora"
      >
        <p>Descripción de que es lo que se hace en esta zona</p>
      </Card>
      <Card
        image={<Handshake width={50} height={50} />}
        title="Conciliador ZAS"
        href="/seguros/conciliador"
        textButton="Ir a conciliador"
      >
        <p>Descripción de la zona a la que quieres llegar </p>
      </Card>
    </div>
  );
}
