"use client";

import Button from "../atom/Button";
import Icon from "../atom/Icon";
import { createGrade } from "@/services/grades/createGrade";
import {
  faSearch,
  faUserPlus,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";

/**
 * Formulario de carga de notas enfocado en Selección de Actividad (SIGACE)
 */

const getAlumnoNombre = (al) => {
  if (al.nombre) return al.nombre;
  return [al.name, al.last_name].filter(Boolean).join(" ");
};

const getAlumnoId = (al) => String(al.id ?? al.tuition_number ?? "");

export default function FormCargaNotas({
  listaAlumnosSinNotas = [],
  activities = [], // Recibe las actividades del lapso activo
  onSave,
  onCancel,
}) {
  const [idEvaluation, setIdEvaluation] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [grade, setGrade] = useState("");

  // Obtener los datos de la actividad que está seleccionada actualmente
  const actividadSeleccionada = activities.find(
    (act) => Number(act.id) === idEvaluation,
  );

  // Filtrar alumnos por nombre o cédula
  const alumnosFiltrados = listaAlumnosSinNotas.filter((al) => {
    const nombre = getAlumnoNombre(al);
    const id = getAlumnoId(al);
    const q = busqueda.toLowerCase();
    return nombre.toLowerCase().includes(q) || id.includes(busqueda);
  });

  const handleSelectAlumno = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setBusqueda("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idEvaluation)
      return alert("Por favor, selecciona una actividad primero");
    if (!alumnoSeleccionado) return alert("Debes seleccionar un estudiante");
    if (grade === "") return alert("Debes ingresar una calificación");

    const formData = {
      id_student: alumnoSeleccionado.id,
      id_evaluation: idEvaluation,
      grade: grade,
    };

    const result = await createGrade(formData);

    if (result.success === false || result.error) {
      toast.error(result.message || result.error);
      return;
    }

    toast.success(result.message || "Calificación guardada");
    onSave?.();

    setAlumnoSeleccionado(null);
    setGrade("");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* 1. Selector de Actividad / Evaluación */}
      <div>
        <label className="mb-1 block text-sm font-bold text-slate-700">
          1. Selecciona la Evaluación a Calificar
        </label>
        <div className="relative">
          <select
            value={idEvaluation}
            onChange={(e) => {
              setIdEvaluation(e.target.value);
              // Si cambia de actividad, reiniciamos el alumno por seguridad
              setAlumnoSeleccionado(null);
              setGrade("");
            }}
            className="w-full rounded-xl border-2 border-slate-200 p-3 bg-white outline-none focus:border-indigo-500 font-medium text-slate-700 appearance-none"
            required
          >
            <option value="">
              -- Elige una actividad de la planificación --
            </option>
            {activities.map((act) => (
              <option key={act.id} value={act.id}>
                {act.referent_teorical} ({act.porcentage}%)
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            <Icon icon={faTasks} />
          </div>
        </div>
      </div>

      {/* El resto del formulario se desbloquea solo si ya eligió qué actividad evaluar */}
      <div
        className={`space-y-5 transition-all ${!idEvaluation ? "opacity-30 pointer-events-none" : "opacity-100"}`}
      >
        {/* 2. Buscador de Estudiantes */}
        {!alumnoSeleccionado ? (
          <div className="relative">
            <label className="mb-1 block text-sm font-bold text-slate-700">
              2. Buscar Estudiante (Nombre o Cédula)
            </label>
            <div className="relative">
              <Icon
                icon={faSearch}
                className="absolute top-3 left-3 text-slate-400"
              />
              <input
                type="text"
                disabled={!idEvaluation}
                className="w-full rounded-xl border-2 border-slate-200 py-2 pr-4 pl-10 outline-none focus:border-indigo-500"
                placeholder="Ej: Juan Pérez o Cédula"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            {/* Lista desplegable de resultados */}
            {busqueda.length > 0 && (
              <div className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
                {alumnosFiltrados.length > 0 ? (
                  alumnosFiltrados.map((al) => (
                    <div
                      key={al.id}
                      onClick={() => handleSelectAlumno(al)}
                      className="flex cursor-pointer justify-between border-b p-3 last:border-0 hover:bg-indigo-50"
                    >
                      <span className="font-medium text-slate-700">
                        {getAlumnoNombre(al)}
                      </span>
                      <span className="text-xs text-slate-400">
                        {getAlumnoId(al)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-sm text-slate-400">
                    No hay coincidencia de alumnos
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Card de Alumno Confirmado */
          <div className="animate-in slide-in-from-top-2 flex items-center justify-between rounded-xl bg-indigo-600 p-4 text-white shadow-lg">
            <div>
              <p className="text-xs font-bold uppercase opacity-80">
                Evaluando en:{" "}
                <span className="underline">{actividadSeleccionada?.name}</span>{" "}
                a:
              </p>
              <p className="text-lg font-bold">
                {getAlumnoNombre(alumnoSeleccionado)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAlumnoSeleccionado(null);
                setGrade("");
              }}
              className="rounded-md bg-indigo-400 px-2 py-1 text-xs transition-colors hover:bg-indigo-300"
            >
              Cambiar Alumno
            </button>
          </div>
        )}

        {/* 3. Input Único de Nota */}
        <div
          className={`max-w-xs mx-auto text-center transition-opacity ${!alumnoSeleccionado ? "opacity-30 pointer-events-none" : "opacity-100"}`}
        >
          <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">
            Calificación Definitiva (0 - 20)
          </label>
          <input
            type="number"
            max="20"
            min="0"
            step="0.1"
            disabled={!alumnoSeleccionado}
            className="w-full rounded-xl border-2 border-slate-200 p-3 text-center text-3xl font-extrabold outline-none focus:border-indigo-500 text-indigo-600 bg-slate-50"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="0.0"
            required
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          onClick={onCancel}
          classNameBtn="flex-1 p-3 bg-slate-100 text-slate-500 rounded-xl font-bold hover:bg-slate-200"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={!alumnoSeleccionado || grade === ""}
          classNameBtn={`flex-1 p-3 rounded-xl font-bold text-white shadow-lg transition-all ${
            alumnoSeleccionado && grade !== ""
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-slate-300 cursor-not-allowed"
          }`}
        >
          <Icon icon={faUserPlus} className="mr-2" /> Guardar Nota
        </Button>
      </div>
    </form>
  );
}
