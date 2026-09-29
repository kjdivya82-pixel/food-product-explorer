import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types/product";

interface ProductsState {
  products: Product[];
  error: string | null;
  settledRetryKey: number;
}

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ products: [], error: null, settledRetryKey: -1 });
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    getProducts(controller.signal)
      .then((products) => setState({ products, error: null, settledRetryKey: retryKey }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          products: [],
          error: error instanceof Error ? error.message : "Please check your connection and try again.",
          settledRetryKey: retryKey,
        });
      });
    return () => controller.abort();
  }, [retryKey]);

  const loading = state.settledRetryKey !== retryKey;
  return {
    products: state.products,
    loading,
    error: loading ? null : state.error,
    retry: () => setRetryKey((key) => key + 1),
  };
}