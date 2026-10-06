"use client";
import Button from "../atom/Button";
import Input from "../atom/Input";

export default function FromConsult({
  onSubmit,
  tuitionNumber,
  setTuitionNumber,
}) {
  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
      <Input
        label="Número de Matrícula"
        placeholder="Ingresa tu número de matrícula"
        value={tuitionNumber}
        onChange={(e) => setTuitionNumber(e.target.value)}
      />
      <Button
        type="submit"
        className="w-full mt-2 bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 text-white py-4 rounded-2xl font-bold transition-all flex justify-center items-center gap-2 shadow-md dark:shadow-none cursor-pointer"
      >
        Consultar
      </Button>
    </form>
  );
}
