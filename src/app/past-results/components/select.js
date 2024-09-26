"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectYear({ plainResults }) {
  const [selectedYear, setSelectedYear] = useState("2023");

  let ranking = 1;
  // Event handler for dropdown change
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Filter the results based on the selected year
  const filteredResults = plainResults
    .filter((result) => result.year === parseInt(selectedYear))
    .sort((a, b) => a.score - b.score);

  const uniqueYears = [...new Set(plainResults.map((result) => result.year))];

  return (
    <div className="w-full">
      {/* Dropdown menu for year selection */}
      <label htmlFor="year" className="text-right">
        Select Year:{" "}
      </label>
      <select
        className="text-right mb-6"
        id="year"
        value={selectedYear}
        onChange={handleYearChange}
      >
        {/* <option value={plainResults.year.filter(year === 2023)} /> */}
        {uniqueYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <ul className="flex flex-col w-[95%] m-auto gap-2">
        {filteredResults.map((result, index) => (
          <li className="odd:bg-kobePurple odd:text-kobeWhite p-2 flex justify-between w-full m-auto" key={result._id}>
            <span>#{ranking + index}</span>
            <span> {result.team.join(", ")}</span>
            <span>{result.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
