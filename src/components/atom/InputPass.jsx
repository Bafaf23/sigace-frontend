"use client";
import Button from "./Button";
import Input from "./Input";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

/**
 * Input adaptado para prosesar pass del usurio haciendo la comparacion de iguales
 * para indicarle al usuario si escribio la pas incoretamente
 *
 * @componet
 * @param {Object} props
 * @param {string} props.label - Titulo del input (ej: Ingresa tu contrasena)
 * @param {string} props.placeholder - text de ayudo para el usuria (ej: *******)
 * @param {string} props.name
 * @param {event} props.onChange
 * @param {string} props.value
 * @returns {JSX.Element}
 */

export default function InputPass({
  label,
  placeholder,
  name,
  onChange,
  value,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative flex w-full flex-col gap-2">
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        type={showPassword ? "text" : "password"}
        name={name}
        onChange={onChange}
      />

      <Button
        onClick={() => {
          setShowPassword(!showPassword);
        }}
        classNameBtn="absolute right-2 top-8 text-slate-400 hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400 transition-colors"
        icon={showPassword ? faEyeSlash : faEye}
        type={"button"}
      />
    </div>
  );
}
