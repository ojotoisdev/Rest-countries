import { StylesConfig } from "react-select";
export type RegionOption = { value: string; label: string };

export const regionOptions: RegionOption[] = [
  
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];









export type OptionType = {
  value: string;
  label: string;
};




export const getCustomStyles = (isDarkMode: boolean): StylesConfig<OptionType, false> => {
  
  const controlBg = isDarkMode ? "#2B3847" : "#ffffff"; // bg-darkElement / bg-lightElement
  const textColor = isDarkMode ? "#ffffff" : "#141923";  // text-darkText / text-lightText
  const placeholderColor = isDarkMode ? "#9ca3af" : "#6b7280"; // Tailwind gray-400 / gray-500
  const optionHover = isDarkMode ? "#374151" : "#e5e7eb";  // Tailwind gray-700 / gray-200

  return {
    control: (provided) => ({
      ...provided,
      height: 56,
      minHeight: 56,
      borderRadius: 8,
      border: "none",
      outline: "none",
      paddingLeft: "0.5rem",
      backgroundColor: controlBg,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
 
    }),
    menu: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
      backgroundColor: controlBg,
      fontSize: "1rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: placeholderColor,
      fontSize: "1rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: textColor,
      fontSize: "1rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? optionHover : controlBg,
      color: textColor,
      cursor: "pointer",
      borderRadius: 8,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: placeholderColor, 
    }),
    indicatorSeparator: () => ({ display: "none" }), 
  };
};
