"use client";

import {
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Link as MuiLink,
} from "@mui/material";
import { useShow } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import Link from "next/link";
import type { ITour } from "@interfaces/tours";
import { FeaturedTourToggle } from "@components/tours/FeaturedTourToggle";
import { getTourDetails } from "@shared/utils/tours";

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

  const details = getTourDetails(tour);

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Деталі Туру
        </Typography>

        <Table size="small">
          <TableBody>
            {details.map((item) => (
              <TableRow key={item.label}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold", width: "30%" }}
                >
                  {item.label}
                </TableCell>
                <TableCell>{item.value}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ fontWeight: "bold", width: "30%" }}
              >
                Вибраний тур
              </TableCell>
              <TableCell>
                <FeaturedTourToggle
                  tourId={tour.id}
                  initialIsFeatured={tour.isFeatured}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ fontWeight: "bold", width: "30%" }}
              >
                Оператор
              </TableCell>
              <TableCell>
                <MuiLink
                  component={Link}
                  href={`/operators/show/${tour.operator.id}`}
                >
                  {tour.operator.firstName} {tour.operator.lastName}
                </MuiLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
