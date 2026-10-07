"use client";
import Banner from "@/components/atom/Banner";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import ToggleSimple from "@/components/atom/ToggleSimple";
import Search from "@/components/molecules/Serch";
import TableInsti from "@/components/molecules/TableInsti";
import FormInstitucion from "@/components/organism/FormInstitucion";
import Modal from "@/components/organism/Modal";
import { getCDDE } from "@/services/school/getCDDE";
import { getSchools } from "@/services/school/getSchool";
import { getSchoolBySIG } from "@/services/school/getSchoolBySIG";
import { updateSchool } from "@/services/school/updateSchool";
import { getUsers } from "@/services/user/getUsers";
import {
  faPlus,
  faInfo,
  faCheckCircle,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCode,
  faInstitution,
  faLocationDot,
  faNetworkWired,
  faPhone,
  faIdCard,
  faTag,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function InstitucionesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [editingInstitution, setEditingInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [cdee, setCdde] = useState(null);
  const [directives, setDirectives] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [schoolsRes, cddeRes] = await Promise.all([
          getSchools(),
          getCDDE(),
        ]);

        setInstitutions(schoolsRes.data);
        setCdde(cddeRes.data);
      } catch (error) {
        console.error("Error al cargar datos del panel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchSchool = () => {
    getSchools().then((data) => {
      if (data.data) {
        setInstitutions(data.data);
      }
    });
  };

  useEffect(() => {
    if (search.trim() === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAppliedFilter("");
    }
  }, [search]);

  const handleStatus = async (editingInstitution) => {
    const updatedStatus = !editingInstitution.is_active;

    const updatedInstitution = {
      ...editingInstitution,
      is_active: updatedStatus,
    };

    await updateSchool(updatedInstitution).then((data) => {
      if (data && data.success == true) {
        fetchSchool();
      }
    });
  };

  const handleSearch = () => {
    setAppliedFilter(search);
  };

  const handleEdit = async (institution) => {
    if (!institution.SIG) return;
    const res = await getSchoolBySIG(institution.SIG);
    const detalis = res.school ?? res;

    setEditingInstitution(detalis);
    setIsOpenEdit(true);
  };

  const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;

  return (
    <div className="space-y-5">
      <Modal
        maxWidth="max-w-8xl"
        title="Agregar nueva institución"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <FormInstitucion
          isEdit={false}
          cdde={cdee}
          onSuccess={() => {
            setIsOpen(false);
            fetchSchool();
          }}
        />
      </Modal>

      <h2 className="text-3xl dark:text-zinc-200 font-extrabold">
        Instituciones
      </h2>

      <Banner
        icon={faInfo}
        titel="Más información"
        message="Aquí puedes gestionar todas las instituciones registradas en el sistema. Puedes crear nuevas instituciones, editar la información existente y activar o desactivar su estado según sea necesario. Utiliza la barra de búsqueda para filtrar por SIG, nombre o subdominio de la institución. Para ampliar la información de una institución, haz clic en su SIG para acceder a su perfil detallado."
      />

      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <Search
          placeholder="Código SIG o nombre..."
          setSearch={setSearch}
          onSearch={handleSearch}
          search={search}
        />

        <Button
          onClick={() => setIsOpen(true)}
          icon={faPlus}
          classNameBtn="bg-[#ED781F] hover:bg-orange-500 active:scale-95 transition-all p-3 rounded-xl text-slate-50 font-bold cursor-pointer flex items-center justify-center gap-2 w-full md:w-auto whitespace-nowrap shadow-lg shadow-[#ED781F]/20"
        >
          Crear Institución
        </Button>
      </div>

      <TableInsti
        data={institutions}
        loading={loading}
        titelTable={[
          { name: "SIG", icon: faCode },
          { name: "Institucion", icon: faInstitution },
          { name: "Tipo", icon: faTag },
          { name: "Subdominio", icon: faNetworkWired },
          { name: "Estatus", icon: faCheckCircle },
          { icon: faGear },
        ]}
        renderTableRows={(institution) => {
          return (
            <tr
              key={institution.SIG}
              className="transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-700/40 group"
            >
              {/* SIG Y DIRECTOR */}
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex flex-col group-hover:text-cyan-600 transition-colors dark:text-zinc-200">
                  <Button
                    classNameBtn="text-left p-0 hover:underline cursor-pointer"
                    onClick={() => {
                      handleEdit(institution);
                    }}
                  >
                    <span className="font-medium">{institution.SIG}</span>
                  </Button>
                </div>
              </td>

              {/* NOMBRE DE LA INSTITUCIÓN */}
              <td className="px-4 py-4 max-w-50">
                <span
                  className="font-medium text-slate-800 line-clamp-2 dark:text-zinc-200"
                  titel={institution.name}
                >
                  {institution.name}
                </span>
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

              {/* SuBdominio */}
              <td className="px-4 py-4 max-w-30 whitespace-nowrap truncate">
                <Link
                  href={`https://${institution.subdomain}.${BASE_DOMAIN}`}
                  target="_blank"
                  className="font-mono text-slate-800 hover:underline dark:text-zinc-200"
                >
                  {`${institution.subdomain}`}
                </Link>
              </td>

              {/* ESTATUS */}
              <td className="px-4 py-4 whitespace-nowrap">
                <div>
                  <span
                    className={`inline-flex items-center max-w-40 px-2 py-0.5 rounded-full text-xs font-semibold ${institution.is_active ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800/60" : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/60"} `}
                    titel={
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

              {/* ACCIONES */}
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <ToggleSimple
                    value={institution.is_active}
                    onChange={() => handleStatus(institution)}
                  />
                </div>
              </td>
            </tr>
          );
        }}
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
      />

      <Modal
        maxWidth="max-w-8xl"
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        title={`Edita la informacion de ${editingInstitution?.name}`}
      >
        <FormInstitucion
          isEdit={true}
          institution={editingInstitution}
          onSuccess={() => setIsOpenEdit(false)}
          directives={directives}
        />
      </Modal>
    </div>
  );
}
