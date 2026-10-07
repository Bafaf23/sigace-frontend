"use client";

import Loading from "@/app/loading";
import Banner from "@/components/atom/Banner";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import SkeletonCard from "@/components/atom/SkeletonCard";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Search from "@/components/molecules/Serch";
import TableInsti from "@/components/molecules/TableInsti";
import FormRegister from "@/components/organism/FormRegister";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { userSchool } from "@/services/user/userSchool";
import {
  faAdd,
  faIdCard,
  faUser,
  faPhone,
  faInfoCircle,
  faBuilding,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback, startTransition } from "react";

export default function GestionPersonalPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const { user, loading: authLoading } = useAuth();
  const [dataLoading, setDataLoading] = useState(true);

  // Carga de catálogo de docentes
  const loadTeachers = useCallback((silent = false) => {
    if (!silent) setDataLoading(true);

    userSchool()
      .then((res) => {
        const users = res?.data ?? [];

        startTransition(() => {
          setUsers(users);
        });
      })
      .catch((err) =>
        console.error(
          "❌ [SIGACE UI]: Error al procesar nómina de docentes:",
          err,
        ),
      )
      .finally(() => setDataLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) loadTeachers();
  }, [user, loadTeachers]);

  // Limpieza controlada del input de búsqueda si se vacía el campo
  useEffect(() => {
    if (search.trim() === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilter("");
    }
  }, [search]);

  const handleSearch = () => {
    setFilter(search);
  };

  // Filtrado optimizado sobre el estado local
  const filteredUsers = users.filter((users) => {
    const cedulaStr = String(users?.id_card || "");
    const nameStr = String(users?.name || "");
    const lastNameStr = String(users?.last_name || "");
    const completeTerm = `${cedulaStr} ${nameStr} ${lastNameStr}`.toLowerCase();

    return completeTerm.includes(filter.toLowerCase().trim());
  });

  if (authLoading) return <Loading />;
  if (
    !user ||
    user.user.role === "estudiantes" ||
    user.user.role === "profesores"
  )
    return <AccessDenied />;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out space-y-3">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 p-1">
        <h2 className="text-3xl dark:text-zinc-200 font-extrabold">
          Gestion de Personal
        </h2>
      </div>

      {/* Modal de Registro */}
      <Modal
        title="Registrar Nuevo Docente"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <FormRegister
          mode="create"
          onSuccess={() => {
            setIsOpen(false);
            loadTeachers(true);
          }}
        />
      </Modal>

      <Banner
        icon={faInfo}
        titel="¿Necesitas actualizar el estatus de un docente?"
        message="Para modificar la disponibilidad o el estado activo/inactivo de la nómina, por favor contacta a soporte técnico"
      />

      {/* Barra de Filtros y Búsquedas */}
      <div className="flex justify-between flex-col md:flex-row gap-5 w-full">
        <div className="max-w-md">
          <Search
            placeholder="Buscar por cédula o nombre..."
            search={search}
            setSearch={setSearch}
            onSearch={handleSearch}
          />
        </div>
        <div>
          <Button
            onClick={() => setIsOpen(true)}
            icon={faAdd}
            classNameBtn="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all p-3 rounded-xl text-slate-50 font-bold cursor-pointer flex items-center justify-center gap-2 w-full md:w-auto whitespace-nowrap shadow-lg shadow-indigo-500/20"
          >
            Registrar Docente
          </Button>
        </div>
      </div>

      {/* Área de Datos: Tabla e Historial Reactivo */}
      {dataLoading ? (
        <SkeletonCard />
      ) : (
        <div>
          <TableInsti
            titelTable={[
              { name: "Cédula", icon: faIdCard },
              { name: "Nombre y apellido", icon: faUser },
              { name: "Rol", icon: faBuilding },
              { name: "Contacto", icon: faPhone },
              { name: "Estatus", icon: faInfoCircle },
            ]}
            data={filteredUsers}
            renderTableRows={(user) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/30 group border-b border-slate-100 dark:border-slate-800"
              >
                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300 text-sm">
                  {user.id_card}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm">
                      {user.name} {user.last_name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono mt-0.5">
                      {user.id || "-"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5 max-w-xs capitalize font-bold dark:text-orange-500">
                    {user.role.name}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {user.phone || "Sin Teléfono"}
                    </span>
                    <span>{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      user.is_active
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                    }`}
                  >
                    {user.is_active ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            )}
            renderMovilCard={(user) => (
              <div
                key={`card-user-${user.id}`}
                className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm mb-3 border-dashed"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block tracking-wider">
                      C.I. {user.document}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {user.name} {user.last_name}
                    </h3>
                  </div>
                  <span className="text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono px-2 py-0.5 rounded-lg border border-indigo-500/10">
                    {user.id}
                  </span>
                </div>
                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between items-center pt-1 text-[11px]">
                    <p>
                      <strong className="text-slate-400 dark:text-slate-500">
                        Email:
                      </strong>{" "}
                      {user.email || "No registrado"}
                    </p>
                    <p>
                      <strong className="text-slate-400 dark:text-slate-500">
                        Tlf:
                      </strong>{" "}
                      {user.phone || "No registrado"}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        user.is_active
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-rose-500/10 text-rose-600"
                      }`}
                    >
                      {user.is_active ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
