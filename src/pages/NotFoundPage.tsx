import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="page-container">
      <section className="message-state">
        <span className="state-mark state-mark-empty" aria-hidden="true">404</span>
        <h1>That page wandered off.</h1>
        <p>Let us take you back to the product collection.</p>
        <Link className="primary-button" to="/products">Browse products</Link>
      </section>
    </div>
  );
}