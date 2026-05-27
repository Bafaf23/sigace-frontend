import Icon from "../atom/Icon";
import Selector from "../atom/Selector";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { getSchools } from "@/services/school/getSchool";
import { useState, useEffect } from "react";

export default function DataSchoolRegister({ data, manejoCambio }) {
  const [schools, setSchools] = useState([]);
  useEffect(() => {
    getSchools().then((data) => {
      setSchools(data);
    });
  }, []);
  return (
    <div className="animate-fade-in space-y-4">
      <hr className="border border-slate-100" />
      <div className="flex flex-col gap-4">
        <Selector
          label={"Elija una institucion"}
          options={schools.map((school) => ({
            label: school.name,
            value: school.SIG,
          }))}
          name={"SIG"}
          onChange={manejoCambio}
          value={data.SIG}
        />
      </div>
    </div>
  );
}
