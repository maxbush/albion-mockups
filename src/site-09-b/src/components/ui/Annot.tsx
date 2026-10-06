/** Hand-drawn pencil annotation: two offset arcs + a small leader line to a dot, plus a Caveat note.
 *  Positions in % of the parent figure (absolute). `flip` mirrors the arc side. */
export default function Annot({
  x = 8,
  y = 12,
  w = 34,
  note,
  tone = "ink",
  flip = false,
}: {
  x?: number;
  y?: number;
  w?: number;
  note: string;
  tone?: "ink" | "cream";
  flip?: boolean;
}) {
  const stroke = tone === "ink" ? "#3a4458" : "#e8e0c8";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-10"
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%` }}
    >
      <svg viewBox="0 0 200 90" className="h-auto w-full" style={flip ? { transform: "scaleX(-1)" } : undefined}>
        <path
          d="M 14 44 C 40 10, 150 6, 186 40 C 196 60, 160 82, 96 80 C 40 78, 8 66, 14 44"
          fill="none"
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="3 5"
          opacity="0.55"
        />
        <path
          d="M 18 48 C 44 16, 146 12, 182 42 C 190 58, 158 78, 98 76 C 46 74, 12 64, 18 48"
          fill="none"
          stroke={stroke}
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path d="M 186 42 C 190 52, 196 60, 198 70" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.5" />
        <circle cx="198" cy="74" r="2.4" fill={stroke} opacity="0.5" />
      </svg>
      <span
        className="absolute top-[86%] left-[56%] whitespace-nowrap font-[family-name:var(--font-caveat)] text-[clamp(1.1rem,0.7rem+1.1vw,1.55rem)]"
        style={{ color: stroke, opacity: 0.85 }}
      >
        {note}
      </span>
    </div>
  );
}
