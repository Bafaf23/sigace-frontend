"use client";
import Banner from "@/components/atom/Banner";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import Input from "@/components/atom/Input";
import TableInsti from "@/components/molecules/TableInsti";
import Modal from "@/components/organism/Modal";
import { getServices } from "@/services/services/getServices";
import { updatePrice } from "@/services/services/updatePrice";
import {
  faIdCardClip,
  faEllipsis,
  faDollar,
  faStar,
  faTrash,
  faEdit,
  faArrowRight,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ServiciosPage() {
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [newPrice, setNewPrice] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const oldPrice = Number(service?.price || 0);
  const difference = newPrice - oldPrice;

  useEffect(() => {
    setLoading(true);
    getServices().then((data) => setServices(data));
    setLoading(false);
  }, []);

  const fechService = () => {
    getServices().then((data) => {
      if (data) {
        setServices(data);
      }
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e?.preventDefault?.();
    try {
      if (!newPrice) return;
      const res = await updatePrice({ id: service.id, price: newPrice });

      if (res.success == false) {
        return toast.error(res.message);
      }

      fechService();
      setOpenEdit(false);
      return toast.success(res.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-5">
      <h2 className="text-3xl dark:text-zinc-200 font-extrabold">Servicios</h2>
      <Banner
        titel="Servicios disponibles"
        icon={faStar}
        message="En estas seccion apareceran todos los servicios que ofresemos y opciones para modificar los mismos."
      />
      <TableInsti
        loading={loading}
        data={services}
        titelTable={[
          { name: "Id", icon: faKey },
          { name: "Nombre", icon: faIdCardClip },
          { name: "Tipo", icon: faFile },
          { name: "Descripcion", icon: faFile },
          { name: "Precio", icon: faDollar },
          { name: "Acciones", icon: faEllipsis },
        ]}
        renderTableRows={(service, index) => (
          <tr
            key={index}
            className="transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-700/50 group"
          >
            <td className="px-6 py-4">
              <div className="flex flex-col group-hover:text-cyan-500  dark:group-hover:text-orange-500 transition-colors dark:text-zinc-300">
                <span className="font-medium">{service.id}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col transition-colors dark:text-zinc-300">
                <span className="font-medium">{service.name}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col text-sm transition-colors text-slate-500 dark:text-zinc-300">
                <span className="font-medium">{service.type}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col text-sm transition-colors text-slate-500 dark:text-zinc-300">
                <span className="font-medium">{service.description}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col dark:group-hover:text-orange-500 group-hover:text-cyan-500 transition-colors dark:text-zinc-300">
                <span className="font-medium">
                  ${Number(service.price).toFixed(2)}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-3 transition-colors text-slate-400 dark:text-zinc-300">
                <Button
                  classNameBtn="cursor-pointer hover:text-red-500"
                  icon={faTrash}
                ></Button>
                <Button
                  classNameBtn="cursor-pointer hover:text-cyan-500"
                  icon={faEdit}
                  onClick={() => {
                    setOpenEdit(true);
                    setService(service);
                  }}
                ></Button>
              </div>
            </td>
          </tr>
        )}
      />
      <Modal
        isOpen={openEdit}
        onClose={() => setOpenEdit(!openEdit)}
        titel="Actualiza el precio del Servicio"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl space-y-2 border border-slate-200/80 dark:border-slate-800 mb-4">
            {/* Precio Anterior */}
            <div className="flex-1">
              <Input
                label="Precio anterior"
                type="number"
                value={service?.price}
                readOnly
              />
            </div>

            {/* Indicador de Transición / Ícono */}
            <div className="flex items-center justify-center pt-5">
              <div className="p-2 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                <Icon icon={faArrowRight} className="w-4 h-4" />
              </div>
            </div>

            {/* Nuevo Precio */}
            <div className="flex-1">
              <Input
                label="Nuevo precio"
                type="number"
                placeholder="0.00"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
          </div>

          {newPrice && (
            <section className="mt-4 mb-4 p-3 rounded-lg border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {difference > 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    El incremento del precio es de:{" "}
                    <strong>+${difference.toFixed(2)}</strong>
                  </span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400">
                    El descuento/reducción del precio es de:{" "}
                    <strong>-${Math.abs(difference).toFixed(2)}</strong>
                  </span>
                )}
              </p>
            </section>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              classNameBtn="bg-orange-500 px-4 py-2 rounded-md text-white font-bold"
            >
              Editar
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
