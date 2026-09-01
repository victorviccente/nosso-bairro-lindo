import { useCallback, useRef, useState } from "react";

interface Props {
  antes: string;
  depois: string;
  legendaAntes?: string;
  legendaDepois?: string;
  resolvido?: boolean;
  alt: string;
}

/**
 * Comparador arrastável. A linha divisória é o elemento gráfico da marca:
 * verde quando o caso está resolvido, azul enquanto está em movimento.
 */
export function ComparadorAntesDepois({
  antes,
  depois,
  legendaAntes = "Antes",
  legendaDepois = "Depois",
  resolvido = true,
  alt,
}: Props) {
  const [posicao, setPosicao] = useState(50);
  const areaRef = useRef<HTMLDivElement>(null);

  const mover = useCallback((clienteX: number) => {
    const area = areaRef.current;
    if (!area) return;
    const caixa = area.getBoundingClientRect();
    const pct = ((clienteX - caixa.left) / caixa.width) * 100;
    setPosicao(Math.min(100, Math.max(0, pct)));
  }, []);

  const corLinha = resolvido ? "bg-verde" : "bg-azul";

  return (
    <div
      ref={areaRef}
      className="@container relative w-full touch-none overflow-hidden rounded-lg border border-borda bg-branco select-none"
      onPointerMove={(e) => {
        if (e.buttons === 1) mover(e.clientX);
      }}
      onPointerDown={(e) => mover(e.clientX)}
    >
      <img src={depois} alt={`${alt} — depois`} width={1024} height={768} className="block w-full" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${posicao}%` }}>
        <img
          src={antes}
          alt={`${alt} — antes`}
          width={1024}
          height={768}
          className="block w-[100cqw] max-w-none"
        />
      </div>

      <div
        className={`pointer-events-none absolute inset-y-0 ${corLinha}`}
        style={{ left: `calc(${posicao}% - 1px)`, width: 2 }}
      />

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(posicao)}
        onChange={(e) => setPosicao(Number(e.target.value))}
        aria-label="Arraste para comparar antes e depois"
        className="absolute inset-x-0 bottom-4 mx-auto w-[85%] cursor-ew-resize accent-azul"
      />

      <span className="absolute top-3 left-3 rounded-chip bg-azul-fundo px-3 py-1 text-13 font-semibold text-branco">
        {legendaAntes}
      </span>
      <span
        className={`absolute top-3 right-3 rounded-chip px-3 py-1 text-13 font-semibold text-branco ${resolvido ? "bg-verde" : "bg-azul"}`}
      >
        {legendaDepois}
      </span>
    </div>
  );
}
