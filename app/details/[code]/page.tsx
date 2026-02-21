"use client";

import Button from "@/components/Button/Button";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

type Country = {
  name: {
    common: string;
    nativeName?: Record<string, { common: string }>;
  };
  population: number;
  region: string;
  subregion: string;
  capital?: string[];
  tld?: string[];
  currencies?: Record<string, { name: string }>;
  languages?: Record<string, string>;
  borders?: string[];
  flags: { png: string };
  cca3: string;
};

const fetchCountry = async (code: string): Promise<Country> => {
  const res = await axios.get(
    `https://restcountries.com/v3.1/alpha/${code}`
  );
  return res.data[0];
};

export default function CountryDetails() {
  const params = useParams();
  const code = params?.code as string;

  const {
    data: country,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["country", code],
    queryFn: () => fetchCountry(code),
    enabled: !!code,
  });

  if (isLoading) return <p className="p-8">Loading country...</p>;
  if (isError || !country) return <p className="p-8">Country not found</p>;

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <div className="max-w-full mx-auto my-20 min-h-screen">
      <Button
        back
        className="flex gap-4 items-center px-9 py-3 text-lg font-semibold mb-20"
      >
        <FiArrowLeft /> Back
      </Button>

      <div className="text-(--color-text) flex flex-col md:flex-row gap-10 items-start">
        {/* FLAG */}
        <div className="w-full md:w-1/2">
          <Image
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded"
            priority
          />
        </div>

        {/* DETAILS */}
        <div className="w-full md:w-1/2 mt-10">
          <h2 className="font-bold text-3xl mb-6">
            {country.name.common}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col gap-2">
              <p><strong>Native Name:</strong> {nativeName}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Sub Region:</strong> {country.subregion}</p>
              <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p><strong>Top Level Domain:</strong> {country.tld?.join(", ") || "N/A"}</p>
              <p><strong>Currencies:</strong> {currencies}</p>
              <p><strong>Languages:</strong> {languages}</p>
            </div>
          </div>

          {/* BORDERS */}
          {country.borders && country.borders.length > 0 && (
            <div className="flex gap-4 flex-wrap items-center mt-15">
              <p className="w-full"><strong>Border Countries:</strong></p>

              {country.borders.map((borderCode) => (
                <Link key={borderCode} href={`/details/${borderCode}`}>
                  <Button className="text-sm px-3 py-1">
                    {borderCode}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}