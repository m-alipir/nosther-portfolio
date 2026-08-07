/**
 * Procedural water-light filters shared by every section's atmosphere
 * layer (see `.atmosphere` in globals.css). No photo assets: each filter
 * is a feTurbulence noise field shaped through a color/alpha curve into a
 * specific optical phenomenon — caustic light on a submerged floor, a slow
 * current, cloud shadow crossing water. Defined once, referenced by id from
 * plain CSS `filter: url(#fx-…)`, so the noise itself is computed once and
 * every section's motion is just a cheap CSS transform on top of it.
 */
export function AtmosphereDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter
          id="fx-caustic"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.0085 0.0105"
            numOctaves={2}
            seed={19}
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
            result="a"
          />
          <feComponentTransfer in="a" result="t">
            <feFuncA type="table" tableValues="0 0 0 0.08 0.9 1 0.12 0 0" />
          </feComponentTransfer>
          <feFlood floodColor="#8FB3B8" result="f" />
          <feComposite in="f" in2="t" operator="in" result="c" />
          <feGaussianBlur in="c" stdDeviation="2.2" />
        </filter>

        <filter
          id="fx-caustic-fine"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.019 0.023"
            numOctaves={2}
            seed={5}
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
            result="a"
          />
          <feComponentTransfer in="a" result="t">
            <feFuncA type="table" tableValues="0 0 0 0.05 0.7 1 0.05 0 0" />
          </feComponentTransfer>
          <feFlood floodColor="#BCD2D4" result="f" />
          <feComposite in="f" in2="t" operator="in" result="c" />
          <feGaussianBlur in="c" stdDeviation="1.1" />
        </filter>

        <filter
          id="fx-current"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.004 0.0012"
            numOctaves={5}
            seed={3}
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.4 0 0 0 -0.2"
            result="a"
          />
          <feComponentTransfer in="a">
            <feFuncA type="table" tableValues="0 0 0.35 0.8 0.1 0" />
          </feComponentTransfer>
          <feFlood floodColor="#E7F1F3" result="f" />
          <feComposite in="f" in2="a" operator="in" result="c" />
          <feGaussianBlur in="c" stdDeviation="5" />
        </filter>

        <filter
          id="fx-cloud"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.0026 0.0018"
            numOctaves={4}
            seed={11}
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
            result="a"
          />
          <feComponentTransfer in="a" result="t">
            <feFuncA type="table" tableValues="0 0.15 0.55 0.85 1" />
          </feComponentTransfer>
          <feFlood floodColor="#ffffff" result="f" />
          <feComposite in="f" in2="t" operator="in" result="c" />
          <feGaussianBlur in="c" stdDeviation="14" />
        </filter>
      </defs>
    </svg>
  );
}
