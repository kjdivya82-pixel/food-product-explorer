interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({ message = "Something went wrong while fetching the products.", onRetry }: ErrorStateProps) {
  return (
    <section className="message-state" role="alert">
      <span className="state-mark state-mark-error" aria-hidden="true">!</span>
      <h2>Unable to load products.</h2>
      <p>{message}</p>
      <button className="primary-button" type="button" onClick={onRetry}>Try again</button>
    </section>
  );
}