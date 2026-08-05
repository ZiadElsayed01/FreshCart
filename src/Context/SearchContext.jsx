import { createContext, useState } from "react";
import PropTypes from "prop-types";

export let SearchContext = createContext();

export default function SearchContextProvider(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "default",
  });

  function updateFilter(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetFilters() {
    setFilters({
      category: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "default",
    });
    setSearchQuery("");
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filters,
        updateFilter,
        resetFilters,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}

SearchContextProvider.propTypes = {
  children: PropTypes.node,
};
