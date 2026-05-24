import Icon from "../atom/Icon";
import Input from "../atom/Input";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Terms from "@/components/atom/Terms";

export default function DataSchoolRegister({ data, manejoCambio }) {
  return (
    <div className="animate-fade-in space-y-4">
      <hr className="border border-slate-100" />
      <div className="flex flex-col gap-4">
        <Input
          label={"Código SIG del Plantel"}
          type={"text"}
          placeholder={"Ej: SIG0866"}
          name={"sig"}
          value={data.sig}
          onChange={manejoCambio}
        />

        <div className="flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="mt-1">
            <Icon icon={faLock} className="text-xl text-amber-600" />
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            El <span className="font-bold text-indigo-600">Código SIG</span> es
            la clave única de tu liceo en la plataforma. Es obligatorio para
            completar tu registro. Si lo desconoces, solicítalo en el
            departamento de
            <span className="font-semibold"> Controle de Estudios</span> de tu
            institución.
          </p>
        </div>
      </div>
      <Terms
        onChange={(e) =>
          manejoCambio({
            target: { name: "accepted", value: e.target.checked },
          })
        }
        accepted={data.accepted}
      />
    </div>
  );
}
