import './SignalSection.css'

const wavePaths = [
  {
    className: 'signal-wave__line signal-wave__line--back',
    d: 'M0 116 C55 116 65 87 108 99 S157 143 205 113 S260 66 305 102 S370 151 420 113 S480 78 530 110 S590 144 640 108 S705 76 755 105 S815 144 865 108 S925 81 975 110 S1035 143 1085 105 S1145 85 1200 111',
  },
  {
    className: 'signal-wave__line signal-wave__line--middle',
    d: 'M0 116 C50 116 73 119 105 116 S153 111 182 116 S211 145 238 115 S265 58 292 116 S325 174 352 116 S386 39 415 116 S448 163 478 116 S510 82 540 116 S575 145 605 116 S637 65 667 116 S700 157 730 116 S765 92 795 116 S830 134 860 116 S895 75 925 116 S960 154 990 116 S1025 95 1055 116 S1090 135 1120 116 S1160 103 1200 116',
  },
  {
    className: 'signal-wave__line signal-wave__line--front',
    d: 'M0 116 C55 116 75 111 105 116 S145 126 175 116 S215 91 245 116 S275 149 305 116 S345 77 375 116 S415 155 445 116 S485 95 515 116 S555 132 585 116 S625 82 655 116 S695 146 725 116 S765 101 795 116 S835 128 865 116 S905 89 935 116 S975 139 1005 116 S1045 102 1075 116 S1115 127 1145 116 S1175 112 1200 116',
  },
]

