import { PROTEIN_TYPE } from "../constants";

export type ProteinType = typeof PROTEIN_TYPE;

export type CheckboxValuesType = {
  [K in keyof ProteinType]: boolean;
};

export type CheckboxGroupPropsType = {
  checkboxData: ProteinType;
  label?: String;
  onChange: (value: { [K in keyof ProteinType]: boolean }) => void;
};
