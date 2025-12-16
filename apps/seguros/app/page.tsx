import { Card } from "@repo/ui";
import {
  ArrowRightIcon,
  Building2,
  Columns3Cog,
  Handshake,
  MonitorCog,
  PackagePlusIcon,
  User,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      <Card
        image={<MonitorCog width={50} height={50} />}
        href="/seguros"
        title="Administración de sistema"
        textButton="ir a administración"
      >
        <p>Descripción de que es lo que se hace en esta zona</p>
      </Card>
      <Card
        image={<Columns3Cog width={50} height={50} />}
        href="/seguros/bitacora"
        title="Bitácora"
        textButton="Ir a bitácora"
      >
        <p>Descripción de que es lo que se hace en esta zona</p>
      </Card>
      <Card
        image={<Handshake width={50} height={50} />}
        title="Conciliador ZAS"
      >
        <p>Descripción de la zona a la que quieres llegar </p>
        <Link
          className="flex items-center border border-black rounded-lg px-2 py-1 w-fit mt-3"
          href="/seguros/conciliador"
        >
          Conciliador
          <ArrowRightIcon className="ml-3" width={12} height={12} />
        </Link>
      </Card>
      <Card
        image={<PackagePlusIcon width={50} height={50} />}
        href="/seguros"
        title="Nuevo Producto"
        textButton="ir a nuevo producto"
      >
        <p>Descripción de que es lo que se hace en esta zona</p>
      </Card>
      <Card image={<Building2 width={50} height={50} />} title="Sociedades">
        <p>Descipcion de lo que se puede hacer en la zona</p>
        <Link
          className="flex items-center border border-black rounded-lg px-2 py-1 w-fit mt-3"
          href="/seguros/sociedades"
        >
          Sociedades
          <ArrowRightIcon className="ml-3" width={12} height={12} />
        </Link>
      </Card>
      <Card image={<User width={50} height={50} />} title="Usuarios">
        <p>Descripción de que es lo que se hace en esta zona</p>
        <Link
          className="flex items-center border border-black rounded-lg px-2 py-1 w-fit mt-3"
          href="/seguros/usuarios"
        >
          Conciliador
          <ArrowRightIcon className="ml-3" width={12} height={12} />
        </Link>
      </Card>
    </div>
  );
}
