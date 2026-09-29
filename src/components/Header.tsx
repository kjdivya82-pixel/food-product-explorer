import { useState } from "react";
import { NavLink } from "react-router-dom";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/products" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>Food Product Explorer</span>
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
        <nav id="primary-navigation" className={`primary-navigation${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Products</NavLink>
          <NavLink to={{ pathname: "/products", hash: "catalog-controls" }} className="nav-link" onClick={closeMenu}>Categories</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>About</NavLink>
        </nav>
      </div>
    </header>
  );
}