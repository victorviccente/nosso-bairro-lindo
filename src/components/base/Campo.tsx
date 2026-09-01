import { forwardRef, useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const baseCampo =
  "w-full rounded-md border border-borda bg-branco px-3 py-2 text-[15px] text-tinta placeholder:text-cinza transition-colors focus:border-azul";

export interface CampoProps extends InputHTMLAttributes<HTMLInputElement> {
  rotulo: string;
  ajuda?: string;
  erro?: string;
}

export const Campo = forwardRef<HTMLInputElement, CampoProps>(function Campo(
  { rotulo, ajuda, erro, className, id, ...props },
  ref,
) {
  const gerado = useId();
  const campoId = id ?? gerado;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={campoId} className="text-[13px] font-semibold text-tinta">
        {rotulo}
      </label>
      <input
        ref={ref}
        id={campoId}
        aria-describedby={ajuda || erro ? `${campoId}-ajuda` : undefined}
        className={cn(baseCampo, className)}
        {...props}
      />
      {(ajuda || erro) && (
        <p id={`${campoId}-ajuda`} className={cn("text-[13px]", erro ? "text-azul-fundo" : "text-cinza")}>
          {erro ?? ajuda}
        </p>
      )}
    </div>
  );
});

export interface AreaTextoProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rotulo: string;
  ajuda?: string;
}

export const AreaTexto = forwardRef<HTMLTextAreaElement, AreaTextoProps>(function AreaTexto(
  { rotulo, ajuda, className, id, ...props },
  ref,
) {
  const gerado = useId();
  const campoId = id ?? gerado;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={campoId} className="text-[13px] font-semibold text-tinta">
        {rotulo}
      </label>
      <textarea ref={ref} id={campoId} className={cn(baseCampo, "min-h-24", className)} {...props} />
      {ajuda && <p className="text-[13px] text-cinza">{ajuda}</p>}
    </div>
  );
});
