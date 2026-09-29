import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { formatCategory, formatPrice, formatRating, getStockInfo } from "../utils/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const stock = getStockInfo(product.stock);

  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/products/${product.id}`} aria-label={`View ${product.title}`}>
        <img className="product-image" src={product.thumbnail} alt={product.title} loading="lazy" />
        {product.discountPercentage > 0 && <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>}
      </Link>
      <div className="product-card-content">
        <div className="product-meta-row">
          <span className="category-label">{formatCategory(product.category)}</span>
          <span className="rating-label" aria-label={`Rating ${formatRating(product.rating)} out of 5`}><span aria-hidden="true">★</span> {formatRating(product.rating)}</span>
        </div>
        <h2 className="product-title"><Link to={`/products/${product.id}`}>{product.title}</Link></h2>
        <div className="product-card-bottom">
          <div>
            <p className="product-price">{formatPrice(product.price)}</p>
            <span className={`stock-label ${stock.className}`}>{stock.label}</span>
          </div>
          <Link className="details-button" to={`/products/${product.id}`}>View details <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </article>
  );
}