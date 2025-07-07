import { useState, useEffect } from 'react';
import Link from './Link';
import './Header.css';

const Header = ({ currentPath = '' }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Access menu data from global window object
    if (typeof window !== 'undefined' && window.__MENU_DATA__) {
      setMenuItems(window.__MENU_DATA__);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (e) => {
    console.log('Close button clicked!');
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-container">
          <Link href="/" className="styled-link">
            <div className="logo"></div>
          </Link>
          
          <div className="mobile-menu-container">
            <button className="mobile-menu-toggle" onClick={toggleMenu}>
              <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
            </button>
            
            {isMenuOpen && (
              <div className="menu-overlay" onClick={closeMenu}>
                <button className="menu-close-button" onClick={closeMenu}>
                  ✕
                </button>
                <div className="menu-content" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-logo">
                    <Link href="/" className="styled-link">
                      <div className="logo"></div>
                    </Link>
                  </div>
                  {menuItems.map((item) => (
                    <Link key={item.id} href={item.url} className="menu-link">
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <nav className="nav-container">
          <ul className="nav-list">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link 
                  href={item.url} 
                  className="nav-link"
                  aria-current={currentPath === item.url ? 'page' : undefined}
                >
                  {item.title}
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="nav-dropdown">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex} className="nav-dropdown-item">
                        <Link 
                          href={child.url} 
                          className="nav-dropdown-link"
                          aria-current={currentPath === child.url ? 'page' : undefined}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 