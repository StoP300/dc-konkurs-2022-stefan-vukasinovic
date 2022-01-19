import React, { useContext, useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import AuthContext from "../store/auth-context";
import SearchContext from "../store/searchContext";
import "./CountrySearch.scss";
import axios from "axios";

export default function CountrySearch() {
  const authCtx = useContext(AuthContext);
  const searchCtx = useContext(SearchContext);

  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState(countries[0]);
  const [inputValue, setInputValue] = useState("");

  function getCountries(value) {
    const api = `/api/countries?search=${value}`;

    const config = {
      headers: { Authorization: `Bearer ${authCtx.token}` },
    };
    axios.get(api, config).then((res) => {
      setCountries(res.data.countries);
    });
  }

  const getSelectedCountry = (v) => {
    console.log(v);
    searchCtx.setSearchValue(v.id);
  };

  return (
    <div className="header">
      <img className="logo" src="/assets/logo.svg"></img>
      <Autocomplete
        value={value}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(event, newValue) => {
          setTimeout(() => {
            setValue(newValue);
            getSelectedCountry(newValue);
          }, 200);
        }}
        id="country-select"
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => {
              getCountries(e.target.value);
            }}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </div>
  );
}
