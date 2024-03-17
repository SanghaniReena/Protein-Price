import React, { useState, useEffect } from "react";
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import {
  CheckboxGroupPropsType,
  CheckboxValuesType,
} from "../types/checkBoxValues.type";

const CheckboxGroup: React.FC<CheckboxGroupPropsType> = ({
  checkboxData,
  label,
  onChange,
}) => {
  // State to track whether the main checkbox is checked
  const [checked, setChecked] = useState(true);

  // State to manage the checkbox values
  const [checkboxValues, setCheckboxValues] = useState<CheckboxValuesType>(
    // Initialize checkboxValues based on checkboxData
    Object.keys(checkboxData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as CheckboxValuesType
    )
  );

  // Effect to check if all sub-checkboxes are checked
  useEffect(() => {
    const allChecked = Object.values(checkboxValues).every((value) => value);
    setChecked(allChecked);
    onChange(checkboxValues);
  }, [checkboxValues,onChange]);

  // Function to handle rotational change of the main checkbox
  const handleRotationalChange = () => {
    const newRotationalState = !checked;
    setChecked(newRotationalState);

    // Update all sub-checkboxes to the same state
    const newCheckboxValues: CheckboxValuesType = { ...checkboxValues };
    for (const key in checkboxData) {
      if (Object.prototype.hasOwnProperty.call(checkboxData, key)) {
        newCheckboxValues[key] = newRotationalState;
      }
    }
    setCheckboxValues(newCheckboxValues);
  };

  // Function to handle change of individual checkboxes
  const handleCheckboxChange = (key: string) => {
    const newCheckboxValues = { ...checkboxValues };
    newCheckboxValues[key] = !checkboxValues[key];
    setCheckboxValues(newCheckboxValues);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Main checkbox for the group */}
      <FormControlLabel
        sx={{ mt: 1, mb: 2 }}
        control={
          <Checkbox
            sx={{ py: 0 }}
            checked={checked}
            onChange={handleRotationalChange}
          />
        }
        label={
          <Typography variant="body1" fontWeight="500">
            {label}
          </Typography>
        }
      />
      {/* Sub-checkboxes */}
      <FormGroup>
        {Object.entries(checkboxData).map(([key, label]: [string, string]) => {
          return (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  sx={{ py: 0 }}
                  checked={checkboxValues[key]}
                  onChange={() =>
                    handleCheckboxChange(key as keyof CheckboxValuesType)
                  }
                />
              }
              label={label}
            />
          );
        })}
      </FormGroup>
    </Box>
  );
};

export default CheckboxGroup;
