import React, { useCallback, useEffect, useState } from "react";
import CheckboxGroup from "./CheckboxGroup.tsx";
import DataSource from "./DataSource.tsx";
import RangeSlider from "./RangeSlider.tsx";
import { PROTEIN_TYPE } from "../constants.tsx";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { ProteinType } from "../types/checkBoxValues.type.tsx";

const Filter = ({
  getProteinData,
}: {
  getProteinData: ({
    pricePerScoopRange,
    priceRange,
    ratingRange,
    capacityRange,
    proteinPerScoopRange,
    proteinType,
  }) => void;
}) => {
  // State for range sliders
  const [pricePerScoopRange, setPricePerScoopRange] = useState<number[]>([
    0, 20,
  ]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [ratingRange, setRatingRange] = useState<number[]>([0, 5]);
  const [capacityRange, setCapacityRange] = useState<number[]>([1, 1000]);
  const [proteinPerScoopRange, setProteinPerScoopRange] = useState<number[]>([
    0, 35,
  ]);
  const [proteinType, setProteinType] = useState<string[]>([]);

  // Event handler for price per scoop range change
  const handlePricePerScoopRangeChange = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    setPricePerScoopRange(newValue as number[]);
  };

  // Event handler for price range change
  const handlePriceChange = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    setPriceRange(newValue as number[]);
  };

  useEffect(() => {
    // Trigger parent function which is having API call to get latest data on change of filters
    getProteinData({
      pricePerScoopRange,
      priceRange,
      ratingRange,
      capacityRange,
      proteinPerScoopRange,
      proteinType,
    });
  }, [
    getProteinData,
    pricePerScoopRange,
    priceRange,
    ratingRange,
    capacityRange,
    proteinPerScoopRange,
    proteinType,
  ]);

  //Handle checkBox values 
  const handleCheckBoxOnChange = useCallback(
    (value: {
      [K in keyof ProteinType]: boolean;
    }) => {
      setProteinType(Object.keys(value).filter((key) => value[key]));
    },
    []
  );

  return (
    // Filter container
    <Box
      sx={{ mr: 2, textAlign: "left", "& *": { fontSize: "14px !important" } }}
      component={Paper}>
      {/* Data source component */}
      <DataSource />
      {/* Divider */}
      <Divider />
      {/* Price per scoop range slider */}
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 500, mb: 1 }}>Price Per Scoop</Typography>
        <RangeSlider
          min={0}
          max={20}
          step={0.1}
          valueLabelFormat={(value: number) => `$${value}`}
          handleRangeChangeCommitted={handlePricePerScoopRangeChange}
        />
      </Box>
      {/* Divider */}
      <Divider />
      {/* Price range slider */}
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 500, mb: 1 }}>Price</Typography>
        <RangeSlider
          min={1}
          max={500}
          step={1}
          valueLabelFormat={(value: number) => `$${value}`}
          handleRangeChangeCommitted={handlePriceChange}
        />
      </Box>
      {/* Divider */}
      <Divider />
      {/* Capacity range slider */}
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 500, mb: 1 }}>Capacity</Typography>
        <RangeSlider
          min={1}
          max={1000}
          step={1}
          valueLabelFormat={(value: number) => `${value}g`}
          handleRangeChangeCommitted={(
            event: React.SyntheticEvent | Event,
            newValue: number | number[]
          ) => {
            setCapacityRange(newValue as number[]);
          }}
        />
      </Box>
      {/* Divider */}
      <Divider />
      {/* Rating range slider */}
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 500, mb: 1 }}>Rating</Typography>
        <RangeSlider
          min={0}
          max={5}
          step={0.1}
          valueLabelFormat={(value: number) => `${value}☆`}
          handleRangeChangeCommitted={(
            event: React.SyntheticEvent | Event,
            newValue: number | number[]
          ) => {
            setRatingRange(newValue as number[]);
          }}
        />
      </Box>
      {/* Divider */}
      <Divider />
      {/* Protein per scoop range slider */}
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 500, mb: 1 }}>
          Protein Per Scoop
        </Typography>
        <RangeSlider
          min={0}
          max={35}
          step={1}
          valueLabelFormat={(value: number) => `${value}g`}
          handleRangeChangeCommitted={(
            event: React.SyntheticEvent | Event,
            newValue: number | number[]
          ) => {
            setProteinPerScoopRange(newValue as number[]);
          }}
        />
      </Box>
      {/* Divider */}
      <Divider />
      {/* Checkbox group for protein type */}
      <CheckboxGroup
        checkboxData={PROTEIN_TYPE}
        label="Protein Type"
        onChange={handleCheckBoxOnChange}
      />
    </Box>
  );
};

export default Filter;