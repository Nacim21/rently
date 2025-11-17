import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">🏠</div>
        <span className="brand-name">Rently</span>
      </div>

      <div className="navbar-links">
        <Link 
          to="/dashboard" 
          className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          <span className="nav-icon">📊</span>
          Dashboard
        </Link>
        <Link 
          to="/properties" 
          className={`nav-link ${location.pathname === '/properties' ? 'active' : ''}`}
        >
          <span className="nav-icon">🏢</span>
          Properties
        </Link>
        <Link 
          to="/payments" 
          className={`nav-link ${location.pathname === '/payments' ? 'active' : ''}`}
        >
          <span className="nav-icon">💳</span>
          Payments
        </Link>
        <Link 
          to="/maintenance" 
          className={`nav-link ${location.pathname === '/maintenance' ? 'active' : ''}`}
        >
          <span className="nav-icon">🔧</span>
          Maintenance
        </Link>
        <Link 
          to="/messages" 
          className={`nav-link ${location.pathname === '/messages' ? 'active' : ''}`}
        >
          <span className="nav-icon">💬</span>
          Messages
        </Link>
      </div>

      <div className="navbar-actions">
        <span className="user-role">Landlord</span>
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
