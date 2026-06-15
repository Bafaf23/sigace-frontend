"use client";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import TableInsti from "@/components/molecules/TableInsti";
import FormRegister from "@/components/organism/FormRegister";
import Modal from "@/components/organism/Modal";
import { deleteUser } from "@/services/user/deleteUser";
import { getUsers } from "@/services/user/getUsers";
import {
  faUser,
  faIdCard,
  faUserTag,
  faEllipsis,
  faPhone,
  faLocationDot,
  faBuilding,
  faInfoCircle,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function UsuariosPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  console.log(users);
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
            <FormRegister mode="create" />
          </Modal>
        </div>
      </div>
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
          <tr
            key={user.id}
            className="transition-colors hover:bg-slate-50/50 group"
          >
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
                {user.school ? (
                  <>
                    <span className="font-medium uppercase text-slate-700">
                      {user.school.name}
                    </span>
                    <span className="text-slate-500 group-hover:text-cyan-600 transition-colors">
                      {user.school.SIG}
                    </span>
                  </>
                ) : (
                  <span className="text-slate-500 font-medium group-hover:text-cyan-600 transition-colors">
                    SIGACE
                  </span>
                )}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2 group-hover:text-cyan-600 transition-colors">
                <Button
                  icon={faEdit}
                  classNameBtn="p-2 text-slate-400 transition-colors hover:text-indigo-600"
                  onClick={() => {
                    setIsOpenEdit(true);
                    setEditingUser(user);
                  }}
                />
                <Button
                  icon={faTrash}
                  classNameBtn="p-2 text-slate-400 transition-colors hover:text-red-600"
                  onClick={() =>
                    deleteUser(user.id, user.role_id).then((data) => {
                      if (data.error) {
                        toast.error(data.error);
                      } else {
                        setUsers(users.filter((u) => u.id !== user.id));
                      }
                    })
                  }
                />
              </div>
            </td>
          </tr>
        )}
        renderMovilCard={(user) => (
          <div
            key={`card-${user.id}`}
            className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Encabezado de la Card */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {user.document}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  {user.name} {user.last_name}
                </h3>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${user.role === "SuperAdmin" ? "bg-green-50 text-green-600 dark:bg-green-950/30" : "bg-orange-50 text-orange-600 dark:bg-orange-950/30"}`}
              >
                {user.role}
              </span>
            </div>

            {/* Detalles en filas */}
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <Icon icon={faBuilding} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    Institución
                  </span>
                  {user.school ? (
                    <>
                      <span className="font-mono font-semibold text-slate-700">
                        {user.school.name}
                      </span>
                      <span className="text-slate-500 group-hover:text-cyan-600 transition-colors">
                        {user.school.SIG}
                      </span>
                    </>
                  ) : (
                    <span className="font-mono font-semibold text-slate-700">
                      SIGACE
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon icon={faPhone} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    Contacto
                  </span>
                  <p>{user.phone}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      />
      <Modal
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        title="Editar Usuario"
      >
        <FormRegister user={editingUser} mode="edit" />
      </Modal>
    </div>
  );
}
