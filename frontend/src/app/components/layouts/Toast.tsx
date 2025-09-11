"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface ToastProps {
  id: number;
  context: string;
  type?: "success" | "error";
  isActive: boolean;
}

const Toast = ({ context, type, id, isActive }: ToastProps) => {
  const [show, setShow] = useState<boolean>(false);
  
  useEffect(() => {
    if(isActive){
      const timeout = setTimeout(() => setShow(true), 0);
      return () => clearTimeout(timeout);
    } else {
      setShow(false);
    }
  },[isActive])

  return (
    <div
      id={`toast-${id}`}
      className={clsx(
        "px-12 py-4 fixed bottom-36 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 text-xl text-text-invert font-bold rounded-2xl shadow-2xl glow",
        show
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0",
        type === "error"
          ? "bg-alert shadow-alert-shadow"
          : "bg-primary shadow-primary-shadow"
      )}
    >
      {context}
    </div>
  );
};

export default Toast;