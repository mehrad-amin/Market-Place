"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => ({
      category: searchParams.get("category") || "all",
      search: searchParams.get("search") || "",
      sort: searchParams.get("sort") || "default",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      inStock: searchParams.get("inStock") === "true",
    }),
    [searchParams],
  );
  const updateFilters = useCallback(
    (newFilters) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== "" && value !== "all" && value !== false) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      const newURL = `${pathname}?${params.toString()}`;
      router.push(newURL, { scroll: false });
    },
    [router, searchParams, pathname],
  );
  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(
      (value) =>
        value &&
        value !== "all" &&
        value !== "" &&
        value !== false &&
        value !== "default",
    );
  }, [filters]);
  return {
    filters,
    updateFilters,
    resetFilters,
    hasActiveFilters,
  };
}
