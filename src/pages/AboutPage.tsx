import { Link } from "react-router-dom";

export function AboutPage() {
  return (
    <div className="page-container about-page">
      <p className="eyebrow"><span className="eyebrow-rule" /> OUR POINT OF VIEW</p>
      <h1>Find a little more<br /><span>good in the everyday.</span></h1>
      <div className="about-body">
        <p className="about-lead">Food Product Explorer is a considered catalog of good things for your pantry and table.</p>
        <div>
            <p>Discover grocery and food products, search by name, and sort the collection to find the everyday essentials you need.</p>
            <p>This frontend exploration is powered by the DummyJSON groceries catalog and built to make browsing feel simple and pleasant.</p>
            <Link className="primary-button" to="/products">Explore groceries <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className="about-rule" />
      <div className="about-stats" aria-label="Product discovery tools">
        <div><strong>01</strong><span>Search by title</span></div>
        <div><strong>02</strong><span>Filter by category</span></div>
        <div><strong>03</strong><span>Compare the details</span></div>
      </div>
    </div>
  );
}