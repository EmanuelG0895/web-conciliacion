import { Card } from "@repo/ui";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      <Card
        image="https://picsum.photos/200/300"
        href="/seguros"
        title="Seguros"
        textButton="ir a seguros"
      >
        <p>Descripcion de que es lo que se hace en esta zona</p>
      </Card>
      <Card
        image="https://picsum.photos/200/300"
        href="/seguros"
        title="Seguros"
        textButton="ir a seguros"
      >
        <p>Descripcion de que es lo que se hace en esta zona</p>
      </Card>
      <Card
        image="https://picsum.photos/200/300"
        href="/seguros"
        title="Seguros"
        textButton="ir a seguros"
      >
        <p>Descripcion de que es lo que se hace en esta zona</p>
      </Card>
      <Card
        image="https://picsum.photos/200/300"
        href="/seguros"
        title="Seguros"
        textButton="ir a seguros"
      >
        <p>Descripcion de que es lo que se hace en esta zona</p>
      </Card>
      <Card
        image="https://picsum.photos/200/300"
        href="/seguros"
        title="Seguros"
        textButton="ir a seguros"
      >
        <p>Descripcion de que es lo que se hace en esta zona</p>
      </Card>
      <Card
        image="https://picsum.photos/200/300"
        href="/seguros"
        title="Seguros"
        textButton="ir a seguros"
      >
        <p>Descripcion de que es lo que se hace en esta zona</p>
      </Card>
    </div>
  );
}
