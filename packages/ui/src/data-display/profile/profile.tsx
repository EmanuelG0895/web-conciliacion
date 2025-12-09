import { PersonIcon } from '@radix-ui/react-icons';

export default function Profile() {
  return (
    <div className="relative flex">
      <select id="mySelect" className="appearance-none">
        <option className="appearance-none" value="opcion1">
          usuario
        </option>
        <option className="appearance-none" value="opcion2">
          cerrar sesion
        </option>
        <option className="appearance-none" value="opcion3">
          configuraciones
        </option>
      </select>
      <div
        id="selectIcon"
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <PersonIcon />
      </div>
    </div>
  );
}
