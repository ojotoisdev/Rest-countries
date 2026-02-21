"use client";

import Link from "next/link";
import SearchInput from "@/components/Search/SearchInput";
import { useState, useLayoutEffect } from "react";
import Image from "next/image";
import Select from "react-select";
import { regionOptions, getCustomStyles } from "@/components/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Country = {
  name: { common: string };
  cca3: string;
  capital?: string[];
  region: string;
  population: number;
  flags: { png: string; svg: string };
};

const fetchCountries = async (): Promise<Country[]> => {
  const res = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,cca3,capital,region,population,flags"
  );
  return res.data;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { data: countries = [], isLoading, isError } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 60,
  });

  useLayoutEffect(() => {
    const html = document.documentElement;

    const updateMode = () => {
      setIsDarkMode(html.classList.contains("dark"));
    };

    requestAnimationFrame(updateMode);

    const observer = new MutationObserver(() => updateMode());
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase()) &&
      (regionFilter === "" || country.region === regionFilter)
  );

  if (isLoading) return <p className="py-10">Loading countries...</p>;
  if (isError) return <p className="py-10">Error fetching countries</p>;

  return (
    <div className="py-4 text-[14px]">
      <div className="flex flex-col sm:flex-row items-center w-full justify-between my-8">
        <SearchInput
          value={query}
          onChange={setQuery}
          className="w-full sm:w-125 h-14 shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
        />

        <div className="w-full sm:w-48">
          <Select
            options={regionOptions}
            placeholder="Select a region"
            onChange={(option) => setRegionFilter(option?.value || "")}
            components={{ IndicatorSeparator: () => null }}
            styles={getCustomStyles(isDarkMode)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 w-full">
        {filteredCountries.map((country) => (
          <Link key={country.cca3} href={`/details/${country.cca3}`}>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transform transition pb-8 cursor-pointer">
              <Image
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                width={100}
                height={200}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h2 className="font-extrabold text-[14px] my-4">
                  {country.name.common}
                </h2>

                <div className="flex flex-col gap-2">
                  <p>
                    <span className="font-semibold">Population:</span>{" "}
                    {country.population.toLocaleString()}
                  </p>

                  <p>
                    <span className="font-semibold">Region:</span>{" "}
                    {country.region}
                  </p>

                  <p>
                    <span className="font-semibold">Capital:</span>{" "}
                    {country.capital?.[0] || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}