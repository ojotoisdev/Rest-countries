"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;     
  back?: boolean;    
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  href,
  back,
  onClick,
  className = "",
}: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (back) {
      if (window.history.length > 1) router.back();
      else router.push("/");
      return;
    }

    if (href) {
      router.push(href);
      return;
    }

    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2 text-sm font-semibold bg-(--color-element) text-(--color-text) rounded-lg shadow-md p-6 ${className}`}
    >
      {children}
    </button>
  );
}