function SignalSection() {
  return (
    <section className="signal-section" id="signal">
      <div className="signal-section__ambient" aria-hidden="true" />

      <div className="signal-section__inner">
        <header className="signal-section__header">
          <div className="signal-section__heading">
            <p className="signal-section__eyebrow">
              <span className="signal-section__eyebrow-mark" />
              03 / SIGNAL ANALYSIS
            </p>

            <h2>
              The ocean leaves
              <br />
              <span>a signal.</span>
            </h2>
          </div>

          <div className="signal-section__description">
            <span className="signal-section__micro-label">
              DEEP OCEAN MONITORING SYSTEM
            </span>
            <p>
              Beneath the visible world, another story unfolds.
              A shifting pattern of pressure, movement, and
              frequencies travelling through the deep.
            </p>
          </div>
        </header>

        <div className="signal-console">
          <div className="signal-console__top">
            <div className="signal-console__identity">
              <span className="signal-console__symbol">〰</span>
              <span>HC / SONAR ARRAY</span>
            </div>

            <div className="signal-console__status">
              <span className="signal-console__status-dot" />
              SIGNAL DETECTED
            </div>

            <span className="signal-console__mode">MODE 01 — PASSIVE</span>
          </div>

          <div className="signal-wave">
            <div className="signal-wave__coordinates signal-wave__coordinates--left">
              <span>AMPLITUDE</span>
              <span>HIGH</span>
            </div>

            <div className="signal-wave__coordinates signal-wave__coordinates--right">
              <span>TRACE / 003</span>
              <span>LIVE PATTERN</span>
            </div>

            <svg
              className="signal-wave__visual"
              viewBox="0 0 1200 232"
              preserveAspectRatio="none"
              role="img"
              aria-label="Abstract layered ocean signal waveform"
            >
              <defs>
                <linearGradient
                  id="signal-gradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#317b80" stopOpacity="0.15" />
                  <stop offset="40%" stopColor="#8cf9e9" stopOpacity="1" />
                  <stop offset="70%" stopColor="#45c8cb" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#317b80" stopOpacity="0.2" />
                </linearGradient>

                <filter
                  id="signal-glow"
                  x="-20%"
                  y="-100%"
                  width="140%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="4" />
                </filter>

                <pattern
                  id="signal-grid"
                  width="40"
                  height="29"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M40 0H0V29"
                    fill="none"
                    stroke="#76c7ca"
                    strokeOpacity="0.15"
                    strokeWidth="0.7"
                  />
                </pattern>
              </defs>

              <rect
                width="1200"
                height="232"
                fill="url(#signal-grid)"
              />

              {Array.from({ length: 7 }, (_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={31 + i * 29}
                  x2="1200"
                  y2={31 + i * 29}
                  stroke="#76c7ca"
                  strokeOpacity="0.12"
                  strokeWidth="0.6"
                  strokeDasharray="2 7"
                />
              ))}

              <line
                x1="0"
                y1="116"
                x2="1200"
                y2="116"
                stroke="#83f0e5"
                strokeOpacity="0.24"
                strokeWidth="0.8"
              />

              {wavePaths.map((wave, i) => (
                <g key={wave.className}>
                  <path
                    className={`${wave.className} signal-wave__glow`}
                    d={wave.d}
                    transform={`translate(0 ${i * 2})`}
                    filter="url(#signal-glow)"
                  />
                  <path
                    className={wave.className}
                    d={wave.d}
                    transform={`translate(0 ${i * 2})`}
                  />
                </g>
              ))}

              <path
                className="signal-wave__fine-line"
                d="M0 116 C80 116 90 113 120 116 S180 121 220 116 S280 109 320 116 S380 123 420 116 S480 111 520 116 S580 120 620 116 S680 108 720 116 S780 124 820 116 S880 110 920 116 S980 122 1020 116 S1080 111 1120 116 S1170 117 1200 116"
              />

              <circle
                className="signal-wave__target-ring"
                cx="655"
                cy="118"
                r="13"
              />
              <circle
                className="signal-wave__target-ring signal-wave__target-ring--outer"
                cx="655"
                cy="118"
                r="23"
              />
              <circle
                className="signal-wave__target"
                cx="655"
                cy="118"
                r="3"
              />

              <line
                x1="655"
                y1="88"
                x2="655"
                y2="147"
                stroke="#a5fff0"
                strokeOpacity="0.7"
                strokeWidth="0.7"
                strokeDasharray="2 4"
              />
            </svg>

            <span className="signal-wave__axis-label signal-wave__axis-label--start">
              −120
            </span>
            <span className="signal-wave__axis-label signal-wave__axis-label--middle">
              000
            </span>
            <span className="signal-wave__axis-label signal-wave__axis-label--end">
              +120
            </span>
          </div>

          <div className="signal-console__bottom">
            <span>FREQUENCY SPECTRUM</span>

            <div className="signal-console__ticks" aria-hidden="true">
              {Array.from({ length: 36 }, (_, i) => (
                <span
                  key={i}
                  className={i % 5 === 0 ? 'is-major' : ''}
                />
              ))}
            </div>

            <span>END OF TRACE</span>
          </div>
        </div>

        <div className="signal-section__readouts">
          <div className="signal-readout">
            <span className="signal-readout__label">SIGNAL ORIGIN</span>
            <span className="signal-readout__value">UNRESOLVED</span>
            <span className="signal-readout__note">SOURCE UNIDENTIFIED</span>
          </div>

          <div className="signal-readout">
            <span className="signal-readout__label">WAVE PATTERN</span>
            <span className="signal-readout__value">OSCILLATING</span>
            <span className="signal-readout__note">NON-STATIC TRACE</span>
          </div>

          <div className="signal-readout">
            <span className="signal-readout__label">ANALYSIS STATUS</span>
            <span className="signal-readout__value signal-readout__value--accent">
              IN PROGRESS
            </span>
            <span className="signal-readout__note">
              FURTHER OBSERVATION REQUIRED
            </span>
          </div>
        </div>

        <footer className="signal-section__footer">
          <span>THE DEEP IS NEVER SILENT.</span>
          <span className="signal-section__footer-line" />
          <span>HC / RESEARCH DIVISION — 003</span>
        </footer>
      </div>
    </section>
  )
}

export default SignalSection