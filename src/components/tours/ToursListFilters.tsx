"use client";

import { useState, useCallback, type FC } from "react";
import {
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useList, type CrudFilter } from "@refinedev/core";
import { IOperator } from "@interfaces/operators";

interface ToursListFiltersProps {
  setFilters: (filters: CrudFilter[], method: "replace" | "merge") => void;
}

type OperatorOption = IOperator | null;

export const ToursListFilters: FC<ToursListFiltersProps> = ({ setFilters }) => {
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [selectedOperator, setSelectedOperator] =
    useState<OperatorOption>(null);

  const {
    result: operatorsData,
    query: { isLoading: operatorsLoading },
  } = useList<IOperator>({
    resource: "operators",
    pagination: { pageSize: 1000 },
  });

  const operators = operatorsData.data || [];

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

    const currentOperatorId = selectedOperator?.id || null;
    applyFilters(newIsFeatured, currentOperatorId);
  };
  const handleOperatorChange = (
    _event: React.SyntheticEvent,
    newValue: OperatorOption,
  ) => {
    setSelectedOperator(newValue);
    const newOperatorId = newValue ? newValue.id : null;
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

      <Autocomplete
        id="operator-autocomplete"
        size="small"
        multiple={false}
        sx={{ minWidth: 300 }}
        options={operators}
        loading={operatorsLoading}
        value={selectedOperator}
        onChange={handleOperatorChange}
        getOptionLabel={(option) =>
          `${option.firstName} ${option.lastName} (ID: ${option.id})`
        }
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.firstName} {option.lastName} (ID: {option.id})
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Туроператор"
            placeholder="Введіть ім'я або ID"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {operatorsLoading ? (
                      <Typography variant="caption">Завантаження...</Typography>
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />
    </Box>
  );
};
