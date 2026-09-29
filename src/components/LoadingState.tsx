interface LoadingStateProps {
  count?: number;
  variant?: "grid" | "detail";
}

export function LoadingState({ count = 8, variant = "grid" }: LoadingStateProps) {
  if (variant === "detail") {
    return (
      <div className="detail-skeleton" role="status" aria-label="Loading product details">
        <div className="skeleton detail-skeleton-image" />
        <div className="detail-skeleton-copy">
          <div className="skeleton skeleton-line short" />
          <div className="skeleton skeleton-line title-line" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-price" />
        </div>
        <span className="visually-hidden">Loading product details...</span>
      </div>
    );
  }

  return (
    <div className="product-grid" role="status" aria-label="Loading products">
      {Array.from({ length: count }, (_, index) => (
        <div className="product-card skeleton-card" key={index}>
          <div className="skeleton skeleton-product-image" />
          <div className="skeleton-card-copy">
            <div className="skeleton skeleton-line short" />
            <div className="skeleton skeleton-line title-line" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
          </div>
        </div>
      ))}
      <span className="visually-hidden">Loading products...</span>
    </div>
  );
}