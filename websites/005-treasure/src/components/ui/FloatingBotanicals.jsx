function Flower({ cx, cy, scale = 1 }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      {/* petals */}
      <ellipse cx="0" cy="-7" rx="4" ry="7" />
      <ellipse
        cx="6.7"
        cy="-2.2"
        rx="4"
        ry="7"
        transform="rotate(72 6.7 -2.2)"
      />
      <ellipse
        cx="4.1"
        cy="5.7"
        rx="4"
        ry="7"
        transform="rotate(144 4.1 5.7)"
      />
      <ellipse
        cx="-4.1"
        cy="5.7"
        rx="4"
        ry="7"
        transform="rotate(216 -4.1 5.7)"
      />
      <ellipse
        cx="-6.7"
        cy="-2.2"
        rx="4"
        ry="7"
        transform="rotate(288 -6.7 -2.2)"
      />

      {/* center */}
      <circle cx="0" cy="0" r="2.2" fill="currentColor" stroke="none" />
    </g>
  );
}

function Leaf({ x, y, rotate = 0, scale = 1 }) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
    >
      <path d="M0 0 C8 -10, 17 -10, 22 0 C17 10, 8 10, 0 0Z" />
      <path d="M2 0 C8 0, 14 0, 20 0" />
    </g>
  );
}

function BranchSVG({ className, style }) {
  return (
    <svg
      viewBox="0 0 140 220"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Main stem */}
      <path d="M70 220 C67 180, 72 140, 68 105 C65 72, 67 42, 70 12" />

      {/* Left stems */}
      <path d="M69 165 C52 154, 37 139, 29 117" />
      <path d="M67 112 C51 102, 38 87, 32 65" />
      <path d="M69 65 C56 57, 47 46, 43 30" />

      {/* Right stems */}
      <path d="M69 178 C86 166, 102 151, 110 128" />
      <path d="M67 124 C84 113, 98 98, 105 77" />
      <path d="M69 76 C82 67, 91 53, 95 37" />

      {/* Leaves */}
      <Leaf x={31} y={119} rotate={-38} scale={0.85} />
      <Leaf x={101} y={133} rotate={28} scale={0.9} />

      <Leaf x={33} y={67} rotate={-35} scale={0.72} />
      <Leaf x={99} y={80} rotate={32} scale={0.72} />

      <Leaf x={45} y={32} rotate={-42} scale={0.58} />
      <Leaf x={93} y={38} rotate={35} scale={0.62} />

      {/* Flowers */}
      <Flower cx={28} cy={116} scale={0.8} />
      <Flower cx={109} cy={126} scale={0.72} />

      <Flower cx={31} cy={63} scale={0.62} />
      <Flower cx={106} cy={75} scale={0.7} />

      <Flower cx={43} cy={29} scale={0.5} />

      {/* Top flower */}
      <Flower cx={70} cy={12} scale={0.78} />
    </svg>
  );
}

const defaultLayout = [
  {
    top: "5%",
    left: "-1%",
    size: 125,
    rotate: -12,
    flip: false,
  },
  {
    top: "48%",
    left: "91%",
    size: 145,
    rotate: 12,
    flip: true,
  },
  {
    top: "76%",
    left: "3%",
    size: 82,
    rotate: 8,
    flip: false,
  },
];

export default function FloatingBotanicals({
  layout = defaultLayout,
  colorClass = "text-peach/60",
}) {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {layout.map((p, i) => (
        <BranchSVG
          key={i}
          className={`floating-petal absolute ${colorClass}`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            rotate: `${p.rotate}deg`,
            scale: p.flip ? "-1 1" : "1 1",
          }}
        />
      ))}
    </div>
  );
}