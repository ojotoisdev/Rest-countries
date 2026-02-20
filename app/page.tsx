"use client";
 import Link from "next/link";
import SearchInput from "@/components/Search/SearchInput";
import { useState, useLayoutEffect } from "react";
import Image from "next/image";
import countriesData from "../Data/countries.json";
import Select from "react-select";
import { regionOptions, getCustomStyles } from "@/components/constant";


type Country = {
  name: string;
  alpha3Code: string;
  capital: string;
  region: string;
  population: number;
  flags: { png: string; svg: string };
};

export default function Home() {
  const [query, setQuery] = useState("");
   const [regionFilter, setRegionFilter] = useState<string>("");
   const [isDarkMode, setIsDarkMode] = useState(false);

    useLayoutEffect(() => {
    const html = document.documentElement;

    const updateMode = () => {
      setIsDarkMode(html.classList.contains("dark"));
    };
    requestAnimationFrame(updateMode);
    const observer = new MutationObserver(() => {
      updateMode();
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);
  
  const filteredCountries = (countriesData as Country[]).filter(
    (country) =>
      country.name.toLowerCase().includes(query.toLowerCase()) &&
      (regionFilter === "" || country.region === regionFilter)
  );

  return (
    <div className=" py-4 text-[14px] ">
     
      <div className="flex flex-col sm:flex-row items-center w-full justify-between  my-8">
        <SearchInput value={query} onChange={setQuery} className="w-full sm:w-125  h-14  shadow-[0_2px_4px_rgba(0,0,0,0.1)] " />
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
  <Link key={country.alpha3Code} href={`/details/${country.alpha3Code}`}>
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transform transition pb-8 cursor-pointer">
      <Image
        src={country.flags.png}
        alt={`${country.name} flag`}
        width={100}
        height={200}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="font-extrabold text-[14px] my-4">{country.name}</h2>

        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>

          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>

          <p>
            <span className="font-semibold">Capital:</span> {country.capital}
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
