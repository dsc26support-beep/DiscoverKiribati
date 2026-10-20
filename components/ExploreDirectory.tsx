"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categoryLabels } from "@/lib/labels";
import type { Business, BusinessCategory } from "@/lib/types";
import BusinessCard from "@/components/BusinessCard";
import EmptyState from "@/components/EmptyState";

const categories = Object.keys(categoryLabels) as BusinessCategory[];

export default function ExploreDirectory({ businesses }: { businesses: Business[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<BusinessCategory | "all">(
    (searchParams.get("category") as BusinessCategory) || "all"
  );
  const [island, setIsland] = useState("all");

  const islands = useMemo(
    () => Array.from(new Set(businesses.map((b) => b.island))).sort(),
    [businesses]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return businesses.filter((b) => {
      const matchesQuery =
        q.length === 0 ||
        b.name.toLowerCase().includes(q) ||
        b.shortDescription.toLowerCase().includes(q) ||
        b.island.toLowerCase().includes(q) ||
        categoryLabels[b.category].toLowerCase().includes(q);
      const matchesCategory = category === "all" || b.category === category;
      const matchesIsland = island === "all" || b.island === island;
      return matchesQuery && matchesCategory && matchesIsland;
    });
  }, [businesses, query, category, island]);

  const hasActiveFilters = query.length > 0 || category !== "all" || island !== "all";

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setIsland("all");
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <label htmlFor="explore-search" className="sr-only">
          Search the directory
        </label>
        <input
          id="explore-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, keyword, or location…"
          className="w-full min-w-[220px] flex-1 rounded-full border border-grey/30 px-5 py-3 text-sm focus:border-lagoon focus:outline-none sm:w-auto"
        />

        <label htmlFor="explore-category" className="sr-only">
          Filter by category
        </label>
        <select
          id="explore-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as BusinessCategory | "all")}
          className="rounded-full border border-grey/30 px-4 py-3 text-sm focus:border-lagoon focus:outline-none"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {categoryLabels[c]}
            </option>
          ))}
        </select>

        <label htmlFor="explore-island" className="sr-only">
          Filter by island
        </label>
        <select
          id="explore-island"
          value={island}
          onChange={(e) => setIsland(e.target.value)}
          className="rounded-full border border-grey/30 px-4 py-3 text-sm focus:border-lagoon focus:outline-none"
        >
          <option value="all">All islands</option>
          {islands.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-grey/30 px-4 py-3 text-sm font-semibold text-charcoal hover:border-coral hover:text-coral"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="mt-4 text-sm text-grey" role="status">
        {results.length} {results.length === 1 ? "listing" : "listings"} found
      </p>

      {results.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No listings match those filters"
            description="Try a different search term, or clear your filters to see the full directory."
            action={
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-warm-white hover:bg-lagoon"
              >
                Clear filters
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      )}
    </div>
  );
}
