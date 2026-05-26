"use client";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Button from "@/components/atom/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import QuickActions from "@/components/molecules/QuickActions";
import TableInsti from "@/components/molecules/TableInsti";
import Modal from "@/components/organism/Modal";
import { deleteSchool } from "@/services/deleteSchool";
import { useState, useEffect } from "react";
import { getSchools } from "@/services/getSchool";
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
  const [instituciones, setInstituciones] = useState([]);
  const [editingInstitucion, setEditingInstitucion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  useEffect(() => {
    getSchools().then((data) => setInstituciones(data));
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
        handleDeleteSchool={(SIG) =>
          deleteSchool(SIG).then((data) => {
            if (data.ok) {
              setInstituciones(
                instituciones.filter((institucion) => institucion.SIG !== SIG),
              );
            }
          })
        }
        handleEditSchool={(institucion) => {
          setIsOpenEdit(true);
          setEditingInstitucion(institucion);
        }}
        data={instituciones}
      />

      <Modal
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        title="Editar Institución"
      >
        <FormInstitucion
          isEdit={true}
          institucion={editingInstitucion}
          onSuccess={() => setIsOpenEdit(false)}
        />
      </Modal>
    </div>
  );
}
