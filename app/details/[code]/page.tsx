import Button from "@/components/Button/Button";
import countries from "../../../Data/countries.json";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";

type Props = {
  params: Promise<{ code?: string }>;
};

export default async function CountryDetails({ params }: Props) {
  const { code } = await params;
  const searchCode = code?.toLowerCase();

  const country = countries.find((c) => {
    const alpha3 = c.alpha3Code?.toLowerCase();
    const cioc = c.cioc?.toLowerCase();
    return alpha3 === searchCode || cioc === searchCode;
  });

  if (!country) return <p className="p-8">Country not found</p>;


  const borderCountries = country.borders
    ?.map((code) => countries.find((c) => c.alpha3Code === code))
    .filter(Boolean);

  return (
    <div className="max-w-full mx-auto my-20 h-screen">
      <Button back className="flex gap-4 items-center px-9 py-3 text-lg font-semibold mb-20">
        <FiArrowLeft /> Back
      </Button>
      <div className="text-(--color-text) flex flex-col md:flex-row gap-10 items-start">
        <div className="w-full md:w-1/2">
          <Image
            src={country.flags.png}
            alt={`${country.name} flag`}
            width={600}
            height={100}
            className="w-full h-auto object-cover rounded"
            priority
          />
        </div>

        {/* DETAILS */}
        <div className="w-full md:w-1/2 mt-10">
          <h2 className="font-bold text-3xl mb-6">{country.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            
            {/* First column */}
            <div className="flex flex-col gap-2">
              <p><strong>Native Name:</strong> {country.nativeName}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Sub Region:</strong> {country.subregion}</p>
              <p><strong>Capital:</strong> {country.capital}</p>
            </div>

            
            <div className="flex flex-col gap-2">
              <p><strong>Top Level Domain:</strong> {country.topLevelDomain?.join(", ")}</p>
              <p>
                <strong>Currencies:</strong>{" "}
                {country.currencies?.map((c) => c.name).join(", ")}
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {country.languages?.map((l) => l.name).join(", ")}
              </p>

              
             

            </div>

          </div>
           {borderCountries && borderCountries.length > 0 && (
                <div className="flex gap-4 sm:flex-wrap items-center mt-15 ">
                  <p><strong className="w-full ">Border Countries:</strong></p>
                  {borderCountries.map((b) => (
                    <Button
                      key={b!.alpha3Code}
                      href={`/details/${b!.alpha3Code}`}
                      className="text-sm px-2 py-1"
                    >
                      {b!.name}
                    </Button>
                  ))}
                </div>
              )}
        </div>
        
      </div>
    </div>
  );
}
