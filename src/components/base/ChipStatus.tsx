import { cn } from "@/lib/utils";

export type Status =
  | "aberto"
  | "com_candidato"
  | "autorizado"
  | "em_andamento"
  | "resolvido"
  | "encaminhado";

export const rotuloStatus: Record<Status, string> = {
  aberto: "Aberto",
  com_candidato: "Com candidato",
  autorizado: "Autorizado",
  em_andamento: "Em andamento",
  resolvido: "Resolvido",
  encaminhado: "Encaminhado à prefeitura",
};

const estilos: Record<Status, string> = {
  aberto: "bg-azul text-branco",
  com_candidato: "bg-azul-claro text-azul-fundo",
  autorizado: "bg-azul-fundo text-branco",
  em_andamento: "bg-azul text-branco border-2 borda-viva",
  resolvido: "bg-verde text-branco",
  encaminhado: "bg-cinza text-branco",
};

/** Estado nunca é comunicado só por cor: o chip sempre carrega texto. */
export function ChipStatus({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-chip px-3 py-1 text-[13px] font-semibold",
        estilos[status],
        className,
      )}
    >
      {rotuloStatus[status]}
    </span>
  );
}
