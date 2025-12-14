"use client";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useUpdate, HttpError } from "@refinedev/core";
import { ITour } from "@interfaces/tours";
import { useState, useEffect, useCallback, type FC } from "react";

type FeaturedTourToggleProps = {
  tourId: number;
  initialIsFeatured: boolean;
};

export const FeaturedTourToggle: FC<FeaturedTourToggleProps> = ({
  tourId,
  initialIsFeatured,
}) => {
  const [isFeatured, setIsFeatured] = useState<boolean>(initialIsFeatured);

  const {
    mutate: updateFeaturedStatus,
    mutation: { isPending },
  } = useUpdate<ITour>();

  useEffect(() => {
    setIsFeatured(initialIsFeatured);
  }, [initialIsFeatured]);

  const handleToggle = useCallback(
    (newIsFeatured: boolean) => {
      setIsFeatured(newIsFeatured);

      updateFeaturedStatus({
        resource: `admin/tours/${tourId}/feature`,  
        id: tourId,
        values: { isFeatured: newIsFeatured },
        successNotification: {
          message: `Статус "Вибраний тур" успішно оновлено на: ${newIsFeatured ? "Так" : "Ні"}`,
          type: "success",
        },
        errorNotification: (err?: HttpError) => ({
          message: `Помилка оновлення: ${err?.message}`,
          type: "error",
        }),
      });
    },
    [tourId, updateFeaturedStatus],
  );

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" disabled={isPending}>
      <InputLabel id="featured-select-label">Вибраний</InputLabel>
      <Select
        labelId="featured-select-label"
        value={isFeatured ? "true" : "false"}
        label="Вибраний"
        onChange={(e) => handleToggle(e.target.value === "true")}
      >
        <MenuItem value="true">Так</MenuItem>
        <MenuItem value="false">Ні</MenuItem>
      </Select>
    </FormControl>
  );
};
