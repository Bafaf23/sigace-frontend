import Input from "@/components/atom/Input";
import { useRef } from "react";

export default function FormVerify({ onVerify, loanding, otp, setOtp }) {
  const inputRef = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRef.current[index + 1]?.focus();
    }

    const codeComplet = newOtp.join("");
    if (codeComplet.length === 6) {
      onVerify(codeComplet);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full">
      <div className="flex gap-3 w-full">
        {otp.map((digito, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digito}
            ref={(el) => {
              inputRef.current[index] = el;
            }}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={loanding}
            className="text-center font-bold text-xl"
          />
        ))}
      </div>
    </form>
  );
}
