import '../App.css'

function Navbar() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Hadal Cove home">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>

        <span className="brand-name">
          HADAL<span> COVE</span>
        </span>
      </a>

      <div className="header-status">
        <span className="status-dot" />
        <span>OCEAN SYSTEMS / 001</span>
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <a href="#discover">THE FRONTIER</a>
        <a href="#discover">DISCOVER</a>
      </nav>

      <a className="menu-link" href="#discover">
        <span>EXPLORE</span>
        <span className="menu-arrow" aria-hidden="true">↗</span>
      </a>
    </header>
  )
}

export default Navbar
