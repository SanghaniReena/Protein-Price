import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function RangeSlider({
  min = 0,
  max = 100,
  valueLabelFormat,
  handleRangeChangeCommitted,
  step,
}: {
  // Optional minimum value of the slider
  min?: number;
  // Optional maximum value of the slider
  max?: number;
  // Optional function to format the value displayed on the slider thumb
  valueLabelFormat?: (value: number) => string;
  // Function to handle changes in the slider value
  handleRangeChangeCommitted: (
    event: React.SyntheticEvent | Event,
    value: number | number[]
  ) => void;
  // Optional step value for the slider
  step?: number;
  // Optional current value(s) of the slider
  value?: number[];
}) {
  const [range, setRange] = React.useState<number[]>([min, max]);
  // Event handler for price per scoop range change
  const handleRangeChange = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    setRange(newValue as number[]);
  };

  return (
    <Box>
      {/* Slider component */}
      <Slider
        size="small"
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
        value={range || [0, 1]}
        onChange={handleRangeChange}
        onChangeCommitted={handleRangeChangeCommitted}
      />
    </Box>
  );
}
