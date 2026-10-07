"use client";
import Banner from "@/components/atom/Banner";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import Pagination from "@/components/molecules/Pagination";
import Search from "@/components/molecules/Serch";
import TableInsti from "@/components/molecules/TableInsti";
import FormRegister from "@/components/organism/FormRegister";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { deleteUser } from "@/services/user/deleteUser";
import { getUsers } from "@/services/user/getUsers";
import {
  faUser,
  faIdCard,
  faUserTag,
  faEllipsis,
  faPhone,
  faBuilding,
  faTrash,
  faEdit,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function UsuariosPage() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getUsers({ page, search: appliedFilter }).then((data) => {
      setUsers(data.data);
      setPagination(data?.pagination);
    });
  }, [page, appliedFilter]);

  const fetchUsers = () => {
    setloading(true);
    getUsers({ page, search: appliedFilter }).then((data) => {
      if (data && data.data) {
        setUsers(data?.data);
        setPagination(data?.pagination);
      }
    });
    setloading(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage && newPage) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAppliedFilter("");
    }
  }, [search]);

  const handleSearch = () => {
    setAppliedFilter(search);
  };

  return (
    <div className="space-y-4">
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Crear Usuario"
      >
        <FormRegister
          mode="create"
          role={user?.user.role}
          onSuccess={() => {
            setIsOpen(false);
            fetchUsers();
          }}
        />
      </Modal>
      <h2 className="text-3xl dark:text-zinc-200 font-extrabold">
        Gestion de Usuarios
      </h2>
      <Banner
        icon={faInfo}
        titel="Usuarios Nuevos"
        message="Al crear un nuevo usuario sus credenciales de inicio de session se enviaran por correo electrónico de forma automática."
      />

      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <Search
          setSearch={setSearch}
          search={search}
          onSearch={handleSearch}
          placeholder="Cedula"
        />
        <div className="flex gap-5 items-center">
          {pagination && (
            <Pagination
              loading={loading}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
          <Button
            onClick={() => setIsOpen(true)}
            icon={faPlus}
            classNameBtn="bg-[#ED781F] hover:bg-orange-500 active:scale-95 transition-all p-3 rounded-xl text-slate-50 font-bold cursor-pointer flex items-center justify-center gap-2 w-full md:w-auto whitespace-nowrap shadow-lg shadow-[#ED781F]/20"
          >
            Crear Usuario
          </Button>
        </div>
      </div>

      <TableInsti
        loading={loading}
        titelTable={[
          { name: "Id", icon: faUserTag },
          { name: "Cedula", icon: faIdCard },
          { name: "Nombre y Apellido", icon: faUser },
          { name: "Escuela", icon: faBuilding },
          { name: "Acciones", icon: faEllipsis },
        ]}
        data={users}
        renderTableRows={(user) => (
          <tr
            key={user.id}
            className="transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-700/50 group"
          >
            <td className="px-6 py-4">
              <div className="flex flex-col group-hover:text-cyan-500 transition-colors dark:text-zinc-300">
                <span className="font-medium">{user.id}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col text-slate-700 dark:text-zinc-400 font-medium transition-colors">
                <span>{user.document}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2 group-hover:text-cyan-600 transition-colors">
                <span className="text-slate-500  dark:text-zinc-100  ">
                  {user.name}
                </span>
                <span className="text-slate-500  dark:text-zinc-100 ">
                  {user.last_name}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2 group-hover:text-cyan-600 transition-colors">
                <span className="text-slate-500  dark:text-zinc-100 ">
                  {user.school ? user.school.name : "SIGACE"}
                </span>
              </div>
              <span className="text-md text-slate-400  dark:text-zinc-500  capitalize">
                {user.role} - {user.school?.SIG || "SIGACE"}
              </span>
            </td>

            <td className="px-6 py-4">
              <div className="flex gap-2 group-hover:text-cyan-600 transition-colors">
                <Button
                  icon={faEdit}
                  classNameBtn="p-2 dark:text-zinc-200 text-slate-400 transition-colors hover:text-orange-600"
                  onClick={() => {
                    setIsOpenEdit(true);
                    setEditingUser(user);
                  }}
                />
                <Button
                  icon={faTrash}
                  classNameBtn="p-2 dark:text-zinc-200 text-slate-400 transition-colors hover:text-red-600"
                  onClick={() =>
                    deleteUser(user.id).then((data) => {
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
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${user.role === "sudo" ? "bg-green-50 text-green-600 dark:bg-green-950/30" : "bg-orange-50 text-orange-600 dark:bg-orange-950/30"}`}
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
                    <div>
                      <span className=" font-semibold text-slate-700">
                        {user.school.name}
                      </span>
                      <span className="text-slate-500 group-hover:text-cyan-600 transition-colors ml-3">
                        {user.school.SIG}
                      </span>
                    </div>
                  ) : (
                    <span className=" font-semibold text-slate-700">
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
        titel="Editar Usuario"
      >
        <FormRegister user={editingUser} mode="edit" />
      </Modal>
    </div>
  );
}
