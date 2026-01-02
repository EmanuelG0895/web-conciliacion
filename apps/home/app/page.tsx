import { Card } from "@repo/ui";
import { MonitorCog, Shield } from "lucide-react";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      <Card
        image={
          <Shield className="w-12 h-12 text-gs-text-dark dark:text-gs-text-light" />
        }
        href="/seguros"
        title="Seguros"
        textButton="ir a seguros"
      >
        <p>Descripcion de que es lo que se hace en esta zona</p>
      </Card>
      <Card
        image={
          <MonitorCog className="w-12 h-12 text-gs-text-dark dark:text-gs-text-light" />
        }
        href="/backoffice"
        title="Backoffice"
        textButton="ir a backoffice"
      >
        <p>Descripcion de que es lo que se hace en esta zona</p>
      </Card>
    </div>
  );
}
