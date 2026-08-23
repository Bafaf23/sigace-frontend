import Selector from "../atom/Selector";
import { getSchools, getRoles } from "@/services/school/getSchool";
import { useState, useEffect } from "react";

export default function DataSchoolRegister({ data, manejoCambio }) {
  const [schools, setSchools] = useState([]);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    getSchools().then((data) => {
      setSchools(data.data);
      getRoles().then((data) => {
        setRoles(data.data);
      });
    });
  }, []);

  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex flex-col gap-4">
        <Selector
          label={"Elija una institucion"}
          options={schools.map((school) => ({
            label: school.school_name,
            value: school.SIG,
          }))}
          name={"SIG"}
          onChange={manejoCambio}
          value={data.SIG}
        />
      </div>
      <div>
        <Selector
          label={"Cargo del nuevo usuario"}
          options={
            roles?.map((role) => ({
              label: role.name,
              value: role.id,
            })) || []
          }
          name={"role_id"}
          onChange={manejoCambio}
          value={data.role_id}
        />
      </div>
    </div>
  );
}
