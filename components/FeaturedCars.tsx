"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import type { Car } from "@/data/cars";
import { InventoryBadge } from "@/components/InventoryBadge";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CARS_PER_PAGE = 6;

function parseListParam(searchParams: URLSearchParams, key: string) {
  return (
    searchParams
      .get(key)
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? []
  );
}

function parsePriceRangeParam(
  searchParams: URLSearchParams,
  minPrice: number,
  maxPrice: number,
  priceBands: { label: string; value: [number, number] }[],
): [number, number] {
  const min = Number(searchParams.get("priceMin"));
  const max = Number(searchParams.get("priceMax"));
  const parsedMin = Number.isFinite(min) ? Math.max(minPrice, Math.min(min, maxPrice)) : minPrice;
  const parsedMax = Number.isFinite(max) ? Math.max(minPrice, Math.min(max, maxPrice)) : maxPrice;
  const normalizedRange: [number, number] =
    parsedMin <= parsedMax ? [parsedMin, parsedMax] : [minPrice, maxPrice];
  const matchingBand = priceBands.find(
    (band) => band.value[0] === normalizedRange[0] && band.value[1] === normalizedRange[1],
  );

  return matchingBand ? matchingBand.value : [minPrice, maxPrice];
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95 ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-card text-muted-foreground hover:border-foreground/30"
      }`}
    >
      {label}
    </button>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-4 border-b border-border/50 pb-4 last:mb-0 last:border-0 last:pb-0">
      <h4 className="mb-3 text-sm font-semibold text-foreground">{title}</h4>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function getPriceValue(priceBirr: string) {
  const parsed = Number(priceBirr.replace(/[^\d]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoneyLabel(value?: string) {
  if (!value?.trim()) return "";

  const normalized = value.trim();
  return /birr|etb/i.test(normalized) ? normalized : `${normalized} Birr`;
}

function getMileageLabel(car: Car) {
  if (car.mileage?.trim()) return car.mileage;
  if (car.kmDriven > 0) return `${car.kmDriven.toLocaleString("en-US")} km`;
  return "N/A";
}

function getCardSummary(car: Car) {
  return [car.fuelType, car.transmission]
    .filter(Boolean)
    .join(" • ");
}

export function FeaturedCars({ carsData }: { carsData: Car[] }) {
  const sectionRef = useScrollReveal();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categories: string[] = useMemo(() => [...new Set(carsData.map((car) => car.category))], [carsData]);
  const fuelTypes: string[] = useMemo(() => [...new Set(carsData.map((car) => car.fuelType))], [carsData]);
  const priceValues = useMemo(() => carsData.map((car) => getPriceValue(car.priceBirr)).filter(Boolean), [carsData]);
  const minPrice = priceValues.length ? Math.min(...priceValues) : 0;
  const maxPrice = priceValues.length ? Math.max(...priceValues) : 0;
  const carIds = useMemo(() => new Set(carsData.map((car) => car.id)), [carsData]);
  const priceBands = useMemo(
    () =>
      [
        { label: "All Prices", value: [minPrice, maxPrice] as [number, number] },
        { label: "Under 5M ETB", value: [minPrice, Math.min(5000000, maxPrice)] as [number, number] },
        { label: "5M - 10M ETB", value: [5000000, Math.min(10000000, maxPrice)] as [number, number] },
        { label: "10M - 20M ETB", value: [10000000, Math.min(20000000, maxPrice)] as [number, number] },
        { label: "20M+ ETB", value: [20000000, maxPrice] as [number, number] },
      ].filter(
        (band, index, all) =>
          band.value[0] <= band.value[1] &&
          (index === 0 ||
            band.value[0] !== all[index - 1].value[0] ||
            band.value[1] !== all[index - 1].value[1]),
      ),
    [maxPrice, minPrice],
  );
  const isSyncingFromUrl = useRef(false);
  const [visibleCount, setVisibleCount] = useState(CARS_PER_PAGE);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    isSyncingFromUrl.current = true;
    setSearchQuery(params.get("q") ?? "");
    setSelectedCategories(parseListParam(params, "body").filter((item) => categories.includes(item)));
    setSelectedFuel(parseListParam(params, "fuel").filter((item) => fuelTypes.includes(item)));
    setPriceRange(parsePriceRangeParam(params, minPrice, maxPrice, priceBands));
  }, [categories, fuelTypes, maxPrice, minPrice, priceBands, searchParams]);

  const toggle = (items: string[], value: string, setter: Dispatch<SetStateAction<string[]>>) => {
    setter(items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);
  };

  const activeCount =
    selectedCategories.length +
    selectedFuel.length +
    (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedFuel([]);
    setPriceRange([minPrice, maxPrice]);
    setSearchQuery("");
  };

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return carsData.filter((car) => {
      const carPrice = getPriceValue(car.priceBirr);
      const searchable = [car.name, car.brand, car.cityLocation, car.optionNote ?? "", car.trim ?? ""]
        .join(" ")
        .toLowerCase();

      if (query && !searchable.includes(query)) return false;
      if (selectedCategories.length && !selectedCategories.includes(car.category)) return false;
      if (selectedFuel.length && !selectedFuel.includes(car.fuelType)) return false;
      if (carPrice < priceRange[0] || carPrice > priceRange[1]) return false;

      return true;
    });
  }, [carsData, priceRange, searchQuery, selectedCategories, selectedFuel]);

  useEffect(() => {
    setVisibleCount(CARS_PER_PAGE);
  }, [searchQuery, selectedCategories, selectedFuel, priceRange]);

  useEffect(() => {
    if (isSyncingFromUrl.current) {
      isSyncingFromUrl.current = false;
      return;
    }

    const nextParams = new URLSearchParams();

    if (searchQuery.trim()) nextParams.set("q", searchQuery.trim());
    if (selectedCategories.length) nextParams.set("body", selectedCategories.join(","));
    if (selectedFuel.length) nextParams.set("fuel", selectedFuel.join(","));
    if (priceRange[0] !== minPrice) nextParams.set("priceMin", String(priceRange[0]));
    if (priceRange[1] !== maxPrice) nextParams.set("priceMax", String(priceRange[1]));

    const queryString = nextParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [maxPrice, minPrice, pathname, priceRange, router, searchQuery, selectedCategories, selectedFuel]);

  const selectedPriceBandIndex = Math.max(
    0,
    priceBands.findIndex((band) => band.value[0] === priceRange[0] && band.value[1] === priceRange[1]),
  );

  const filterPanel = (
    <div className="space-y-0">
      <FilterGroup title="Category">
        {categories.map((category) => (
          <FilterChip
            key={category}
            label={category}
            active={selectedCategories.includes(category)}
            onClick={() => toggle(selectedCategories, category, setSelectedCategories)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Fuel Type">
        {fuelTypes.map((fuel) => (
          <FilterChip
            key={fuel}
            label={fuel}
            active={selectedFuel.includes(fuel)}
            onClick={() => toggle(selectedFuel, fuel, setSelectedFuel)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price Range">
        <div className="w-full px-1">
          <select
            value={selectedPriceBandIndex}
            onChange={(event) => setPriceRange(priceBands[Number(event.target.value)].value)}
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          >
            {priceBands.map((band, index) => (
              <option key={band.label} value={index}>
                {band.label}
              </option>
            ))}
          </select>
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <section id="cars" className="bg-secondary/50 py-20 lg:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-7xl section-padding">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">Collection</p>
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl">Featured Vehicles</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Current showroom and channel listings with pricing, mileage, and financing information.
          </p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by vehicle, brand, or location..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="h-11 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-shadow focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-secondary hover:bg-muted-foreground/20"
            >
              <X className="h-3 w-3" />
            </button>
          ) : null}
        </div>

        <div className="mb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setShowFilters((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary active:scale-95 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                {activeCount}
              </span>
            ) : null}
          </button>

          <div className="ml-auto flex items-center gap-3">
            {activeCount > 0 ? (
              <button onClick={clearAll} className="text-sm text-accent hover:underline">
                Clear all
              </button>
            ) : null}
            <span className="text-sm text-muted-foreground">
              {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-72 flex-shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                  Vehicle Filters
                </h3>
                {activeCount > 0 ? (
                  <button onClick={clearAll} className="text-xs text-accent hover:underline">
                    Clear
                  </button>
                ) : null}
              </div>
              {filterPanel}
            </div>
          </aside>

          {showFilters ? (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
              <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-card p-6 shadow-2xl animate-fade-up">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Vehicle Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary active:scale-95"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {filterPanel}
                <Button
                  className="mt-6 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => setShowFilters(false)}
                >
                  Show {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </Button>
              </div>
            </div>
          ) : null}

          <div className="min-w-0 flex-1">
            {!filtered.length ? (
              <div className="py-20 text-center">
                <p className="mb-4 text-lg text-muted-foreground">No vehicles match your filters.</p>
                <Button variant="outline" onClick={clearAll} className="rounded-full">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.slice(0, visibleCount).map((car, index) => {
                    const cardSummary = getCardSummary(car);

                    return (
                      <article
                        key={car.id}
                        className="group overflow-hidden rounded-xl bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                          <img
                            src={car.images[0]}
                            alt={car.name}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />
                          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-medium text-foreground">
                              {car.category}
                            </span>
                            <InventoryBadge status={car.inventoryStatus} />
                          </div>
                          {car.inventoryStatus === "sold-out" ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <span className="text-lg font-bold uppercase tracking-wider text-white">Sold Out</span>
                            </div>
                          ) : null}
                        </div>
                        <div className="space-y-3 p-5">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">{car.name}</h3>
                            <p className="text-sm text-muted-foreground">{car.brand} • {car.year}</p>
                          </div>

                          <p className="text-2xl font-bold leading-none text-foreground">
                            {formatMoneyLabel(car.priceBirr)}
                          </p>

                          <p className="text-sm text-muted-foreground">{cardSummary}</p>

                          <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" size="sm" asChild>
                            <Link href={`/car/${car.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {visibleCount < filtered.length ? (
                  <div className="mt-10 text-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full border-border px-8 hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setVisibleCount((current) => current + CARS_PER_PAGE)}
                    >
                      Load More ({filtered.length - visibleCount} remaining)
                    </Button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
