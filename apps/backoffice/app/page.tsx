import { Card } from "@repo/ui";
import { Building2, PackagePlusIcon, User } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      <Card
        image={<Building2 width={50} height={50} />}
        title="Sociedades"
        href="/backoffice/sociedades"
        textButton="Ir a sociedades"
      >
        <p>Descripción de lo que se puede hacer en la zona</p>
      </Card>
      <Card
        image={<User width={50} height={50} />}
        title="Usuarios"
        href="/backoffice/usuarios"
        textButton="Ir a usuarios"
      >
        <p>Descripción de que es lo que se hace en esta zona</p>
      </Card>
      <Card
        image={<PackagePlusIcon width={50} height={50} />}
        href="/backoffice/nuevoProducto"
        title="Nuevo Producto"
        link={true}
        textButton="ir a nuevo producto"
      >
        <p>Descripción de que es lo que se hace en esta zona</p>
      </Card>
    </div>
  );
}
