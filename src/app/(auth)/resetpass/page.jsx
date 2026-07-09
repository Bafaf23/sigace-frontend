"use client";
import FormForgot from "@/components/organism/FormForgot";
import Loading from "@/app/loading";
import { useSearchParams } from "next/navigation";
import FormResetPassword from "@/components/organism/FormResetPassword";
import { useState, useEffect, Suspense } from "react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  // 1. Iniciamos en true para evitar el parpadeo visual del FormForgot mientras Next lee la URL
  const [loadingp, setLoadinp] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(2);
    } else {
      setStep(1);
    }
    setLoadinp(false);
  }, [searchParams]);

  if (loadingp) {
    return <Loading />;
  }

  return (
    <div className="flex w-full items-center justify-center">
      {step === 1 ? <FormForgot /> : <FormResetPassword />}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
