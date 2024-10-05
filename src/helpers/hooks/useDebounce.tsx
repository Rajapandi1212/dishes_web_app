import { useEffect, useRef, useState, useCallback, useMemo } from "react";

export const useDebounce = (
  apiCall: (apiConfig: any) => Promise<any>,
  apiConfig: any,
  shouldFetch: boolean,
  delay: number = 500
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const memoizedApiConfig = useMemo(() => ({ ...apiConfig }), [apiConfig]);

  const memoizedApiCall = useCallback(async () => {
    if (!shouldFetch) {
      setResponse(null);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const res = await apiCall(memoizedApiConfig);
      setResponse(res);
    } catch (error) {
      setError(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, memoizedApiConfig, shouldFetch]);

  useEffect(() => {
    if (shouldFetch) {
      const debounceFetch = () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(memoizedApiCall, delay);
      };

      debounceFetch();
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [memoizedApiCall, delay, shouldFetch]);

  return { response, isLoading, error, isError };
};
