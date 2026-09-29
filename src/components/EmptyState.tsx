interface EmptyStateProps {
  onClear: () => void;
  hasFilters: boolean;
}

export function EmptyState({ onClear, hasFilters }: EmptyStateProps) {
  return (
    <section className="message-state empty-state">
      <span className="state-mark state-mark-empty" aria-hidden="true">⌕</span>
      <h2>No products found</h2>
      <p>Try changing your search or category.</p>
      {hasFilters && <button className="secondary-button" type="button" onClick={onClear}>Clear filters</button>}
    </section>
  );
}