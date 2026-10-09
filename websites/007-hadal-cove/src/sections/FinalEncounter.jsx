import './FinalEncounter.css'

function FinalEncounter() {
  return (
    <section className="final-encounter" id="final-encounter">
      <video
        className="final-encounter__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source
          src="/assets/videos/2863432-uhd_3840_2160_24fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="final-encounter__overlay" aria-hidden="true" />

      <div className="final-encounter__topline">
        <span>HC / DEEP OCEAN RESEARCH</span>
        <span>05 — FINAL ENCOUNTER</span>
      </div>

      <div className="final-encounter__content">
        <p className="final-encounter__eyebrow">
          <span />
          END OF KNOWN TERRITORY
        </p>

        <h2>
          Some mysteries
          <br />
          <span>aren't meant</span>
          <br />
          to be solved.
        </h2>

        <p className="final-encounter__description">
          The ocean still holds more questions than answers.
          Every dive, every signal, brings us closer.
        </p>

        <a
          className="final-encounter__link"
          href="#specimen-log"
        >
          <span>EXPLORE THE ARCHIVE</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <aside className="final-encounter__readout">
        <span className="final-encounter__readout-label">
          FIELD OBSERVATION
        </span>

        <div>
          <span>LOCATION</span>
          <strong>HADAL ZONE</strong>
        </div>

        <div>
          <span>ENVIRONMENT</span>
          <strong>OPEN WATER</strong>
        </div>

        <div>
          <span>STATUS</span>
          <strong className="final-encounter__status">
            <i />
            OBSERVING
          </strong>
        </div>
      </aside>

      <div className="final-encounter__bottom">
        <div className="final-encounter__identity">
          <span className="final-encounter__emblem">HC</span>
          <div>
            <span>DEEP OCEAN RESEARCH INITIATIVE</span>
            <span>HADAL COVE / FIELD NOTES</span>
          </div>
        </div>

        <a
          href="#home"
          className="final-encounter__back"
        >
          RETURN TO SURFACE <span aria-hidden="true">↑</span>
        </a>
      </div>
    </section>
  )
}

export default FinalEncounter
