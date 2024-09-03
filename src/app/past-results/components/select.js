"use client"

import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function SelectYear({plainResults}) {
const[selectedYear, setSelectedYear] = useState("");


// Event handler for dropdown change
const handleYearChange = (event) => {
  setSelectedYear(event.target.value);
};

// Filter the results based on the selected year
const filteredResults = plainResults.filter(
  (result) => result.year === parseInt(selectedYear)
).sort((a, b) => a.score - b.score);

const uniqueYears = [...new Set(plainResults.map((result) => result.year))];

return (
  <div>
    {/* Dropdown menu for year selection */}
    <label htmlFor="year">Select Year: </label>
    <select id="year" value={selectedYear} onChange={handleYearChange}>
      {uniqueYears.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
      {/* Add more options as needed */}
    </select>
    

    {/* Display the filtered results */}
    <ul>
      {filteredResults.map((result) => (
        <li key={result._id}>
          <strong>Team:</strong> {result.team.join(", ")} -{" "}
          <strong>Score:</strong> {result.score}
        </li>
      ))}
    </ul>
  </div>
);
}