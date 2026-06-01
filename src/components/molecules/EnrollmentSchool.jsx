import { getSchools } from "../../services/school/getSchool";
import { getSection } from "../../services/section/getSection";
import Icon from "../atom/Icon";
import Selector from "../atom/Selector";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const yearOptions = [
  { value: "1", label: "1er Año" },
  { value: "2", label: "2do Año" },
  { value: "3", label: "3er Año" },
  { value: "4", label: "4to Año" },
  { value: "5", label: "5to Año" },
];

function normalizeSection(section) {
  if (Array.isArray(section)) {
    return {
      id: section[0],
      name: section[1],
      code_section: section[2],
    };
  }
  return section;
}

export default function EnrolelmentSchool({ data, manejarCambio }) {
  const [schools, setSchools] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const schoolsData = await getSchools();
        setSchools(schoolsData);
      } catch (error) {
        console.error("Error al obtener las instituciones:", error);
      }
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    if (!data.sig) {
      setSections([]);
      return;
    }

    getSection(data.SIG)
      .then((rawSections) =>
        setSections((rawSections || []).map(normalizeSection)),
      )
      .catch((error) => {
        console.error("Error al obtener las secciones:", error);
        setSections([]);
      });
  }, [data.SIG]);

  return (
    <div className="animate-fade-in space-y-4">
      <hr className="border border-slate-100" />
      <div className="mb-4 flex items-center gap-4 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
        <Icon icon={faHandPointer} className="text-2xl text-indigo-600" />
        <p className="text-sm font-semibold text-indigo-600">
          Selecciona el año y la sección en la cual vas a inscribir al
          estudiante.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Selector
            label="Año a cursar"
            name="year"
            value={data.year}
            options={yearOptions}
            onChange={manejarCambio}
            id="year"
          />
          <Selector
            label="Sección"
            name="section"
            value={data.section}
            options={sections.map((section) => ({
              value: String(section.id),
              label: `${section.name} (${section.code_section})`,
            }))}
            onChange={manejarCambio}
            id="section"
            disabled={!data.sig || sections.length === 0}
          />
        </div>
      </div>
    </div>
  );
}
