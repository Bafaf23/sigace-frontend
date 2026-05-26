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
} from "@fortawesome/free-solid-svg-icons";

export default function UsuariosPage() {
  return (
    <div className="">
      <HeaderDashbord titelPage={"Gestion de Usuarios"} />
      <QuickActions />
      <div className="p-3">
        <div className="border border-cyan-200 bg-cyan-50 p-4 rounded-xl flex items-center gap-2">
          <Icon icon={faInfoCircle} className="text-cyan-600 text-xl" />
          <p className="text-sm text-cyan-600 leading-relaxed">
            Al crear un nuevo usuario sus credenciales de inicio de session se
            enviaran por correo{" "}
            <span className="font-bold text-cyan-800">electrónico</span> de
            forma automática.
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
      />
    </div>
  );
}
