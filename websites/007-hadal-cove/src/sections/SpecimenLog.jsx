import './SpecimenLog.css'

const specimens = [
  {
    id: 'HC-001',
    name: 'The Striped Sea Nettle',
    scientificName: 'Chrysaora',
    image: '/assets/images/jellyfish.jpg',
    classification: 'CNIDARIA',
    environment: 'PELAGIC WATERS',
    depth: 'VARIABLE',
    note: 'Drifting light in the open water.',
  },
  {
    id: 'HC-002',
    name: 'The Grey Reef Shark',
    scientificName: 'Carcharhinus amblyrhynchos',
    image: '/assets/images/shark.jpg',
    classification: 'CHONDRICHTHYES',
    environment: 'CORAL REEFS',
    depth: 'SHALLOW TO DEEP',
    note: 'A quiet presence in blue water.',
  },
  {
    id: 'HC-003',
    name: 'The Chambered Nautilus',
    scientificName: 'Nautilus pompilius',
    image: '/assets/images/shell.jpg',
    classification: 'CEPHALOPODA',
    environment: 'REEF SLOPES',
    depth: 'VARIABLE',
    note: 'An ancient design, still in motion.',
  },
]

function SpecimenCard({ specimen, index }) {
  return (
    <article className={`specimen-card specimen-card--${index + 1}`}>
      <div className="specimen-card__topline">
        <span>{specimen.id}</span>
        <span className="specimen-card__status">
          <span className="specimen-card__dot" />
          ARCHIVE ENTRY
        </span>
      </div>

      <div className="specimen-card__image-frame">
        <img
          className="specimen-card__image"
          src={specimen.image}
          alt={specimen.name}
          loading="lazy"
        />

        <div className="specimen-card__image-shade" />

        <span className="specimen-card__cross specimen-card__cross--one" />
        <span className="specimen-card__cross specimen-card__cross--two" />

        <span className="specimen-card__image-index">
          SPECIMEN / 0{index + 1}
        </span>

        <span className="specimen-card__bracket" />
      </div>

      <div className="specimen-card__details">
        <p className="specimen-card__classification">
          {specimen.classification}
        </p>

        <h3>{specimen.name}</h3>

        <p className="specimen-card__scientific">
          {specimen.scientificName}
        </p>

        <div className="specimen-card__divider" />

        <dl className="specimen-card__metadata">
          <div>
            <dt>ENVIRONMENT</dt>
            <dd>{specimen.environment}</dd>
          </div>
          <div>
            <dt>DEPTH PROFILE</dt>
            <dd>{specimen.depth}</dd>
          </div>
          <div>
            <dt>RECORD STATUS</dt>
            <dd className="specimen-card__record-status">CATALOGUED</dd>
          </div>
        </dl>

        <p className="specimen-card__note">{specimen.note}</p>
      </div>

      <span className="specimen-card__barcode" aria-hidden="true">
        || ||| || |||| | ||| ||
      </span>
    </article>
  )
}

function SpecimenLog() {
  return (
    <section className="specimen-log" id="specimens">
      <div className="specimen-log__header">
        <div>
          <p className="specimen-log__eyebrow">
            <span className="specimen-log__eyebrow-line" />
            02 / FIELD ARCHIVE
          </p>

          <h2>
            The Specimen
            <br />
            <span>Log.</span>
          </h2>
        </div>

        <div className="specimen-log__intro">
          <span className="specimen-log__archive-status">
            <span className="specimen-card__dot" />
            ARCHIVE SYSTEM ONLINE
          </span>

          <p>
            A record of life beneath the surface.
            Each specimen reveals another fragment
            of a world still being understood.
          </p>

          <span className="specimen-log__count">
            COLLECTION <strong>003</strong> / ENTRIES
          </span>
        </div>
      </div>

      <div className="specimen-log__ruler" aria-hidden="true">
        <span>LAT. 23.884 / LONG. 89.112</span>
        <span>HADAL COVE — BIOLOGICAL RECORDS</span>
        <span>REV. 001</span>
      </div>

      <div className="specimen-log__grid">
        {specimens.map((specimen, index) => (
          <SpecimenCard
            key={specimen.id}
            specimen={specimen}
            index={index}
          />
        ))}
      </div>

      <div className="specimen-log__footer">
        <span>END OF CURRENT RECORD</span>
        <span className="specimen-log__footer-line" />
        <a href="#home">
          BACK TO SURFACE <span aria-hidden="true">↑</span>
        </a>
      </div>
    </section>
  )
}

export default SpecimenLog
