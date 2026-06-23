import React, { useState } from "react";

// =========================================================================
// MOCK DATA EXPANDIDO (Incluye el array 'evaluations' para cada lapso)
// =========================================================================
const mockAcademicRecords = [
  {
    school_year: "Año Escolar 2025 - 2026",
    year_level: "4to Año de Bachillerato",
    section: "A",
    subjects: [
      {
        subject_name: "Matemáticas",
        final_grade: 16,
        lapses: [
          {
            number: 1,
            grade: 14,
            evaluations: [
              { name: "Examen I: Funciones", grade: 12, percentage: 30 },
              { name: "Taller Grupal: Matrices", grade: 16, percentage: 35 },
              {
                name: "Defensa de Cuaderno y Participación",
                grade: 14,
                percentage: 35,
              },
            ],
          },
          {
            number: 2,
            grade: 18,
            evaluations: [
              { name: "Prueba Corta: Ecuaciones", grade: 20, percentage: 25 },
              { name: "Examen II: Trigonometría", grade: 18, percentage: 50 },
              { name: "Trabajo Práctico", grade: 16, percentage: 25 },
            ],
          },
          {
            number: 3,
            grade: 15,
            evaluations: [
              {
                name: "Proyecto Final de Geometría",
                grade: 15,
                percentage: 60,
              },
              { name: "Evaluación Continua", grade: 15, percentage: 40 },
            ],
          },
        ],
      },
      {
        subject_name: "Física",
        final_grade: 8,
        lapses: [
          {
            number: 1,
            grade: 8,
            evaluations: [
              {
                name: "Examen I: Movimiento Variado",
                grade: 6,
                percentage: 40,
              },
              { name: "Informe de Laboratorio 1", grade: 10, percentage: 30 },
              { name: "Prueba Escrita", grade: 9, percentage: 30 },
            ],
          },
          {
            number: 2,
            grade: 7,
            evaluations: [
              { name: "Examen II: Dinámica", grade: 5, percentage: 50 },
              { name: "Informe de Laboratorio 2", grade: 12, percentage: 30 },
              { name: "Talleres en clase", grade: 6, percentage: 20 },
            ],
          },
          {
            number: 3,
            grade: 9,
            evaluations: [
              { name: "Prueba Escrita Final", grade: 9, percentage: 70 },
              { name: "Apreciación Docente", grade: 10, percentage: 30 },
            ],
          },
        ],
      },
    ],
  },
];

export default function RecordAcademico() {
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  // Estado para controlar qué lapso está abierto en qué materia.
  // Ejemplo de clave: "Matemáticas-1" (Materia-Lapso)
  const [openLapso, setOpenLapso] = useState(null);

  const period = mockAcademicRecords[selectedPeriod];

  const toggleLapso = (materiaName, lapIndex) => {
    const key = `${materiaName}-${lapIndex}`;
    setOpenLapso(openLapso === key ? null : key);
  };

  return (
    <div className="w-full space-y-6 dark:bg-slate-950">
      {/* Selector de Período */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Récord Académico de Evaluaciones
          </h2>
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
            {period.year_level} — Sección &quot;{period.section}&quot;
          </p>
        </div>
        <select
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(Number(e.target.value))}
        >
          {mockAcademicRecords.map((rec, index) => (
            <option key={index} value={index}>
              {rec.school_year}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de Materias */}
      <div className="grid grid-cols-1 gap-6">
        {period.subjects.map((subject, idx) => {
          const isAplazado = subject.final_grade < 10;

          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              {/* Header Materia */}
              <div className="bg-slate-50/70 dark:bg-slate-800/40 px-6 py-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${isAplazado ? "bg-red-500 animate-pulse" : "bg-indigo-500"}`}
                  />
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-base">
                    {subject.subject_name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Definitiva
                  </span>
                  <span
                    className={`text-base font-bold px-3 py-1 rounded-xl border ${
                      isAplazado
                        ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30"
                        : "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30"
                    }`}
                  >
                    {String(subject.final_grade).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Grid de los 3 Lapsos */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-400 font-medium mb-1">
                  Presiona un lapso para expandir el detalle de tareas y
                  exámenes:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subject.lapses.map((lapso, lapIdx) => {
                    const isLapAplazado = lapso.grade < 10;
                    const isCurrentOpen =
                      openLapso === `${subject.subject_name}-${lapIdx}`;

                    return (
                      <div
                        key={lapIdx}
                        className="flex flex-col border border-slate-100 dark:border-slate-800/60 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 overflow-hidden"
                      >
                        {/* Botón Encabezado de Lapso */}
                        <button
                          onClick={() =>
                            toggleLapso(subject.subject_name, lapIdx)
                          }
                          className={`w-full text-left p-4 flex justify-between items-center transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/50 ${isCurrentOpen ? "bg-indigo-50/40 dark:bg-indigo-950/20" : ""}`}
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                              Lapso {lapso.number}
                            </span>
                            <span
                              className={`text-sm font-bold ${isLapAplazado ? "text-red-500" : "text-slate-700 dark:text-slate-300"}`}
                            >
                              {String(lapso.grade).padStart(2, "0")} pts
                            </span>
                          </div>
                          <span className="text-slate-400 font-medium transition-transform text-xs">
                            {isCurrentOpen ? "▲ Ocultar" : "▼ Ver Notas"}
                          </span>
                        </button>

                        {/* Contenido Desplegable (Actividades del Lapso) */}
                        {isCurrentOpen && (
                          <div className="bg-white dark:bg-slate-900/60 p-4 border-t border-slate-100 dark:border-slate-800 space-y-3 flex-1">
                            {lapso.evaluations.map((evalu, evalIdx) => (
                              <div
                                key={evalIdx}
                                className="flex justify-between items-start text-xs border-b border-slate-50 dark:border-slate-800/40 pb-2 last:border-none last:pb-0"
                              >
                                <div className="space-y-0.5 max-w-[75%]">
                                  <p className="font-medium text-slate-700 dark:text-slate-300 wrap-break-word">
                                    {evalu.name}
                                  </p>
                                  <p className="text-slate-400 font-normal">
                                    Valor: {evalu.percentage}%
                                  </p>
                                </div>
                                <span
                                  className={`font-semibold shrink-0 px-1.5 py-0.5 rounded ${evalu.grade < 10 ? "text-red-500 bg-red-50 dark:bg-red-950/20" : "text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"}`}
                                >
                                  {String(evalu.grade).padStart(2, "0")} pts
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
