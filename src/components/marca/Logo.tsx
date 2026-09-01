import { MARCA } from "@/lib/brand";

type Tom = "azul" | "branco";

/**
 * Logo da Quadra: a palavra em peso 800 com um pin de mapa
 * cujo miolo é um quadrado sólido, não um círculo.
 */
export function Logo({ tom = "azul", className = "" }: { tom?: Tom; className?: string }) {
  const cor = tom === "branco" ? "text-branco" : "text-azul";
  return (
    <span className={`inline-flex items-center gap-2 ${cor} ${className}`}>
      <PinQuadrado />
      <span className="text-21 font-extrabold tracking-[-0.02em]">{MARCA}</span>
    </span>
  );
}

export function PinQuadrado({ tamanho = 24 }: { tamanho?: number }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2c-4.14 0-7.5 3.28-7.5 7.33C4.5 14.9 12 22 12 22s7.5-7.1 7.5-12.67C19.5 5.28 16.14 2 12 2Z"
        fill="currentColor"
      />
      <rect x="9" y="6.5" width="6" height="6" rx="1" fill="var(--branco)" />
    </svg>
  );
}
