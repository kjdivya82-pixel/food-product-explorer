import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingState } from "../components/LoadingState";
import { ApiError, getProductById } from "../services/api";
import type { Product } from "../types/product";
import { formatCategory, formatPrice, formatRating, getStockInfo } from "../utils/format";
import { parseProductId } from "../utils/parseProductId";

type DetailState =
  | { status: "success"; product: Product }
  | { status: "not-found" }
  | { status: "error"; message: string };

interface DetailResponse {
  productId: number;
  retryKey: number;
  result: DetailState;
}

export function ProductDetailsPage() {
  const { id } = useParams();
  const productId = parseProductId(id);
  const [retryKey, setRetryKey] = useState(0);
  const [response, setResponse] = useState<DetailResponse | null>(null);

  useEffect(() => {
    if (productId === null) return;
    const controller = new AbortController();
    getProductById(productId, controller.signal)
      .then((product) => setResponse({
        productId,
        retryKey,
        result: product.category === "groceries" ? { status: "success", product } : { status: "not-found" },
      }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        if (error instanceof ApiError && error.status === 404) {
          setResponse({ productId, retryKey, result: { status: "not-found" } });
          return;
        }
        setResponse({
          productId,
          retryKey,
          result: { status: "error", message: error instanceof Error ? error.message : "Please check your connection and try again." },
        });
      });
    return () => controller.abort();
  }, [productId, retryKey]);

  if (productId === null) {
    return <div className="page-container"><section className="message-state"><span className="state-mark state-mark-error" aria-hidden="true">?</span><h1>Product not found</h1><p>The product you are looking for does not exist.</p><Link className="primary-button" to="/products">Back to Products</Link></section></div>;
  }
  const state = response?.productId === productId && response.retryKey === retryKey ? response.result : null;
  if (state === null) return <div className="page-container detail-page"><LoadingState variant="detail" /></div>;
  if (state.status === "not-found") {
    return <div className="page-container"><section className="message-state"><span className="state-mark state-mark-error" aria-hidden="true">?</span><h1>Product not found</h1><p>The product you are looking for does not exist.</p><Link className="primary-button" to="/products">Back to Products</Link></section></div>;
  }
  if (state.status === "error") {
    return <div className="page-container"><section className="message-state" role="alert"><span className="state-mark state-mark-error" aria-hidden="true">!</span><h1>Unable to load product.</h1><p>{state.message}</p><button className="primary-button" type="button" onClick={() => setRetryKey((key) => key + 1)}>Try again</button></section></div>;
  }

  const { product } = state;
  const stock = getStockInfo(product.stock);
  const image = product.images[0] || product.thumbnail;

  return (
    <div className="page-container detail-page">
      <Link className="back-link" to="/products"><span aria-hidden="true">←</span> Back to Products</Link>
      <p className="detail-breadcrumb">Products <span>/</span> {formatCategory(product.category)}</p>
      <article className="product-detail">
        <div className="detail-image-wrap">
          <img src={image} alt={product.title} className="detail-image" />
          {product.discountPercentage > 0 && <span className="discount-badge detail-discount">-{Math.round(product.discountPercentage)}% off</span>}
        </div>
        <div className="detail-copy">
          <div className="detail-labels">
            <span className="category-label">{formatCategory(product.category)}</span>
            <span className="rating-label"><span aria-hidden="true">★</span> {formatRating(product.rating)} <span className="rating-out-of">/ 5</span></span>
          </div>
          <p className="detail-id">PRODUCT No. {String(product.id).padStart(3, "0")}</p>
          <h1>{product.title}</h1>
          {product.brand && <p className="detail-brand">by {product.brand}</p>}
          <p className="detail-description">{product.description}</p>
          <div className="detail-price-row"><span className="detail-price">{formatPrice(product.price)}</span></div>
          <div className="detail-facts">
            <div><span>Availability</span><strong className={`stock-label ${stock.className}`}>{stock.label}</strong></div>
            <div><span>Category</span><strong>{formatCategory(product.category)}</strong></div>
            <div><span>Rating</span><strong>{formatRating(product.rating)} out of 5</strong></div>
          </div>
          <Link className="primary-button detail-continue" to="/products">Continue exploring <span aria-hidden="true">→</span></Link>
        </div>
      </article>
    </div>
  );
}