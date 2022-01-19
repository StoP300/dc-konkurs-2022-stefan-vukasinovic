import React, { useState } from "react";



const SearchContext = React.createContext({
  search: "",
  setSearchValue: () => {},
});

export const SearchContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const searchHandler = (value) => {
    setSearch(value);
  };
  const contextValue = {
    search: search,
    setSearchValue: searchHandler,
  };
  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
