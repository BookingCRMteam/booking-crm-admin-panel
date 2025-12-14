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
  Box,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { getTourDetails } from "@shared/utils/tours";
import type { FC, ReactNode } from "react";
import type { ITour } from "@interfaces/tours";

type TourDetailsProps = {
  tour: ITour;
  children?: ReactNode;
};
export const TourDetails: FC<TourDetailsProps> = ({ tour, children }) => {
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
                Обраний тур
              </TableCell>
              <TableCell>{children}</TableCell>
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

            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ fontWeight: "bold", width: "30%" }}
              >
                Email оператора
              </TableCell>
              <TableCell>
                {tour.operator.email ? (
                  <MuiLink href={`mailto:${tour.operator.email}`}>
                    {tour.operator.email}
                  </MuiLink>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ fontWeight: "bold", width: "30%" }}
              >
                Номер телефону
              </TableCell>
              <TableCell>
                {tour.operator.phone ? (
                  <MuiLink href={`tel:${tour.operator.phone}`}>
                    {tour.operator.phone}
                  </MuiLink>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                  Опис:
                </Typography>
                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  {tour.description ?? "-"}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                  Умови Туру:
                </Typography>
                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  {tour.conditions ?? "-"}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ fontWeight: "bold", width: "30%" }}
              >
                Фото
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {tour.photos &&
                    tour.photos.map((photo) => (
                      <Image
                        key={photo.id}
                        src={photo.url}
                        alt={photo.description || `Tour photo ${photo.id}`}
                        width={200}
                        height={200}
                        style={{ objectFit: "cover" }}
                      />
                    ))}
                  {(!tour.photos || tour.photos.length === 0) && "-"}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
