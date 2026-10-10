import './BelowSurface.css'

function BelowSurface() {
  return (
    <section className="below-surface" id="below-surface">
      <video
        className="below-surface__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source
          src={`${import.meta.env.BASE_URL}assets/videos/schooloffishes.mp4`}
          type="video/mp4"
        />
      </video>

      <div className="below-surface__overlay" aria-hidden="true" />

      <div className="below-surface__topline">
        <span>HC / FIELD OBSERVATION</span>
        <span>ZONE 03 — OPEN WATER</span>
      </div>

      <div className="below-surface__content">
        <p className="below-surface__eyebrow">
          <span />
          BEYOND THE KNOWN
        </p>

        <h2>
          Life moves
          <br />
          <span>in the deep.</span>
        </h2>

        <p className="below-surface__description">
          An entire world exists beneath the surface.
          Always moving. Always changing. Rarely seen.
        </p>

        <a className="below-surface__link" href="#signal">
          <span>CONTINUE EXPLORING</span>
          <span className="below-surface__arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>

      <div className="below-surface__coordinates">
        <span>PELAGIC ZONE</span>
        <span>OBSERVATION / 003</span>
      </div>

      <div className="below-surface__index" aria-hidden="true">
        03
      </div>
    </section>
  )
}

export default BelowSurface