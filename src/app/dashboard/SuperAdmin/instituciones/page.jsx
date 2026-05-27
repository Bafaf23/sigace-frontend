"use client";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Button from "@/components/atom/Button";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import QuickActions from "@/components/molecules/QuickActions";
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
    getSchools().then((data) => setInstitutions(data));
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

      <QuickActions />

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
