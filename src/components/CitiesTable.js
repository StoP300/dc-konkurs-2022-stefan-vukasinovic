import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { Checkbox } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchContext from "../store/searchContext";
import AuthContext from "../store/auth-context";
import axios from "axios";
import Map from "./Map";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LinearProgress from "@mui/material/LinearProgress";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

import "./CitiesTable.scss";
import { Pages } from "@material-ui/icons";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "14px solid",
  boxShadow: 24,
  borderRadius: "20px",
  backgroundColor: "#000000",
};

export default function CitiesTable() {
  const authCtx = useContext(AuthContext);
  const searchCtx = useContext(SearchContext);
  const [loading, isLoading] = useState(false);
  // const [page, setPages] = useState([]);
  function createData(id, name, capital, lat, lon, population) {
    return { id, name, capital, lat, lon, population };
  }

  useEffect(() => {
    if (searchCtx.search) {
      getCities();
    }
  }, [searchCtx.search]);

  const getCities = () => {
    const api = `/api/countries/${searchCtx.search}/cities?fields=id,name,lat,lon,population,capital&order_by=${orderby}&no_paginate=true`;
    const params = { fields: "id,name" };

    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
        params: JSON.stringify(params),
      },
    };
    isLoading(true);
    axios
      .get(api, config)
      .then((res) => {
        console.log(res);
        const tmp = [];
        // const pgs = [];
        // res.data.summary.map((page) => {
        //   pgs.push(
        //     createData(
        //       page.count,
        //       page.next,
        //       page.page,
        //       page.previous,
        //       page.total_pages
        //     )
        //   );
        // });
        res.data.map((city) => {
          tmp.push(
            createData(
              city.id,
              city.name,
              city.capital,
              city.lat,
              city.lon,
              city.population
            )
          );
        });
        isLoading(false);
        setRows(tmp);
        // setPages(pgs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [rows, setRows] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [open, setOpen] = useState(false);
  const [orderby, setOrderBy] = useState("name");

  const setOrder = (order) => {
    if (order === orderby) {
      setOrderBy("-" + orderby);
    } else {
      setOrderBy(order);
    }
    if (searchCtx.search) {
      getCities();
    }
  };
  const handleCellClick = (e) => {
    setCoordinates({ lat: e.lat, lng: e.lon });
    setOpen(true);
  };

  return (
    <div className="city-wrapper">
      {loading ? (
        <div className="loading-wrapper">
          <Box sx={{ width: "20%" }}>
            <LinearProgress />
          </Box>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <p>ID</p>
                </TableCell>
                <TableCell align="left" onClick={() => setOrder("name")}>
                  {orderby === "name" && <ArrowUpwardIcon></ArrowUpwardIcon>}
                  {orderby === "-name" && (
                    <ArrowDownwardIcon></ArrowDownwardIcon>
                  )}
                  <p>Name</p>
                </TableCell>
                <TableCell align="left" onClick={() => setOrder("lat")}>
                  {orderby === "lat" && <ArrowUpwardIcon></ArrowUpwardIcon>}
                  {orderby === "-lat" && (
                    <ArrowDownwardIcon></ArrowDownwardIcon>
                  )}
                  <p>Latitude</p>
                </TableCell>
                <TableCell align="left" onClick={() => setOrder("lon")}>
                  {orderby === "lon" && <ArrowUpwardIcon></ArrowUpwardIcon>}
                  {orderby === "-lon" && (
                    <ArrowDownwardIcon></ArrowDownwardIcon>
                  )}
                  <p>Longitude</p>
                </TableCell>
                <TableCell align="left">
                  <p>Capital</p>
                </TableCell>
                <TableCell align="left">
                  <p>Country ID</p>
                </TableCell>
                <TableCell align="left" onClick={() => setOrder("population")}>
                  {orderby === "population" && (
                    <ArrowUpwardIcon></ArrowUpwardIcon>
                  )}
                  {orderby === "-population" && (
                    <ArrowDownwardIcon></ArrowDownwardIcon>
                  )}
                  <p>Population</p>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  onClick={() => handleCellClick(row)}
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <p></p>
                  </TableCell>
                  <TableCell>
                    <p>{row.name}</p>
                  </TableCell>
                  <TableCell>
                    <p>{row.lat}</p>
                  </TableCell>
                  <TableCell>
                    <p>{row.lon}</p>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      disable
                      checked={row.capital}
                    />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {row.population
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div className="pagination">
        {/* {page.map((pag) => {
          // <Stack spacing={1}>
          //   <Pagination count={pag.count} />
          // </Stack>;
        })} */}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Map markercenter={coordinates} />
        </Box>
      </Modal>
    </div>
  );
}
