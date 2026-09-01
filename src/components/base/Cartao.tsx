import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Cartão de lista: borda de 1px, raio 12px, sem sombra. */
export function Cartao({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg border border-borda bg-branco p-4", className)}
      {...props}
    />
  );
}
