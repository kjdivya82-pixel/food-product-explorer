import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="footer-brand" to="/products">Food Product Explorer</Link>
        <span>Thoughtful finds for your everyday table.</span>
        <span className="footer-note">Product data provided by DummyJSON</span>
      </div>
    </footer>
  );
}