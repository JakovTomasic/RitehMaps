import { useSearch } from "wouter";

export function useSearchParams(): URLSearchParams {
  const paramsString = useSearch();
  return new URLSearchParams(paramsString);
}
