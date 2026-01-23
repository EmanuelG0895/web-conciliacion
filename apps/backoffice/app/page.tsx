import { Card } from "@repo/ui";
import { Building2, PackagePlusIcon, User } from "lucide-react";

export default function Home() {
  const routes = [
    {
      id: 1,
      image: <Building2 width={50} height={50} />,
      title: "Sociedades",
      href: "/backoffice/sociedades",
      textButton: "Ir a sociedades",
      link: false,
    },
    {
      id: 2,
      image: <User width={50} height={50} />,
      title: "Usuarios",
      href: "/backoffice/usuarios",
      textButton: "Ir a sociedades",
      link: false,
    },
    {
      id: 3,
      image: <PackagePlusIcon width={50} height={50} />,
      title: "Nuevo Producto",
      href: "/backoffice/nuevoProducto",
      textButton: "Ir a sociedades",
      link: true,
    },
    {
      id: 4,
      image: <PackagePlusIcon width={50} height={50} />,
      title: "Nuevo Producto",
      href: "/backoffice/cuentasContables",
      textButton: "ir a cuentas contables",
      link: true,
    },
  ];
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {routes.map((content) => (
        <Card
          key={content.id}
          image={content.image}
          href={content.href}
          title={content.title}
          link={content.link}
          textButton={content.textButton}
        >
          <p>Descripción de que es lo que se hace en esta zona</p>
        </Card>
      ))}
    </div>
  );
}
