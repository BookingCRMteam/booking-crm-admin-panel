"use client";

import { Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import type { ITour } from "@interfaces/tours";
import { TourDetails } from "@components/tours/TourDetails";

export default function TourShow() {
  return (
    <Show>
      <TourDetailsShow />
    </Show>
  );
}

function TourDetailsShow() {
  const {
    result: tour,
    query: { isLoading },
  } = useShow<ITour>();

  if (isLoading) {
    return <Typography>Завантаження...</Typography>;
  }

  if (!tour) {
    return <Typography>Тур не знайдено.</Typography>;
  }

  return (
    <TourDetails tour={tour}>{tour.isFeatured ? "Так" : "Ні"}</TourDetails>
  );
}
