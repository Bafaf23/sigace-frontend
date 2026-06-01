import Button from "../atom/Button";
import Input from "../atom/Input";
import Selector from "../atom/Selector";
import SelectorInput from "../molecules/SelectorInput";
import { useState } from "react";

export default function FormDocente() {
  const [page, setPage] = useState(1);

  const documentType = [
    { value: "V-", label: "Venezolano" },
    { value: "E-", label: "Extranjero" },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <form className="space-y-6 p-2">
        {page === 1 && (
          <>
            <h2 className="text-2xl font-bold border-b pb-4 text-blue-700">
              Datos Personales
            </h2>
            <SelectorInput
              label="Tipo de Documento"
              name="documentType"
              placeholder="30209233"
              options={documentType}
              value={documentType}
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Nombre"
                type="text"
                name="name"
                placeholder="Nombre"
                value={name}
              />
              <Input
                label="Apellido"
                type="text"
                name="lastName"
                placeholder="Apellido"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="email@example.com"
              />
              <Input
                label="Telefono"
                type="text"
                name="phone"
                placeholder="04123456789"
              />
            </div>
          </>
        )}
        {page === 2 && <></>}

        <div className="flex justify-between">
          {page === 2 && (
            <Button
              onClick={() => setPage(page - 1)}
              classNameBtn="text-slate-500 p-2 rounded-md cursor-pointer flex items-center gap-1"
            >
              Anterior
            </Button>
          )}
          <div></div>
          <Button
            onClick={() => setPage(page + 1)}
            classNameBtn="bg-indigo-500 text-white p-2 rounded-md cursor-pointer flex items-center gap-1"
          >
            {page === 1 ? "Siguiente" : "Crear Docente"}
          </Button>
        </div>
      </form>
    </div>
  );
}
