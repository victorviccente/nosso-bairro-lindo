import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variante = "primario" | "secundario" | "contorno" | "claro" | "texto";
type Tamanho = "md" | "lg";

const variantes: Record<Variante, string> = {
  primario: "bg-azul text-branco hover:bg-azul-fundo",
  secundario: "bg-azul-claro text-azul-fundo hover:bg-borda",
  contorno: "border border-borda bg-branco text-tinta hover:bg-azul-claro",
  claro: "bg-branco text-azul-fundo hover:bg-azul-claro",
  texto: "text-azul hover:underline underline-offset-4",
};

const tamanhos: Record<Tamanho, string> = {
  md: "h-10 px-4 text-15",
  lg: "h-12 px-6 text-17",
};

export interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  tamanho?: Tamanho;
}

export const Botao = forwardRef<HTMLButtonElement, BotaoProps>(function Botao(
  { variante = "primario", tamanho = "md", className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
        tamanhos[tamanho],
        variantes[variante],
        className,
      )}
      {...props}
    />
  );
});
