"use client";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Button from "@/components/atom/Button";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import TableInsti from "@/components/molecules/TableInsti";
import Modal from "@/components/organism/Modal";
import { deleteSchool } from "@/services/school/deleteSchool";
import { useState, useEffect } from "react";
import { getSchools } from "@/services/school/getSchool";
import Icon from "@/components/atom/Icon";
import FormInstitucion from "@/components/organism/FormInstitucion";
import {
  faCode,
  faInstitution,
  faLocationDot,
  faPhone,
  faInfoCircle,
  faIdCard,
  faTag,
  faBuilding,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

export default function InstitucionesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [editingInstitution, setEditingInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  useEffect(() => {
    getSchools().then((data) => setInstitutions(data.data));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:p-3 lg:justify-between">
        <HeaderDashbord titelPage={"Instituciones"} />
        <div className="p-3">
          <Button
            onClick={() => setIsOpen(true)}
            icon={faPlus}
            classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
          >
            Crear Institucion
          </Button>
          <Modal
            title="Agregar nueva institución"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <FormInstitucion />
          </Modal>
        </div>
      </div>

      <div className="p-4">
        <div className="border border-amber-200 bg-amber-50 p-4 rounded-xl flex items-center gap-2">
          <Icon icon={faInfoCircle} className="text-amber-600 text-xl" />
          <p className="text-sm text-amber-600 leading-relaxed">
            Las instituciones de tipo <span className="font-bold">pública</span>{" "}
            tienen como razón social el nombre del{" "}
            <span className="font-bold text-amber-800">
              Ministerio del Poder Popular para la Educación
            </span>{" "}
            y el RIF del mismo.
          </p>
        </div>
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
          { name: "Acciones", icon: faEllipsis },
        ]}
        renderTableRows={(institution) => (
          <tr
            key={institution.SIG}
            className="transition-colors hover:bg-slate-50/50 group"
          >
            <td className="px-6 py-4">
              <div className="flex flex-col group-hover:text-cyan-600 transition-colors">
                <span className="font-medium">{institution.SIG}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <span className="font-medium text-slate-800">
                  {institution.name}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <span className="font-medium text-slate-800">
                  {institution.type === "Pública"
                    ? "---"
                    : institution.company_name}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <span className="font-medium text-slate-800">
                  {institution.address}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <span className="font-medium text-slate-800">
                  {institution.phone}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <span
                  className={`font-medium uppercase ${institution.type === "Pública" ? "text-green-500" : "text-orange-500"}`}
                >
                  {institution.type}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <span className="font-medium text-slate-800">
                  {institution.type === "Pública"
                    ? institution.DEA_CODE
                    : institution.RIF}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Button
                  icon={faEdit}
                  classNameBtn="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-indigo-50 hover:text-indigo-600"
                  onClick={() => {
                    setIsOpenEdit(true);
                    setEditingInstitution(institution).then((data) => {
                      if (data.ok) {
                        setIsOpenEdit(true);
                        setEditingInstitution(institution);
                      }
                    });
                  }}
                />
                <Button
                  icon={faTrash}
                  classNameBtn="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-red-50 hover:text-red-600"
                  onClick={() => {
                    deleteSchool(institution.SIG).then((data) => {
                      if (data.ok) {
                        setInstitutions(
                          institutions.filter(
                            (institution) =>
                              institution.SIG !== institution.SIG,
                          ),
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
                  {institution.name}
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
                  {institution.company_name}
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

              <div className="flex items-start gap-2 border-t border-slate-50 pt-2 dark:border-slate-800/50">
                <Icon icon={faIdCard} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    {institution.type === "Pública" ? "Código DEA" : "RIF"}
                  </span>
                  <span className="font-mono font-semibold">
                    {institution.type === "Pública"
                      ? institution.DEA_CODE
                      : institution.RIF}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        data={institutions}
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
