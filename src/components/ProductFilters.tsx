import type { ChangeEvent } from "react";
import { formatCategory } from "../utils/format";

export type ProductSort = "default" | "price-asc" | "price-desc" | "rating" | "name";

interface ProductFiltersProps {
  query: string;
  category: string;
  sort: ProductSort;
  categories: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: ProductSort) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function ProductFilters({ query, category, sort, categories, onQueryChange, onCategoryChange, onSortChange, onClear, hasActiveFilters }: ProductFiltersProps) {
  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    onSortChange(event.target.value as ProductSort);
  }

  return (
    <section className="filter-panel" id="catalog-controls" aria-label="Find products">
      <label className="search-field">
        <span className="search-icon" aria-hidden="true" />
        <span className="visually-hidden">Search products by title</span>
        <input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search products..." />
        {query && <button className="clear-search" type="button" onClick={() => onQueryChange("")} aria-label="Clear search">×</button>}
      </label>
      <label className="select-field">
        <span>Category</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((item) => <option key={item} value={item}>{formatCategory(item)}</option>)}
        </select>
      </label>
      <label className="select-field sort-field">
        <span>Sort by</span>
        <select value={sort} onChange={handleSortChange}>
          <option value="default">Recommended</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
          <option value="name">Name: A to Z</option>
        </select>
      </label>
      {hasActiveFilters && <button className="text-button clear-filters" type="button" onClick={onClear}>Clear filters</button>}
    </section>
  );
}