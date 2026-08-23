"use client";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Button from "@/components/atom/Button";
import {
  faPlus,
  faEdit,
  faTrash,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import TableInsti from "@/components/molecules/TableInsti";
import Modal from "@/components/organism/Modal";
import Banner from "@/components/atom/Banner";
import { deleteSchool } from "@/services/school/deleteSchool";
import { useState, useEffect } from "react";
import { getSchools } from "@/services/school/getSchool";
import { getUsers } from "@/services/user/getUsers";
import Icon from "@/components/atom/Icon";
import FormInstitucion from "@/components/organism/FormInstitucion";
import Search from "@/components/molecules/Serch";
import {
  faCode,
  faInstitution,
  faLocationDot,
  faNetworkWired,
  faPhone,
  faIdCard,
  faTag,
  faBuilding,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function InstitucionesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingInstitution, setEditingInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [schoolsRes, usersRes] = await Promise.all([
          getSchools(),
          getUsers(),
        ]);

        setInstitutions(schoolsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error al cargar datos del panel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fechSchool = () => {
    getSchools().then((data) => {
      if (data.data) {
        setInstitutions(data.data);
      }
    });
  };

  const filteredInstitutions = institutions.filter((institution) => {
    const SIG = String(institution?.SIG || "");
    const nameStr = String(institution?.name || "");
    const completeTerm = `${SIG} ${nameStr}`.toLowerCase();

    return completeTerm.includes(appliedFilter.toLowerCase().trim());
  });

  useEffect(() => {
    if (search.trim() === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAppliedFilter("");
    }
  }, [search]);

  const handleSearch = () => {
    setAppliedFilter(search);
  };
  const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:p-3 lg:justify-between">
        <HeaderDashbord titelPage={"Instituciones"} />
        <div className="p-3">
          <Modal
            title="Agregar nueva institución"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <FormInstitucion
              directores={users.filter((user) => user.role === "director")}
              onSuccess={() => {
                setIsOpen(false);
                fechSchool();
              }}
            />
          </Modal>
        </div>
      </div>

      <div className="p-3">
        {/*  <div className="border border-amber-200 bg-amber-50 p-4 rounded-xl flex items-center gap-2">
          <Icon icon={faInfoCircle} className="text-amber-600 text-xl" />
          <p className="text-sm text-amber-600 leading-relaxed">
            Las instituciones de tipo <span className="font-bold">pública</span>{" "}
            tienen como razón social el nombre del{" "}
            <span className="font-bold text-amber-800">
              Ministerio del Poder Popular para la Educación
            </span>{" "}
            y el RIF del mismo.
          </p>
        </div> */}
        <Banner
          icon={faInfo}
          titel="Instituciones Públicas"
          message="Las instituciones de tipo pública  tienen como razón social el nombre del Ministerio del Poder Popular para la Educación y el RIF del mismo."
        />
      </div>
      <div className="p-3 w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <Search
          placeholder="Código SIG o nombre..."
          setSearch={setSearch}
          onSearch={handleSearch}
          search={search}
        />

        <Button
          onClick={() => setIsOpen(true)}
          icon={faPlus}
          classNameBtn="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all p-3 rounded-xl text-slate-50 font-bold cursor-pointer flex items-center justify-center gap-2 w-full md:w-auto whitespace-nowrap shadow-lg shadow-indigo-500/20"
        >
          Crear Institución
        </Button>
      </div>

      <TableInsti
        loading={loading}
        titelTable={[
          { name: "SIG", icon: faCode },
          { name: "Institucion", icon: faInstitution },
          { name: "Razon Social", icon: faBuilding },
          { name: "Direccion", icon: faLocationDot },
          { name: "Contacto", icon: faPhone },
          { name: "Tipo", icon: faTag },
          { name: "RIF/DEA", icon: faIdCard },
          { name: "CDCEE", icon: faIdCard },
          { name: "Subdominio", icon: faNetworkWired },
          { name: "Acciones", icon: faEllipsis },
        ]}
        renderTableRows={(institution) => (
          <tr
            key={institution.SIG}
            className="transition-colors hover:bg-slate-50/50 group"
          >
            {/* SIG Y DIRECTOR */}
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex flex-col group-hover:text-cyan-600 transition-colors">
                <span className="font-medium">{institution.SIG}</span>
              </div>
              <div>
                <span
                  className={`inline-flex items-center max-w-40 px-2 py-0.5 rounded-full text-xs font-semibold ${institution.is_active ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800/60" : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/60"} `}
                  title={
                    institution.is_active
                      ? `${institution.is_active}`
                      : "Sin asignar"
                  }
                >
                  <span className="truncate">
                    {institution.is_active ? `Activa` : "Inactiva"}
                  </span>
                </span>
              </div>
            </td>

            {/* NOMBRE DE LA INSTITUCIÓN */}
            <td className="px-4 py-4 max-w-50">
              <span
                className="font-medium text-slate-800 line-clamp-2"
                title={institution.school_name}
              >
                {institution.school_name}
              </span>
              <span
                className="inline-flex  max-w-40 px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/60"
                title={
                  institution.director
                    ? `${institution.director.name} ${institution.director.last_name}`
                    : "Sin asignar"
                }
              >
                <span className="truncate">
                  {institution.director
                    ? `${institution.director.name} ${institution.director.last_name}`
                    : "Sin asignar"}
                </span>
              </span>
            </td>

            {/* RAZÓN SOCIAL */}
            <td className="px-4 py-4 max-w-45">
              <span
                className={`font-medium uppercase line-clamp-1 ${
                  institution.type === "Pública" ||
                  institution.type === "Publica"
                    ? "text-green-500"
                    : "text-orange-500"
                }`}
                title={institution.company_name}
              >
                {institution.type === "Pública" ||
                institution.type === "Publica"
                  ? "MPPE"
                  : institution.company_name}
              </span>
            </td>

            {/* DIRECCIÓN */}
            <td className="px-4 py-4 max-w-55">
              <span
                className="font-medium text-slate-800 text-sm line-clamp-2"
                title={institution.address}
              >
                {institution.address}
              </span>
            </td>

            {/* CONTACTO */}
            <td className="px-4 py-4 max-w-45">
              <div className="flex flex-col">
                <span className="font-medium text-slate-800 whitespace-nowrap">
                  {institution.phone}
                </span>
                <span className="font-medium text-slate-500 text-xs break-all">
                  {institution.email}
                </span>
              </div>
            </td>

            {/* TIPO */}
            <td className="px-4 py-4 whitespace-nowrap">
              <span
                className={`font-medium uppercase ${
                  institution.type === "Pública" ||
                  institution.type === "Publica"
                    ? "text-green-500"
                    : "text-orange-500"
                }`}
              >
                {institution.type}
              </span>
            </td>

            {/* RIF / DEA */}
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex flex-col">
                <span className="font-medium text-slate-800 text-sm font-mono">
                  {institution.type === "Pública" ||
                  institution.type === "Publica"
                    ? "G-200000090"
                    : institution.RIF}
                </span>
                <span className="font-medium text-slate-500 text-xs font-mono">
                  {institution.DEA_CODE}
                </span>
              </div>
            </td>

            {/* CDCEE */}
            <td className="px-4 py-4 max-w-30 whitespace-nowrap truncate">
              <span className="font-medium text-slate-800">
                {institution.cdcee?.name || "N/A"}
              </span>
            </td>
            {/* SuBdominio */}
            <td className="px-4 py-4 max-w-30 whitespace-nowrap truncate">
              <Link
                href={`https://${institution.subdomain}.${BASE_DOMAIN}`}
                target="_blank"
                className="font-mono text-slate-800 hover:underline"
              >
                {`${institution.subdomain}.${BASE_DOMAIN}`}
              </Link>
            </td>

            {/* ACCIONES */}
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Button
                  icon={faEdit}
                  classNameBtn="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-indigo-50 hover:text-indigo-600"
                  onClick={() => {
                    setEditingInstitution(institution);
                    setIsOpenEdit(true);
                  }}
                />
                <Button
                  icon={faTrash}
                  classNameBtn="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-red-50 hover:text-red-600"
                  onClick={() => {
                    deleteSchool(institution.SIG).then((data) => {
                      if (data?.ok) {
                        setInstitutions((prev) =>
                          prev.filter((item) => item.SIG !== institution.SIG),
                        );
                      }
                    });
                  }}
                />
              </div>
            </td>
          </tr>
        )}
        renderMovilCard={(institution) => (
          <div
            key={`card-${institution.SIG}`}
            className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Encabezado de la Card */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  SIG: {institution.SIG}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  {institution.school_name}
                </h3>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${institution.type === "Pública" ? "bg-green-50 text-green-600 dark:bg-green-950/30" : "bg-orange-50 text-orange-600 dark:bg-orange-950/30"}`}
              >
                {institution.type}
              </span>
            </div>

            {/* Detalles en filas */}
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <Icon icon={faBuilding} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    Razón Social
                  </span>
                  {institution.type === "Publica"
                    ? "MPPE"
                    : institution.company_name}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon icon={faLocationDot} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    Dirección
                  </span>
                  {institution.address}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon icon={faPhone} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    Contacto
                  </span>
                  <p>{institution.phone}</p>
                  <p className="text-xs text-slate-400">{institution.email}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-start gap-2 border-t border-slate-50 pt-2 dark:border-slate-800/50">
                  <Icon icon={faIdCard} className="mt-0.5 text-slate-400" />
                  <div>
                    <span className="font-medium block text-xs text-slate-400">
                      {institution.type === "Publica" ? "Código DEA" : "RIF"}
                    </span>
                    <span className="font-mono font-semibold">
                      {institution.DEA_CODE}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2 border-t border-slate-50 pt-2 dark:border-slate-800/50">
                  <Icon icon={faIdCard} className="mt-0.5 text-slate-400" />
                  <div>
                    <span className="font-medium block text-xs text-slate-400">
                      {"RIF"}
                    </span>
                    <span className="font-mono font-semibold">
                      {institution.type === "Publica"
                        ? "G-200000090"
                        : institution.RIF}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        data={filteredInstitutions}
      />

      <Modal
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        title="Editar Institución"
      >
        <FormInstitucion
          isEdit={true}
          institution={editingInstitution}
          onSuccess={() => setIsOpenEdit(false)}
        />
      </Modal>
    </div>
  );
}
