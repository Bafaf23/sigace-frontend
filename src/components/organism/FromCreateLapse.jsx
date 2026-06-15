import Button from "../atom/Button";
import Input from "../atom/Input";

export default function FormCreateLapse({
  formDataLapse,
  setFormDataLapse,
  onSubmit,
}) {
  // Función manejadora para actualizar el estado global del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataLapse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador del envío para evitar el comportamiento por defecto de la página
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          label="Nombre del Lapso/Momento"
          type="text"
          name="nameLapse"
          placeholder="Momento 1"
          value={formDataLapse.nameLapse}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Fecha de inicio"
          type="date"
          name="dateStard"
          value={formDataLapse.dateStard}
          onChange={handleChange}
          required
        />
        <Input
          label="Fecha de cierre"
          type="date"
          name="dateEnd"
          value={formDataLapse.dateEnd}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          classNameBtn="bg-indigo-500 rounded-xl p-3 text-white font-bold cursor-pointer hover:bg-indigo-600 transition-colors"
          type="submit"
        >
          Iniciar Lapso/Momento
        </Button>
      </div>
    </form>
  );
}
