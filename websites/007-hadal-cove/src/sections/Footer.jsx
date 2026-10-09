import './Footer.css'

const footerLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'SPECIMEN LOG', href: '#specimen-log' },
  { label: 'BELOW THE SURFACE', href: '#below-surface' },
  { label: 'SIGNAL ANALYSIS', href: '#signal' },
  { label: 'FINAL ENCOUNTER', href: '#final-encounter' },
]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <a className="site-footer__brand" href="#home">
          <span className="site-footer__symbol" aria-hidden="true">
            〰
          </span>

          <span className="site-footer__wordmark">
            HADAL COVE
            <small>DEEP OCEAN RESEARCH</small>
          </span>
        </a>

        <p className="site-footer__statement">
          The deeper we go,
          <br />
          <span>the more there is to discover.</span>
        </p>

        <a className="site-footer__top-link" href="#home">
          RETURN TO SURFACE
          <span aria-hidden="true">↑</span>
        </a>
      </div>

      <div className="site-footer__divider" />

      <div className="site-footer__bottom">
        <div className="site-footer__copyright">
          <span>HC / 001</span>
          <span>AN EXPERIMENT IN DIGITAL EXPLORATION</span>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-footer__status">
          <span className="site-footer__status-dot" />
          ARCHIVE STATUS: ACTIVE
        </div>
      </div>
    </footer>
  )
}

export default Footer
