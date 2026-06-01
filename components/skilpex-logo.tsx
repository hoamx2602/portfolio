export function SkilpexLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Skilpex logo"
      role="img"
    >
      {/* Hexagon group centered at 30,30 */}
      <g transform="translate(30,30)">
        {/* Hexagon base */}
        <polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-28" fill="none" />
        <polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14" fill="#0C447C" />

        {/* Full hexagon */}
        <polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14" fill="#0C447C" />
        <polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14" fill="none" />

        {/* Correct full hexagon */}
        <polygon points="0,-28 24.25,-14 24.25,14 0,28 -24.25,14 -24.25,-14" fill="#0C447C" />

        {/* 3 alternating amber sides (trapezoid strips between outer and inner hex) */}
        {/* Outer r=28, Inner r=24.5 */}
        {/* Side top-right: (0,-28)→(24.25,-14), inner: (0,-24.5)→(21,-12) */}
        <polygon points="0,-28 24.25,-14 21,-12 0,-24.5" fill="#EF9F27" />
        {/* Side bottom: (24.25,14)→(0,28), inner: (21,12)→(0,24.5) */}
        <polygon points="24.25,14 0,28 0,24.5 21,12" fill="#EF9F27" />
        {/* Side left: (-24.25,-14)→(-24.25,14), inner: (-21,-12)→(-21,12) */}
        <polygon points="-24.25,-14 -24.25,14 -21,12 -21,-12" fill="#EF9F27" />

        {/* Inner ring subtle */}
        <polygon points="0,-24.5 21,-12 21,12 0,24.5 -21,12 -21,-12"
          fill="none" stroke="white" strokeWidth="0.4" opacity="0.2" />

        {/* Letter S */}
        <text
          x="0" y="9"
          fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
          fontSize="27"
          fontWeight="900"
          textAnchor="middle"
          fill="white"
        >S</text>
      </g>

      {/* Divider */}
      <line x1="64" y1="10" x2="64" y2="50" stroke="#D3D1C7" strokeWidth="0.5" />

      {/* SKILPEX wordmark */}
      <text
        x="72" y="36"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="18"
        fontWeight="700"
        letterSpacing="1"
      >
        <tspan fill="#0C447C">SKIL</tspan>
        <tspan fill="#EF9F27">PEX</tspan>
      </text>

      {/* Tagline */}
      <text
        x="73" y="47"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="4.5"
        fontWeight="400"
        letterSpacing="2.2"
        fill="#888780"
      >SMART SOLUTIONS</text>
    </svg>
  )
}
