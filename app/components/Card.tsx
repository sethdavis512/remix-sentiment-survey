import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="rounded-xl border border-zinc-500 p-4">{children}</div>
  );
}
