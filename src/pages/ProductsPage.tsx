import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { ProductCard } from "../components/ProductCard";
import { ProductFilters, type ProductSort } from "../components/ProductFilters";
import { useProducts } from "../hooks/useProducts";

export function ProductsPage() {
  const { products, loading, error, retry } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<ProductSort>("default");
  const foodProducts = products.filter((product) => product.category === "groceries");
  const categories = [...new Set(foodProducts.map((product) => product.category))].sort((a, b) => a.localeCompare(b));
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredProducts = foodProducts
    .filter((product) => product.title.toLocaleLowerCase().includes(normalizedQuery))
    .filter((product) => category === "all" || product.category === category);

  if (sort === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
  if (sort === "rating") filteredProducts.sort((a, b) => b.rating - a.rating);
  if (sort === "name") filteredProducts.sort((a, b) => a.title.localeCompare(b.title));

  const hasActiveFilters = Boolean(query || category !== "all" || sort !== "default");
  const clearFilters = () => { setQuery(""); setCategory("all"); setSort("default"); };

  return (
    <div className="page-container products-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-rule" /> THE EVERYDAY EDIT</p>
          <h1>Food <span>&amp;</span> Groceries</h1>
          <p className="page-subtitle">Everyday pantry picks, fresh finds, and kitchen essentials.</p>
        </div>
        <div className="heading-aside" aria-hidden="true"><span className="heading-aside-number">01</span><span>Browse<br />the collection</span></div>
      </div>

      {!loading && !error && <ProductFilters query={query} category={category} sort={sort} categories={categories} onQueryChange={setQuery} onCategoryChange={setCategory} onSortChange={setSort} onClear={clearFilters} hasActiveFilters={hasActiveFilters} />}
      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {!loading && !error && (
        <>
          <div className="results-heading" aria-live="polite">
            <h2>{hasActiveFilters ? "Your results" : "The collection"}</h2>
            <span>{filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}</span>
          </div>
          {filteredProducts.length > 0 ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState hasFilters={hasActiveFilters} onClear={clearFilters} />}
        </>
      )}
    </div>
  );
}