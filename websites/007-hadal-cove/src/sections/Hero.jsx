import '../App.css'

function Hero() {
  return (
    <section className="hero" id="home">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/images/jellyfish.jpg"
        aria-label="Underwater footage of the deep ocean"
      >
        <source src="/assets/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="video-shade" aria-hidden="true" />
      <div className="frame-grid" aria-hidden="true" />

      <div className="hero-topline">
        <span>THE WORLD BENEATH</span>
        <span className="hero-coordinate">36° 08' N — 12° 44' W</span>
      </div>

      <div className="hero-content">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          AN OCEAN, UNDISCOVERED
        </p>

        <h1>
          Below the
          <br />
          <span>known.</span>
        </h1>

        <div className="hero-description">
          <p>
            Enter a world shaped by darkness, pressure,
            and life unlike anything above.
          </p>

          <a href="#discover" className="discover-link">
            <span className="discover-icon" aria-hidden="true">↓</span>
            <span>DESCEND INTO THE DEEP</span>
          </a>
        </div>
      </div>

      <div className="depth-readout">
        <span className="readout-label">CURRENT DEPTH</span>
        <span className="depth-number">6,420<span> M</span></span>
        <span className="readout-line"><span /></span>
        <span className="readout-caption">HADAL ZONE</span>
      </div>

      <div className="frame-index">
        <span className="index-dot" />
        <span>FIELD RECORDING / 001</span>
      </div>

      <div className="frame-number">HC—001</div>

      <div className="hero-bottomline">
        <span>WHERE LIGHT BECOMES LIFE</span>
        <span className="scroll-cue">
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </span>
        <span className="bottom-index">01 / 04</span>
      </div>

      <span className="frame-corner corner-top-left" aria-hidden="true" />
      <span className="frame-corner corner-top-right" aria-hidden="true" />
      <span className="frame-corner corner-bottom-left" aria-hidden="true" />
      <span className="frame-corner corner-bottom-right" aria-hidden="true" />
    </section>
  )
}

export default Hero
