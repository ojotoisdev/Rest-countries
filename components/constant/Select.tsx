// type SelectProps = {
//   value: string;
//   onChange: (value: string) => void;
//   options: string[];
//   className?: string;
// };

// export default function Select({ value, onChange, options, className }: SelectProps) {
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className={`border rounded px-4 py-2 ${className ?? ""}`}
//     >
//       <option value="">All Regions</option>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   );
// }
