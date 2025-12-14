"use client";

import { useState, useCallback, FC } from "react";
import {
  FormControlLabel,
  Checkbox,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useList, type CrudFilter } from "@refinedev/core";
import { IOperator } from "@interfaces/operators";

interface ToursListFiltersProps {
  setFilters: (filters: CrudFilter[], method: "replace" | "merge") => void;
}

export const ToursListFilters: FC<ToursListFiltersProps> = ({ setFilters }) => {
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [selectedOperatorId, setSelectedOperatorId] = useState<number | "">("");

  const {
    result: operators,
    query: { isLoading: operatorsLoading },
  } = useList<IOperator>({
    resource: "operators",
    pagination: { pageSize: 1000 },
  });

  const applyFilters = useCallback(
    (newIsFeatured: boolean, newOperatorId: number | null) => {
      const newFilters: CrudFilter[] = [];

      if (newIsFeatured) {
        newFilters.push({
          field: "isFeatured",
          value: true,
          operator: "eq" as const,
        });
      }

      if (newOperatorId && newOperatorId > 0) {
        newFilters.push({
          field: "operatorId",
          value: newOperatorId,
          operator: "eq" as const,
        });
      }

      setFilters(newFilters, "replace");
    },
    [setFilters],
  );

  const handleFeaturedToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIsFeatured = event.target.checked;
    setIsFeatured(newIsFeatured);

    const currentOperatorId = selectedOperatorId || null;
    applyFilters(newIsFeatured, currentOperatorId);
  };

  const handleOperatorChange = (event: {
    target: { value: string | number };
  }) => {
    const newId = event.target.value;
    setSelectedOperatorId(newId === "" ? "" : Number(newId));

    const newOperatorId = newId === "" ? null : Number(newId);
    applyFilters(isFeatured, newOperatorId);
  };

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "center", mb: 3 }}>
      <FormControlLabel
        control={
          <Checkbox checked={isFeatured} onChange={handleFeaturedToggle} />
        }
        label="Featured"
      />

      <FormControl sx={{ minWidth: 250 }} size="small">
        <InputLabel id="operator-select-label">Туроператор</InputLabel>
        <Select
          labelId="operator-select-label"
          value={selectedOperatorId}
          label="Туроператор"
          onChange={handleOperatorChange}
          disabled={operatorsLoading}
        >
          <MenuItem value="">
            {operatorsLoading ? "Завантаження..." : "Всі туроператори"}
          </MenuItem>
          {operators?.data?.map((operator) => (
            <MenuItem key={operator.id} value={operator.id}>
              {operator.firstName} {operator.lastName} (ID: {operator.id})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {operatorsLoading && (
        <Typography variant="caption">Завантаження операторів...</Typography>
      )}
    </Box>
  );
};
