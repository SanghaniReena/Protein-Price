import React, { useCallback, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Filter from "./Filter.tsx";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "../axios.tsx";
import { ProteinDataType } from "../types/proteinData.type.tsx";
import { Box, Grid, Skeleton } from "@mui/material";
import { PROTEIN_TYPE } from "../constants.tsx";

export default function Main() {
  const [proteinData, setProteinData] = useState([] as ProteinDataType[]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch protein data
  const getProteinData = useCallback(
    async ({
      pricePerScoopRange,
      priceRange,
      ratingRange,
      capacityRange,
      proteinPerScoopRange,
      proteinType,
    }) => {
      try {
        setIsLoading(true);
        const params = {
          filters: {
            min_price_per_scoop: pricePerScoopRange[0],
            max_price_per_scoop: pricePerScoopRange[1],
            min_price: priceRange[0],
            max_price: priceRange[1],
            min_protein_per_scoop: proteinPerScoopRange[0],
            max_protein_per_scoop: proteinPerScoopRange[1],
            min_rating: ratingRange[0],
            max_rating: ratingRange[1],
            min_capacity: capacityRange[0],
            max_capacity: capacityRange[1],
            types: proteinType,
          },
        };
        const { data } = await axios.get(`/protein`, { params });
        setProteinData(data?.proteins);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <Box py={3} px={4}>
      <Grid container spacing={2}>
        {/* Filter component */}
        <Grid item md={2}>
          <Filter getProteinData={getProteinData} />
        </Grid>
        {/* Table displaying protein data */}
        <Grid item md={10}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Price Per Scoop</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Capacity</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell align="center">Protein Per Scoop</TableCell>
                  <TableCell align="center">Protein Type</TableCell>
                  <TableCell align="center">Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Render skeleton rows while loading */}
                {isLoading ? (
                  [...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      {[...Array(7)].map((_, i) => (
                        <TableCell key={i}>
                          <Skeleton animation="wave" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : proteinData.length > 0 ? ( // Checks if data length is more than 0
                  // Mapping through protein data to render rows
                  proteinData?.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      {/* Displaying each attribute of the protein data */}
                      <TableCell align="center">${row.pricePerScoop}</TableCell>
                      <TableCell align="center">${row.price}</TableCell>
                      <TableCell align="center">{row.capacity}g</TableCell>
                      <TableCell align="center">{row.rating}</TableCell>
                      <TableCell align="center">
                        {row.proteinPerScoop}g
                      </TableCell>
                      <TableCell align="center">
                        {PROTEIN_TYPE[row.type]}
                      </TableCell>
                      <TableCell align="center">
                        {/* Open in new tab icon */}
                        <Box
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(`https://${row.link}`, "_target")
                          }>
                          <OpenInNewIcon fontSize="small" color="primary" />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  //  Display no data found if data length is 0
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No data found!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}