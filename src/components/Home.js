import React from "react";
import CitiesTable from "./CitiesTable.js";
import CountrySearch from "./CountrySearch.js";
import { SearchContextProvider } from "../store/searchContext";

function Home() {
  return (
    <div className="home-page">
      <SearchContextProvider>
        <CountrySearch />

        <CitiesTable />
      </SearchContextProvider>
    </div>
  );
}

export default Home;
