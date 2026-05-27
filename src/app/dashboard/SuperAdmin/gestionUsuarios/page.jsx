"use client";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import QuickActions from "@/components/molecules/QuickActions";
import TableInsti from "@/components/molecules/TableInsti";
import Icon from "@/components/atom/Icon";
import Modal from "@/components/organism/Modal";
import {
  faUser,
  faIdCard,
  faUserTag,
  faEllipsis,
  faPhone,
  faBuilding,
  faInfoCircle,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/atom/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getUsers } from "@/services/user/getUser";

import FormRegister from "@/components/organism/FormRegister";

export default function UsuariosPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:justify-between">
        <HeaderDashbord titelPage={"Gestion de Usuarios"} />
        <div className="p-3">
          <Button
            onClick={() => setIsOpen(true)}
            icon={faPlus}
            classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
          >
            Crear Usuario
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Crear Usuario"
          >
            <FormRegister />
          </Modal>
        </div>
      </div>
      <QuickActions />
      <div className="p-3">
        <div className="border border-cyan-200 bg-cyan-50 p-4 rounded-xl flex items-center gap-2">
          <Icon icon={faInfoCircle} className="text-cyan-600 text-xl" />
          <p className="text-sm text-cyan-600 leading-relaxed">
            Al crear un nuevo usuario sus credenciales de inicio de session se
            enviaran por{" "}
            <span className="font-bold text-cyan-800 uppercase">
              correo electrónico
            </span>{" "}
            de forma automática.
          </p>
        </div>
      </div>
      <TableInsti
        titelTable={[
          { name: "ID/Rol", icon: faUserTag },
          { name: "Cedula", icon: faIdCard },
          { name: "Nombre", icon: faUser },
          { name: "Contacto", icon: faPhone },
          { name: "Institución", icon: faBuilding },
          { name: "Acciones", icon: faEllipsis },
        ]}
        data={users}
        renderTableRows={(user) => (
          <tr className="transition-colors hover:bg-slate-50/50 group">
            <td className="px-6 py-4">
              <div className="flex flex-col group-hover:text-cyan-600 transition-colors">
                <span className="font-medium">{user.id}</span>
                <span className="text-md text-slate-400">{user.role}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col text-slate-700 font-medium transition-colors">
                <span>{user.document}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2 group-hover:text-cyan-600 transition-colors">
                <span className="text-slate-500 ">{user.name}</span>
                <span className="text-slate-500">{user.last_name}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col group-hover:text-cyan-600 transition-colors">
                <span className="text-slate-500">{user.email}</span>
                <span className="text-slate-500">{user.phone}</span>
              </div>
            </td>

            <td className="px-6 py-4">
              <div className="flex flex-col group-hover:text-cyan-600 transition-colors">
                <span className="font-medium">{user.SIG}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2 group-hover:text-cyan-600 transition-colors">
                <Button
                  icon={faEdit}
                  classNameBtn="p-2 text-slate-400 transition-colors hover:text-indigo-600"
                />
                <Button
                  icon={faTrash}
                  classNameBtn="p-2 text-slate-400 transition-colors hover:text-red-600"
                />
              </div>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
