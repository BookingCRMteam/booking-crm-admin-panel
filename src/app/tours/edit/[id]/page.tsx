"use client";

import { Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import type { ITour } from "@interfaces/tours";
import { TourDetails } from "@components/tours/TourDetails";
import { FeaturedTourToggle } from "@components/tours/FeaturedTourToggle";

export default function TourEdit() {
  return (
    <Edit saveButtonProps={{ style: { display: "none" } }}>
      <TourEditDetails />
    </Edit>
  );
}

function TourEditDetails() {
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
    <TourDetails tour={tour}>
      <FeaturedTourToggle
        tourId={tour.id}
        initialIsFeatured={tour.isFeatured}
      />
    </TourDetails>
  );
}
